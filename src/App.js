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
    .catch((statusText) => console.log(statusText))
  }, [])

  function selectContact(contact) {
    setContactForEdit(contact);
  }

  function createContact(contact) {
    contact.id = nanoid();
    api.post('/', contact).then(({data}) => {
    const newContacts = [...contacts, data];
    setContacts(newContacts);  
    })
    .catch((statusText) => console.log(statusText))
  }

  function updateContact(contact) {
    api.put(`/${contact.id}`, contact)
    .then(({data}) => {
      setContacts(contacts.map((item) =>
      item.id === contact.id ? contact : item))
    })
    .catch((statusText) => console.log(statusText))
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
    .catch((statusText) => console.log(statusText))
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
