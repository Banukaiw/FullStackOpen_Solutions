import { useState } from 'react'

const Header=()=>{
  return(
    <div>
      <h1>Give feedback</h1>
      
    </div>
  )
}

const Content=()=>{
  return(
    <div>
      <h1>Statictics</h1>
      
    </div>
  )
}

const Button=(props)=>{
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

 const StatisticLine =(props)=>{
  return (
    <tbody>
      <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    </tbody>
  )
} 
const Statistics = (props)=>{
  if (!(props.good || props.neutral || props.bad)){
    return <p>No feedback Given</p>; 
  }
    return(
      <div>
          <table>
          <StatisticLine text="Good" value={props.good}/> 
          <StatisticLine text="Neutral" value={props.neutral}/> 
          <StatisticLine text="Bad" value={props.bad}/> 
          <StatisticLine text="Total" value={props.good+props.bad+props.neutral}/>
          <StatisticLine text="Average" value={(props.good-props.bad)/(props.good+props.neutral+props.bad)}/>
          <StatisticLine text="Positive" value={(props.good)/(props.good+props.neutral+props.bad)*(100)+" %"}/>
          </table>  
      </div>
    ) 
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)

  const GoodCount=()=>{
    setGood(good+1)
  }
  const NeutralCount=()=>{
    setNeutral(neutral+1) 
  }
  const BadCount=()=>{
    setBad(bad+1)  
  }
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const RandomString=()=>{ 
      const RandomIndex = Math.floor(Math.random()*anecdotes.length);
      setSelected(RandomIndex);
  }

  const initialVote = new Array(anecdotes.length).fill(0);
  /* console.log(initialVote); */
  const [votes,setVotes] = useState(initialVote);

  const handleVote=()=>{
    const newVote = [...votes];
    console.log(newVote);
    newVote[selected] += 1;
    setVotes(newVote);
  }

  return (
    <div>
      <Header/>
      <Button onClick={GoodCount} text='good'/>
      <Button onClick={NeutralCount} text='neutral'/>
      <Button onClick={BadCount} text='bad'/>
      <br></br>
      <Content/>
      <Statistics good={good} neutral={neutral} bad={bad} />
      <br></br>
      {anecdotes[selected]}
      <br></br>
      <p>has {votes[selected]}votes</p>
      <button onClick={RandomString}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
    </div>
  )
}

export default App