import React, { useEffect, useState } from 'react';
import { Sagstrin, Sag } from '../../api/models';
import { Vote } from '../../types/Vote'
import { getSagstrinFromThisYear } from '../../api/queries/sagstrin';
import { getSag } from '../../api/queries/sag';

const SagVote: React.FC = () => {
  const [voteStep, setVoteStep] = useState<number>(0);
  const [currentSag, setCurrentSag] = useState<Sag>();
  const [allSagsTrin, setAllSagstring] = useState<Sagstrin[]>();
  const [votes, setVote] = useState<Vote[]>([]);

  useEffect(() => {
    const fetchSagstrin = async () => {
      const data = await getSagstrinFromThisYear();

      if (data && data instanceof Array) {
        const sag = await getSag(data[Math.floor(Math.random() * data.length)].sagid);

        setAllSagstring([...data]);
        if (sag) setCurrentSag(sag);
      }
    };

    fetchSagstrin();
  }, []);

  useEffect(() => {
    const fetchCurrentSag = async () => {
      if (allSagsTrin) {
        const sag = await getSag(allSagsTrin[Math.floor(Math.random() * allSagsTrin.length)].sagid);

        if (sag) setCurrentSag(sag);
      }
    };
    
    fetchCurrentSag();
    console.log(votes)
    
  }, [voteStep]);

  const handleVote = (sag: Sag, positive: boolean) => {
    setVoteStep(voteStep + 1);

    setVote([...votes, {sagid: sag.id, positive}])
  }

  if (allSagsTrin && currentSag) {
    return (
      <div>
        <div>{currentSag.resume}</div>
        <button onClick={() => handleVote(currentSag, true)}>For</button>
        <button onClick={() => handleVote(currentSag, false)}>Imod</button>
        <div>{voteStep}</div>
      </div>
    );
  }

  return <div>No sagstrin</div>;
};

export default SagVote;
