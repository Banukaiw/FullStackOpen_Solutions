//add successful massage

import { useEffect, useState } from 'react'
import Names from "./components/Names"
import nameService from './service/name';
import './index.css'

/* const Notification =({successMessage})=>{
  return(
    <div className='sucessMassage'>
      {successMessage}
    </div>
  )
} */


const Filter=({searchPerson, handleSearchPerson})=>{
  return(
    <div>
          Filter shown with: {""}
          <input value={searchPerson} onChange={handleSearchPerson} />
      </div> 
  )
} 

const PersonForm=({addName, newName,handleNameChange, newNumber,handleNumberChange,successMessage})=>{
  return(
    <div>
    {/*   {successMessage && <Notification successMessage={successMessage}/>} */}
      {/* <Notification successMessage={successMessage}/> */}
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
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("")

  const Notification=({message, isError})=>{
    if(!message){
      return null;
    }
    const className = isError ? "error-message":"success-message"
    return <div className={className}>{message}</div>
  }


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

    const nameExists = persons.find((person)=> person.name.toLowerCase() === newName) //from some check all eleliment satitfy with the conditiom
    console.log(nameExists);
    

    const nemeObject ={
      //id: persons.lenght+1,
      name: newName,
      number: newNumber,
    }

    //newly added

    if(nameExists){
      const confirmed = window.confirm(`${nameExists.name} is already added to phonebook`);
      if(!confirmed){
        //if user doesnt confirm the entry to be true, do nothing
        return;
      }
      //update logic
      nameService.update(nameExists.id,nemeObject).then(updatedPerson=>{
        setPersons(prevPerson=>{
          prevPerson.id === nameExists.id?updatedPerson:persons;
        })
        setFilteredPersons(prevfilteredPerson=>{
          prevfilteredPerson.id === nameExists.id?updatedPerson:persons
        })
        setSuccessMessage(`${updatedPerson.name} is successfully updated`)
        setTimeout(()=>{
          setSuccessMessage("")
        },4000)
      }).catch(error=>{
        console.error("Error updating the number:",error.massage)
        setErrorMessage(`Information: ${nameExists.name} has already been from server`)
        /* alert("Error updating the number") */
        setTimeout(()=>{
          setErrorMessage("")
        },4000)
      });
    }else{
      nameService.Create(nemeObject).then((returnPersons)=>{
        console.log(returnPersons)
        setPersons(persons.concat(returnPersons))
        setFilteredPersons(filtedPerson.concat(returnPersons))
        setSuccessMessage(`${returnPersons.name} is successfully added`)
        setTimeout(()=>{
          setSuccessMessage("")
        },4000)
        
        }).catch(error=>{
          console.error("Error updating the number:",error.massage)
          alert("Error updating the number")
        });
    }
    setNewName("")   
    setNewNumber("") 

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
     {/*  <Notification successMessage={successMessage}/> */}
      <h2>Phonebook</h2>
      <Notification message={successMessage} isError={false}/>
      <Notification message={errorMessage} isError={false}/>
      
      <Filter searchPerson={searchPerson} handleSearchPerson={handleSearchPerson}/>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} 
      handleNumberChange={handleNumberChange} /* successMessage={successMessage} *//>
      
      
      <h2>Members</h2>
      <Persons filtedPerson={filtedPerson} deleteName={deleteName}/>
      

    </div>
  )
}

export default App