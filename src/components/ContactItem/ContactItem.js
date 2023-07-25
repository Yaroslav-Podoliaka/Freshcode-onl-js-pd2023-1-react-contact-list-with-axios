import React from 'react';
import './ContactItem.css';

function ContactItem({ key, contact, onDelete, onEdit }) {
  // onItemDelete = (event) => {
  //   this.props.onDelete(this.props.contact.id);
  // };

  function onItemDelete() {
    onDelete(contact.id);
  }

  // onContactEdit = (event) => {
  //   this.props.onEdit(this.props.contact);
  // };

  function onContactEdit() {
    onEdit(contact);
  }

  return (
    <div className="contact-item">
      <p className="content" onDoubleClick={onContactEdit}>
        {contact.firstName} {contact.lastName}
      </p>
      <span className="delete-btn" onClick={onItemDelete}>
        X
      </span>
    </div>
  );
}

export default ContactItem