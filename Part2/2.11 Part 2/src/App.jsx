// separate each componenet
import { useEffect, useState } from 'react'
import Names from "./components/Names"
import axios from 'axios';

/* const Name=({person})=>{
  return<div>{person.name} {person.number}</div>
  
} */

  const persons = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ];

const Filter=({searchPerson, handleSearchPerson})=>{
  return(
    <div>
          Filter shown with: {""}
          <input value={searchPerson} onChange={handleSearchPerson} />
      </div> 
  )
} 

const PersonForm=({addName, newName,handleNameChange, newNumber,handleNumberChange})=>{
  return(
    <div>
      <form onSubmit={addName}>
        <h2>Add a New</h2>
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
    </div>
  )
}

const Persons = ({filtedPerson})=>{
  return(
    <div>
      {filtedPerson.map((person)=>{
      return <Names key={person.id} person={person}/>
     })}
    </div> 
  )
} 


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchPerson, setSetSearchPersone] = useState("")  // State to hold input value
  const [filtedPerson,setFilteredPersons] = useState([])

  useEffect(()=>{
    console.log("effecr")
    axios.get()
  })

  const addName = (event)=>{
    event.preventDefault()
    console.log(event.target)

    const nameExists = persons.some((person)=> person.name === newName) //from some check all eleliment satitfy with the conditiom
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
    setFilteredPersons(filtedPerson.concat(nemeObject))
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

  const handleSearchPerson = (event)=>{
    console.log(event.target.value)
    setSetSearchPersone(event.target.value) // Update state with input value

    const filterItem = persons.filter((person)=>
      person.name.toLowerCase().includes(event.target.value.toLowerCase())) //checks if the name property contains the substring in event.target.value.
    setFilteredPersons(filterItem)
  } 

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson}/>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      
      
      <h2>Members</h2>
      <Persons filtedPerson={filtedPerson}/>
      

    </div>
  )
}

export default App