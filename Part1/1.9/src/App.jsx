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
const Statistics = (props)=>{
  if (!(props.good || props.neutral || props.bad)){
    return <p>No feedback Given</p>; 
  }
    return(
      <div>
          <div>
            <h3>Good:{props.good}</h3>
          <h3>Neutral:{props.neutral}</h3>
          <h3>Bad:{props.bad}</h3>
          <h3>Total:{props.good+props.bad+props.neutral}</h3>
          <h3>Average:{(props.good-props.bad)/(props.good+props.neutral+props.bad)}</h3>
          <h3>Positive:{(props.good)/(props.good+props.neutral+props.bad)*(100)}%</h3>
          </div>  
      </div>
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