import { useState } from 'react'

const Button=(props)=>{
  return(
    <button onClick={props.onClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  

  const GoodCount=()=>{
    setGood(good+1)
    
  }
  const NeutralCount=()=>{
    setNeutral(neutral+1)
    
  }
  const BadCount=()=>{
    setBad(bad+1)
    
  }


  return (
    <div>
      <h1>Give feedback</h1>
      <Button onClick={GoodCount} text='good'/>
      <Button onClick={NeutralCount} text='neutral'/>
      <Button onClick={BadCount} text='bad'/>
      <br></br>
      <h1>Statistics</h1>
      <h3>Good:{good}</h3>
      <h3>Neutral:{neutral}</h3>
      <h3>Bad:{bad}</h3>
      <h3>Total:{good+bad+neutral}</h3>
      <h3>Average:{(good-bad)/(good+neutral+bad)}</h3>
      <h3>Positive:{(good)/(good+bad+neutral)*(100)}%</h3>
    </div>
  )
}

export default App
