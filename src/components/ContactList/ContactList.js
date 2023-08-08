import React from 'react';
import ContactItem from '../ContactItem/ContactItem';
import './ContactList.css';

function ContactList({ contacts, onDelete, onAddContact, onEditContact, }) {

  return (
    <div className="list-container">
      <div className="item-container">
        {contacts.map((contact) => {
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDelete={onDelete}
              onEdit={onEditContact}
            />
          );
        })}
      </div>
      <button id="new" onClick={onAddContact}>
        New
      </button>
    </div>
  );
}

export default ContactList