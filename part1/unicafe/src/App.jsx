import { useState } from "react";
import "./App.css";

const Statistics = (props) => {
  if (props.good || props.neutral || props.bad) {
    return (
      <>
        <h2>statistics</h2>
        <table>
          <tbody>
            <tr>
              <td>good:</td>
              <td>{props.good}</td>
            </tr>
            <tr>
              <td>neutral: </td>
              <td>{props.neutral}</td>
            </tr>
            <tr>
              <td>bad: </td>
              <td>{props.bad}</td>
            </tr>
            <tr>
              <td>average: </td>
              <td>
                {((props.good - props.bad) /
                  (props.good + props.bad + props.neutral)) *
                  100}
                %
              </td>
            </tr>
            <tr>
              <td>postive%: </td>
              <td>
                {(props.good / (props.good + props.bad + props.neutral)) * 100}%
              </td>
            </tr>
          </tbody>
        </table>
      </>
    );
  } else {
    return <p>No feedback given</p>
  }
};

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <div>
        <button onClick={() => setGood(good + 1)}>good</button>
        <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
        <button onClick={() => setBad(bad + 1)}>bad</button>
      </div>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
}

export default App;
