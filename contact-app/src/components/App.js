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
import api from "../api/contacts";
import Header from "./Header";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

function App() {
  //const LOCAL_STORAGE_KEY = "contacts";
  // const [contacts, setContacts] = useState(() => {
  //   const savedContact = localStorage.getItem(LOCAL_STORAGE_KEY);
  //   return savedContact ? JSON.parse(savedContact) : [];
  // });

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Fetch contacts from json-server using Axios
  const retrieveContacts = async () => {
    try {
      const response = await api.get("http://localhost:3006/contacts");
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return [];
    }
  };

  const addContactHandler = async (contact) => {
    const newContact = { id: uuid(), ...contact };
    try {
      const response = await api.post(
        "http://localhost:3006/contacts",
        newContact
      );
      setContacts([...contacts, response.data]);
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const updateContactHandler = (updatedContact) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const removeContactsHandler = async (id) => {
    try {
      await api.delete(`http://localhost:3006/contacts/${id}`);
      const newContactList = contacts.filter((contact) => contact.id !== id);
      setContacts(newContactList);
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    console.log(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };

  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  // const addContactHandler = (contact) => {
  //   console.log(contact);
  //   setContacts([...contacts, { id: uuid(), ...contact }]);
  // };

  // const removeContactsHandler = (id) => {
  //   const newContactList = contacts.filter((contact) => {
  //     return contact.id !== id;
  //   });

  //   setContacts(newContactList);
  // };

  // useEffect(() => {
  //   console.log("getItem");
  //   const retrieveContacts = JSON.parse(
  //     localStorage.getItem(LOCAL_STORAGE_KEY)
  //   );
  //   console.log("hello", retrieveContacts);
  //   if (retrieveContacts) setContacts(retrieveContacts);
  // }, []);
  // useEffect(() => {
  //   console.log("setItem");
  //   localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  // }, [contacts]);
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
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactsHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            }
          ></Route>
          <Route
            path="/add"
            element={<AddContact addContactHandler={addContactHandler} />}
          ></Route>

          <Route
            path="/edit/:id"
            element={
              <EditContact updateContactHandler={updateContactHandler} />
            }
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
