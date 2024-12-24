// check the name is alrady  exsit in the array
import { useState } from 'react'
import Names from "./components/Names"


const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")

  const addName = (event)=>{
    event.preventDefault()
    console.log(event.target)

    const nameExists = persons.some((person)=> person.name === newName) 
    console.log(nameExists);
    if(nameExists){
      alert(`${newName} is already added to phonebook`);
      setNewName("");
      return
    }

    const nemeObject ={
      id: persons.lenght+1,
      name: newName,
      number: newNumber,
    }

    setPersons(persons.concat(nemeObject))
    setNewName("")
    setNewNumber("")
  }

  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange=(event)=>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          Number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      {persons.map((person)=>{
       return <Names key={person.id} person={person}/>
      })}
    </div>
  )
}

export default App