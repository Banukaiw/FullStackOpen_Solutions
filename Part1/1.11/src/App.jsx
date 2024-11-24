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
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
    
    
  
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
      <Header/>
      <Button onClick={GoodCount} text='good'/>
      <Button onClick={NeutralCount} text='neutral'/>
      <Button onClick={BadCount} text='bad'/>
      <br></br>
      <Content/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App