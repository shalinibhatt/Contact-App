import Header from "./Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import AddContact from "./AddContact";
import { v4 as uuidv4 } from "uuid";
import ContactLiST from "./ContactLiST";
import ContactDetails from "./ContactDetails";
import api from "../api/Contacts";
import EditContacts from "./EditContacts";

function App() {
  const [contacts, setcontacts] = useState([]);
//Retrieve contacts 
const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };
  const updatecontactHandler=async(contact)=>{
    
    const response=await api.put(`/contacts/${contact.id}`,contact);
    const {id}=response.data;
    setcontacts(contacts.map((contact)=>{
      return contact.id===id?{...response.data}:contact;
    }))
  }

  const contactHandler = async(contact) => {
    const request = {
      id: uuidv4(),
      ...contact
    };
    const response=await api.post("/contacts",request);
    setcontacts([...contacts,response.data]);
  };
  const removeContactHandler = async (id) => {
   await api.delete(`/contacts/${id}`);

    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setcontacts(newContactList);
  };
  useEffect(() => {
    const getALLcontacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setcontacts(allContacts);
    };
    getALLcontacts();
    // const retrieveContact = JSON.parse(localStorage.getItem(LOCAL_STROAGE_KEY));
    // if (retrieveContact) setcontacts(retrieveContact);
  }, []);
  //useeffect k order se bhi frk pdta h
  //uuid npm i uuidv4 ;;;;; install give us unique id for our contacts
  useEffect(() => {
 //   localStorage.setItem(LOCAL_STROAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Routes>
          {" "}
          <Route
            path="/add"
            element={<AddContact contactHandler={contactHandler} />}
          />
          <Route
            path="/"
            element={
              <ContactLiST
                contacts={contacts}
                getContactId={removeContactHandler}
              />
            }
          />
          <Route path="/contact/:id" element={<ContactDetails />} />
          <Route path="/edit" element={<EditContacts updatecontactHandler ={updatecontactHandler}/>} />

        </Routes>
        {/* "Switch" is replaced by "Routes"*/}
      </Router>
    </div>
  );
}

export default App;
