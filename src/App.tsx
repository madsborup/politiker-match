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
      <h1>PolitikerMatch</h1>
      <div>
        Stem i 15 tilfældige afstemninger fra folketinget inden for det seneste halve år, og se hvilke(n)
        politiker der har stemt tættest på dig!
      </div>
      <button onClick={() => setIsVoting(true)}>Begynd!</button>
    </div>
  );
};

export default App;
