import React from "react";
import { useState } from "react";
import Split from 'react-split'
import Sidebar from "./Sidebar";
import { nanoid } from 'nanoid';
import Editor from "./Editor.jsx";


export default function App() {
  const [notesArr, setNotesArr] = useState([])
  const [currentID, setCurrentID] = useState(notesArr[0]?.id) || []

  const addNote = ()=>{
    const newNote = {
      id: nanoid(),
      body: "#Add Your Text Here"
    }

    setNotesArr(prevArr => [newNote, ...prevArr])
    setCurrentID(newNote.id)
  }

  const setCurrentNoteId = (id) =>{
    setCurrentID(id)
  }

  const updateNote = (text)=>{
    setNotesArr(oldNotes => oldNotes.map(oldNote => {
      return oldNote.id === currentID
          ? { ...oldNote, body: text }
          : oldNote
    }))
  }

  function findCurrentNote(){
    const note = notesArr.find(note => {
      return note.id === currentID
    })
    return note
  }

  const deleteNote = (event, id) => {
    event.stopPropagation()
    let filteredNotes = notesArr.filter(note=> note.id !== id)
    setCurrentID(filteredNotes[0]?.id || [])
    setNotesArr(filteredNotes) 
  }

  return (
    <div className="container-fluid px-0" style={{height:"100vh"}}>
      {notesArr.length > 0 ? <Split
        sizes={[25, 75]}
        minSize={100}
        expandToMin={true}
        gutterSize={10}
        gutterAlign="center"
        snapOffset={30}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className="split"
      >
        <Sidebar
          notes={notesArr}
          addNote={addNote}
          currentNote={findCurrentNote()}
          setCurrentNoteId={setCurrentNoteId}
          deleteNote={deleteNote}
        />
        <Editor
          currentNote={findCurrentNote()}
          updateNote={updateNote}
        />
      </Split>
      :
      <div className="d-flex flex-column align-items-center justify-content-center" style={{height:"100vh"}}>
      <h2>No Notes Here</h2>
      <button className="btn selected-note" onClick={addNote}>Create Note</button>
      </div>
      }
    </div>
  );
}
