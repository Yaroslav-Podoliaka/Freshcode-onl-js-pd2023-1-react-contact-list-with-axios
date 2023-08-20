import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContactItem from '../ContactItem/ContactItem';
import {
  addNewContact,
  delContact,
  selectContact,
  getContacts
} from '../../store/slices/contactSlice';
import {Watch} from 'react-loader-spinner';
import './ContactList.css';

function ContactList() {

  const contacts = useSelector((store) => store.mainContactList.contacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  function onAddNewContact() {
    dispatch(addNewContact());
  }
  
  return (
    <div className="list-container">
      <div className="item-container">
        {!contacts ? (
          <Watch
          height='500'
          width='500'
          color='teal'
          ariaLabel='watch-loading'
          wrapperStyle={{}}
          wrapperClassName=''
          visible={true}
          />
        ) : (
        contacts.map((contact) => {
          return (
            <ContactItem
              key={contact.id}
              contact={contact}
              onDelete={delContact}
              onEdit={selectContact}
            />
          );
        })
      )}
      </div>
      <button id="new" onClick={onAddNewContact}>
        New
      </button>
    </div>
  );
}

export default ContactList;