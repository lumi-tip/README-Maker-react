import React, { useEffect } from "react";
import { useState } from "react";
import Split from 'react-split'
import Sidebar from "./Sidebar";
import { nanoid } from 'nanoid';
import Editor from "./Editor.jsx";
import { onSnapshot, addDoc, deleteDoc, doc } from "firebase/firestore";
import { notesCollection, db } from "../firebase.js";


export default function App() {
  const [notesArr, setNotesArr] = useState([])
  const [currentID, setCurrentID] = useState(notesArr[0]?.id || "")

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
        const notesArray = snapshot.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        setNotesArr(notesArray)
        setCurrentID(notesArray[0]?.id || "")
        console.log(currentID)
    })
    return unsubscribe
}, [])

  const addNote = async ()=>{
    const newNote = {
      body: "#Add Your Text Here"
    }

    const ref = addDoc(notesCollection, newNote)
    setNotesArr(prevArr => [{...newNote, id:ref.id}, ...prevArr])
    setCurrentID(ref.id)
    console.log(notesArr)
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

  const deleteNote = async (id) => {
    // event.stopPropagation()
    // let filteredNotes = notesArr.filter(note=> note.id !== id)
    const docRef = doc(db, "notes", id)
    await deleteDoc(docRef)
    setCurrentID(notesArr[0]?.id || [])
    // setNotesArr(filteredNotes) 
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
