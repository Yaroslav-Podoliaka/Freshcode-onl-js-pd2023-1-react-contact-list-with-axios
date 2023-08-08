import React, { useEffect, useState } from "react";
import './ContactForm.css';

function ContactForm({ contactForEdit, onSubmit, onDelete }) {
  
  const [contact, setContact] = useState({ ...contactForEdit });
  
  useEffect(() => {
    setContact(contactForEdit);
  }, [contactForEdit]);

  function createEmptyContact() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    };
  };

  function onInputChange(event) {
    const { name, value } = event.target;
    setContact((contact) => ({
      ...contact,
      [name]: value,
    }));
  };

  function onClearField(event) {
    const sibling = event.target.parentNode.firstChild;
    setContact((contact) => ({
      ...contact,
      [sibling.name]: "",
    }));
  };

  function onFormSubmit(event) {
    event.preventDefault();
    onSubmit({...contact});
  };

  function onContactDelete() {
    onDelete({...contactForEdit.id});
    setContact(createEmptyContact());
  };

  return (
    <form id="contact-form" onSubmit={onFormSubmit}>
      <div className="form-container">
        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="First name"
            name="firstName"
            value={contact.firstName}
            onChange={onInputChange}
          />
          <span className="clear" onClick={onClearField}>
            X
          </span>
        </div>
        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="Last name"
            name="lastName"
            value={contact.lastName}
            onChange={onInputChange}
          />
          <span className="clear" onClick={onClearField}>
            X
          </span>
        </div>
        <div className="contact-info">
          <input
            type="email"
            className="text-field"
            placeholder="Email"
            name="email"
            value={contact.email}
            onChange={onInputChange}
          />
          <span className="clear" onClick={onClearField}>
            X
          </span>
        </div>
        <div className="contact-info">
          <input
            type="text"
            className="text-field"
            placeholder="Phone"
            name="phone"
            value={contact.phone}
            onChange={onInputChange}
          />
          <span className="clear" onClick={onClearField}>
            X
          </span>
        </div>
      </div>
      <div className="btns">
        <button id="save" type="submit">
          Save
        </button>
        {contact.id ? (
          <button id="delete" type="button" onClick={onContactDelete}>
            Delete
          </button>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}

export default ContactForm;
