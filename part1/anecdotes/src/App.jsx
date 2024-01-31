import { useState } from "react";
import "./App.css";

function App() {
  const MostVoted = ({ anecdotes, points, mostVotes }) => {
    if (mostVotes > 0) {
      return (
        <div>
          <h3>Most voted anecdote</h3>
          <p>{anecdotes[mostVotes]}</p>
          <h3>has {points[mostVotes]} votes</h3>
        </div>
      );
    }
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(7).fill(0));
  const [mostVotes, setMostVotes] = useState();

  const addVote = () => {
    const copy = [...points];
    copy[selected] += 1;
    setPoints(copy);
    const mostVotes = Math.max(...points);

    console.log(mostVotes);
    setMostVotes(points.indexOf(Math.max(mostVotes)));
  };

  const randomNumber = () => {
    const number = Math.floor(Math.random() * 7);
    if (number != selected) {
      setSelected(number);
    } else {
      setSelected(Math.floor(Math.random(number) * 7));
    }
  };

  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  return (
    <>
      <h2>Anectode of the Day</h2>
      {anecdotes[selected]}
      <br />
      has {points[selected]} votes
      <br />
      <br />
      <button onClick={addVote}>vote</button>
      <button onClick={randomNumber}>next anecdote</button>
      <br />
      <br />
      <MostVoted anecdotes={anecdotes} points={points} mostVotes={mostVotes} />
    </>
  );
}

export default App;
