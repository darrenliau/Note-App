import React, {useEffect, useState} from "react";
import Layout from "../../components/layout";
//Api imports
import {API,graphqlOperation} from "aws-amplify";
import {createNote} from "../graphql/mutations";
import {listNotes} from "../graphql/queries";

//Amplify configuration
import {Amplify,Hub} from "aws-amplify";
import awsconfig from "../aws-exports"
import {AmplifyAuthenticator,AmplifySignOut} from "@aws-amplify/ui-react"
Amplify.configure(awsconfig)
const Notespage = () =>{
    const [loading, setLoading] = useState(false);
    const [newNote,setNewNote] = useState({title:"", body:""});
    const [notes,setNotes] = useState([]);
    const [isUserLoggedIn,setIsUserLoggedIn] = useState(false);
    useEffect(()=> {
        let isUnmounted = false;
        Hub.listen('auth',({payload:{event,data}}) =>{
            if(event === "signIn"){
                //user is signed in
                !isUnmounted && setIsUserLoggedIn(true);
            }
        })
        return ()=> {
            isUnmounted=true;
        }
    },[]);
    useEffect(()=> {
        fetchNotes();
    },[isUserLoggedIn])
    const fetchNotes = async()=>{
        setLoading(true);
        try{
            const notesData = await API.graphql(graphqlOperation(listNotes))
            const notes = notesData.data.listNotes.items;
            setNotes(notes);
            setLoading(false)
        }catch(err){
            console.log("Error in fetching notes")
        }
    }
    const handleSubmit= async (e)=>{
        e.preventDefault();
        try{
            if (!newNote.title.length || !newNote.body.length)return;
            setNotes([newNote,...notes]);
            await API.graphql(graphqlOperation(createNote,{input: newNote}))
            setNewNote({title: "",body: ""});
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
                {loading ? <h2>Loading...</h2>:<span></span>}
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