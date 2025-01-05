//delect the data from backend

import { useEffect, useState } from 'react'
import Names from "./components/Names"
import nameService from './service/name';


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

const Persons = ({filtedPerson,deleteName})=>{
  return(
    <div>
      {filtedPerson.map((person)=>{
      return <Names key={person.id} person={person} deleteName={deleteName}/>
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
    console.log("effect")
    nameService.getALL().then((initialPerson)=>{
      console.log("promise fulfilled!")
      setPersons(initialPerson);
      setFilteredPersons(initialPerson)
    })
    .catch((error)=>{
      console.error("Error fetching data:",error)
    })
    
  },[])
  console.log("render", persons.length, "persons")

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
      //id: persons.lenght+1,
      name: newName,
      number: newNumber,
    }

    
    nameService.Create(nemeObject).then((returnPersons)=>{
    console.log(returnPersons)
    setPersons(persons.concat(returnPersons))
    setFilteredPersons(filtedPerson.concat(returnPersons))
    setNewName("")   
    setNewNumber("") 
    })

  }

  //newly added
  const deleteName = (id) =>{
    nameService
    .remove(id)
    .then(() => {
      setPersons(persons.filter((persons)=>persons.id !== id))
      setFilteredPersons(filtedPerson.filter((persons)=>persons.id !== id))
    }).catch((error)=>{
      console.log("error deleting persons", error.massage)
      alert("error deleting person")
    })
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
      <Persons filtedPerson={filtedPerson} deleteName={deleteName}/>
      

    </div>
  )
}

export default App