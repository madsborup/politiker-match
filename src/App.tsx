import React, { useEffect, useState } from 'react';
import './App.css';
import SagVote from './views/SagVote';

const App: React.FC = () => {
  const [isVoting, setIsVoting] = useState<boolean>(false);

  useEffect(() => {}, []);

  if (isVoting) {
    return (
      <div>
        Så stemmer vi!
        <SagVote />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hej, velkommen til PolitikerMatch</h1>
      <div>
        Stem i 20 tilfældige afstemninger fra folketinget inden for det seneste år, og se hvilke(n)
        politikere der har stemt ligesom dig!
      </div>
      <button onClick={() => setIsVoting(true)}>Begynd!</button>
    </div>
  );
};

export default App;
