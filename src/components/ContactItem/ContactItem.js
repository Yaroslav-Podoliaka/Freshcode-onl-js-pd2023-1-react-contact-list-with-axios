import React from 'react';
import { useDispatch } from 'react-redux';
import {
  delContact,
  selectContact
} from '../../store/slices/contactSlice';
import './ContactItem.css';

function ContactItem({ contact }) {

  const dispatch = useDispatch();

  function onItemDelete() {
    dispatch(delContact(contact.id));
  }

  function onContactEdit(event) {
    event.stopPropagation();
    dispatch(selectContact(contact));
  }

  return (
    <div className="contact-item" onDoubleClick={onContactEdit}>
      <p className="content">
        {contact.firstName} {contact.lastName}
      </p>
      <span className="delete-btn" onClick={onItemDelete}>
        X
      </span>
    </div>
  );
}

export default ContactItem