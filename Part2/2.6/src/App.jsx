/* 
import Note from "./components/Note"
import { useState } from "react"; 
const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote] = useState('a new note')


    const addNote = (event) => {
    event.preventDefault()
    const noteObject = {
      content: newNote,
      important:Math.random() < 0.5,
      id:String(notes.length+1),
    }
    setNotes(notes.concat(noteObject))
    setNewNote('');
  } 

  const handleNoteChange = (event)=>{
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

console.log(notes)
  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map(note => 
          <Note key={note.id} note={note} />
        )}
      </ul>

       <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>   
    </div>
  )
}

export default App */


import { useState } from 'react'
import Names from "./components/Names"


const App = (props) => {
  const [persons, setPersons] = useState(props.persons) 
  const [newName, setNewName] = useState("")

  const addName = (event)=>{
    event.preventDefault()
    console.log(event.target)

    const nemeObject ={
      id: persons.lenght+1,
      name: newName
    }

    setPersons(persons.concat(nemeObject))
    setNewName("")
  }

  const handleNameChange=(event)=>{
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  console.log(persons[0].name)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
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