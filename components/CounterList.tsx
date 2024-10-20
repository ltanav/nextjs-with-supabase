// components/CounterList.tsx
import React, { useState } from 'react';

interface Counter {
  id: number;
  count: number;
}

const CounterList: React.FC = () => {
  const [counters, setCounters] = useState<Counter[]>([]);

  const addCounter = () => {
    setCounters([...counters, { id: counters.length, count: 0 }]);
  };

  const incrementCounter = (id: number) => {
    setCounters(counters.map(counter => 
      counter.id === id ? { ...counter, count: counter.count + 1 } : counter
    ));
  };

  return (
    <div>
      <button onClick={addCounter}>Add Counter</button>
      {counters.map(counter => (
        <div key={counter.id}>
          <p>Count: {counter.count}</p>
          <button onClick={() => incrementCounter(counter.id)}>Increment</button>
        </div>
      ))}
    </div>
  );
};

export default CounterList;