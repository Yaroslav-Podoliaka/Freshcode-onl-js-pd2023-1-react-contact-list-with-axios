import React from "react";
import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import "./App.css";

function App() {

  return (
    <div className="container">
      <h1 className="header">Contact List</h1>
      <div className="main">
        <ContactList
        />
        <ContactForm
        />
      </div>
    </div>
  );
}

export default App;
