import React, {useState} from "react";
import Layout from "../../components/layout";

//Amplify configuration
import {Amplify} from "aws-amplify";
import awsconfig from "../aws-exports"
import {AmplifyAuthenticator,AmplifySignOut} from "@aws-amplify/ui-react"
Amplify.configure(awsconfig)
const Notespage = () =>{
    const [newNote,setNewNote] = useState({title:"", body:""})
    const [notes,setNotes] = useState([]);
    const handleSubmit=(e)=>{
        e.preventDefault();
        try{
            if (!newNote.title.length || !newNote.body.length)return;
            // create note in backend
            setNotes([newNote,...notes]);
            console.log("New note added")
        }catch (err){
            console.log("error in creating the note")
        }
    }
    return (
        <Layout>
            <AmplifyAuthenticator>
                <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
                    <h1>My Personal Notes</h1>
                    <AmplifySignOut/>
                </div>

                <form onSubmit={handleSubmit}>
                    <p><input
                        type="text"
                        placeholder={"type title"}
                        style={{width:"50%",fontSize: "15px"}}
                        value = {newNote.title}
                        onChange={(e)=>setNewNote({...newNote, title: e.target.value})}
                    />
                    </p>
                    <p><textarea
                        row = "4"
                        placeholder={"type body"}
                        style={{width:"70%",fontSize: "15px"}}
                        value = {newNote.body}
                        onChange={(e)=>setNewNote({...newNote, body: e.target.value})}
                    />
                    </p>
                    <p>
                        <input
                            type="submit"
                            style={{width: "30%",height:"30px"}}
                            value={"Add Note"}
                        />

                    </p>
                </form>
                <hr/>

                {notes.map((note,index)=>(
                    <div key = {index}>
                        <h2>{note.title}</h2>
                        <p>{note.body}</p>
                    </div>
                ))}
            </AmplifyAuthenticator>

        </Layout>
    )
}
export default Notespage