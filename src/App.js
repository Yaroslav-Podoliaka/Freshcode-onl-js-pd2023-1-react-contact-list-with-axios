import React, { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import api from './contact-service';
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";

function App() {

  const [contacts, setContacts] = useState([]);
  const [contactForEdit, setContactForEdit] = useState(createEmptyContact());

  function createEmptyContact() {
    return {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  }
  useEffect(() => {
    api.get('/')
    .then(({data}) => {
      data ? setContacts(data) : setContacts([]);
    })
  }, [])

  function selectContact(contact) {
    setContactForEdit(contact);
  }

  function createContact(contact) {
    contact.id = nanoid(12);
    api.post('/', contact).then(({data}) => {
    const newContacts = [...contacts, data];
    setContacts(newContacts);  
    })
  }

  function updateContact(contact) {
    const updateContacts = contacts.map((item) =>
      item.id === contact.id ? contact : item);
    api.put(`/${contact.id}`, contact)
    .then(({data}) => {
      setContacts(updateContacts)
    })
  }

  function saveContact(contact) {
    if (!contact.id) {
      createContact(contact);
    } else {
      updateContact(contact);
    }
  }

  function addNewContact() {
    setContactForEdit(createEmptyContact());
  }

  function deleteContact(id) {
    api.delete(`/${id}`)
    .then(({statusText}) => console.log(statusText))
    .catch((e) => console.log(e))
    const delContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(delContacts);
  }

  return (
    <div className="container">
      <h1 className="header">Contact List</h1>
      <div className="main">
        <ContactList
          contacts={contacts}
          onDelete={deleteContact}
          onAddContact={addNewContact}
          onEditContact={selectContact}
        />
        <ContactForm
          contactForEdit={contactForEdit}
          onSubmit={saveContact}
          onDelete={deleteContact}
        />
      </div>
    </div>
  );
}

export default App;
