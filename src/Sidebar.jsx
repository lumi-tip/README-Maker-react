import React from "react";

const Sidebar = (props)=>{
    
    const notes = props.notes.map((note,index) => {
        return (
        <div 
            key={index} 
            onClick={()=>props.setCurrentNoteId(note.id)}
            className ={`note p-2 ${props.currentNote.id === note.id ? "selected-note" : undefined}`}
        >
            <p className="m-0 fs-5 text-snippet">{note.body !== "" ? note.body.split("\n")[0] : `Note ${index + 1}`}</p>
            <button className="btn" onClick={(event)=>props.deleteNote(note.id)}>🗑️</button>
        </div>
        )
    })

    return(
        <div className="d-flex flex-column">
            <div className="d-flex justify-content-between align-items-center add-btn-wrapper">
                <h3 className="m-0">Notes</h3>
                <button className="add-btn" onClick={()=>props.addNote()}>+</button>
            </div>
            {notes}
        </div>
    )

}

export default Sidebar