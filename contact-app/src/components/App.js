import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(() => {
    const savedContact = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedContact ? JSON.parse(savedContact) : [];
  });

  const addContactHandler = (contact) => {
    console.log(contact);
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const removeContactsHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  // useEffect(() => {
  //   console.log("getItem");
  //   const retrieveContacts = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_KEY)
  //   );
  //   console.log("hello", retrieveContacts);
  //   if (retrieveContacts) setContacts(retrieveContacts);
  // }, []);
  useEffect(() => {
    console.log("setItem");
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);
  return (
    <div className="ui container">
      <Router>
        <Header></Header>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <ContactList
                contacts={contacts}
                getContactId={removeContactsHandler}
              />
            }
          ></Route>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          ></Route>
          <Route
            path="/contact/:id"
            element={<ContactDetail></ContactDetail>}
          ></Route>
          {/* <AddContact addContactHandler={addContactHandler}></AddContact>
        <ContactList
          contacts={contacts}
          getContactId={removeContactsHandler}
        ></ContactList> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
