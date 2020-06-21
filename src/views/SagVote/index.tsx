import React, { useEffect, useState } from 'react';
import { Sag, Afstemning } from '../../api/models';
import { Vote, VoteType } from '../../types/Vote';
import { getSagtrin } from '../../api/queries/sagstrin';
import { getAfstemningerFromThisYear } from '../../api/queries/afstemning';
import { getStemmerWithAfstemningsId } from '../../api/queries/stemme';
import { getMF } from '../../api/queries/MF';
import { getSag } from '../../api/queries/sag';

const NUMBER_OF_VOTES = 15;

const SagVote: React.FC = () => {
  const [voteStep, setVoteStep] = useState<number>(1);
  const [voteResets, setVoteReset] = useState<number>(0);
  const [currentSag, setCurrentSag] = useState<Sag>();
  const [currentAfstemning, setCurrentAfstemning] = useState<Afstemning>();
  const [allAfstemninger, setAllAfstemninger] = useState<Afstemning[]>();
  const [userVotes, setVote] = useState<Vote[]>([]);

  useEffect(() => {
    const fetchAfstemninger = async () => {
      const afstemninger = await getAfstemningerFromThisYear();

      if (afstemninger) {
        setAllAfstemninger([...afstemninger]);
      }
    };

    fetchAfstemninger();
  }, []);

  useEffect(() => {
    const fetchSag = async () => {
      if (allAfstemninger) {
        const afstemning = allAfstemninger[Math.floor(Math.random() * allAfstemninger.length)];
        const sagstrin = await getSagtrin(afstemning.sagstrinid);

        if (sagstrin) {
          const sag = await getSag(sagstrin.sagid);
          if (sag) {
            if (!sag.resume) fetchSag();
            if (userVotes.find((vote) => vote.afstemningsid === afstemning.id)) fetchSag();
            else {
              setCurrentAfstemning(afstemning);
              setCurrentSag(sag);
            }
          }
        }
      }
    };

    fetchSag();
  }, [allAfstemninger, voteStep, voteResets]);

  const handleVote = (vote: Vote) => {
    setVoteStep(voteStep + 1);

    setVote([...userVotes, vote]);
  };

  const handleGetResults = async () => {
    const stemmer = await getStemmerWithAfstemningsId(userVotes.map((vote) => vote.afstemningsid));

    if (stemmer) {
      const uniqueMFIds: number[] = [];
      stemmer.forEach((stemme) => {
        if (!uniqueMFIds.some((id) => id === stemme.aktørid)) {
          uniqueMFIds.push(stemme.aktørid);
        }
      });

      // get MFs who have voted in the same votes as the user
      const MFs = await Promise.all(
        uniqueMFIds.map(async (id) => {
          return await getMF(id);
        })
      );

      //get array of MFs and their votes
      //stemme typeid 1 = for, typeid 2 = against
      const MFScores = MFs.map((MF) => {
        if (MF) {
          //get votes casted by current MF in the same votes as the user has voted in
          const MFvotes = stemmer.reduce((prev, stemme) => {
            if (stemme.aktørid === MF.id && (stemme.typeid === 1 || stemme.typeid === 2)) {
              const vote: VoteType = stemme.typeid === 1 ? 'for' : 'imod';
              return [...prev, { afstemningsid: stemme.afstemningid, type: vote }];
            }
            return prev;
          }, [] as Vote[]);

          //compare votes from current MF against user votes to get score
          return {
            aktørid: MF.id,
            score: MFvotes.reduce((prev, MFvote) => {
              const match = userVotes.some((userVote) => {
                if (JSON.stringify(userVote) === JSON.stringify(MFvote)) {
                  return true;
                }
              });

              if (match) return prev + 1;

              return prev;
            }, 0),
            numberOfVotes: MFvotes.length,
          };
        }
      });

      const MFScoresSorted = MFScores.sort((prev, MFScore) => {
        if (prev && MFScore) {
          return prev.score > MFScore.score ? -1 : 1;
        }

        return 0;
      });

      if (MFScoresSorted[0]) {
        const MFMatch = await getMF(MFScoresSorted[0].aktørid);

        console.log(`Match folketingsmedlem: ${MFMatch?.fornavn} ${MFMatch?.efternavn}`);
        console.log(
          `Antal afstemninger som både du og dit match har stemt i: ${MFScoresSorted[0].numberOfVotes}/${NUMBER_OF_VOTES}`
        );
        console.log(
          `Antal afteminger hvor du og dit match var enige: ${MFScoresSorted[0].score}/${NUMBER_OF_VOTES}`
        );
        console.log(
          `Enighed i procent: ${(MFScoresSorted[0].score / MFScoresSorted[0].numberOfVotes) * 100}%`
        );
      }
    }
  };

  if (voteStep > NUMBER_OF_VOTES) {
    return (
      <div>
        Done!
        <button onClick={() => handleGetResults()}>Hent resultat</button>
      </div>
    );
  }

  if (allAfstemninger && currentSag && currentAfstemning) {
    return (
      <div>
        <button onClick={() => handleVote({ afstemningsid: currentAfstemning.id, type: 'for' })}>
          For
        </button>
        <button onClick={() => handleVote({ afstemningsid: currentAfstemning.id, type: 'imod' })}>
          Imod
        </button>
        <button onClick={() => setVoteReset(voteResets + 1)}>Skift sag</button>
        <div>{currentSag.typeid}</div>
        <div>{currentSag.resume}</div>
        <div>{`${voteStep}/${NUMBER_OF_VOTES}`}</div>
      </div>
    );
  }

  return <div>Ingen afstemninger</div>;
};

export default SagVote;
