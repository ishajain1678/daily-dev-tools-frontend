import { useEffect, useState } from 'react';

export default function Jokes() {
  const [joke, setJoke] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/jokes/random')
      .then(res => res.json())
      .then(data => setJoke(data.joke));
  }, []);

  return (
    <div>
      <h2>Programming Joke</h2>
      <p>{joke}</p>
    </div>
  );
}