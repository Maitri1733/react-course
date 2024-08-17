import React, { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props, { contacts, getContactId }) => {
  const navigate = useNavigate();
  const inputEl = useRef("");

  const showContactDetails = (contact) => {
    navigate(`/contact/${contact.id}`, { state: { contact } });
  };

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  // const contacts = [
  //   {
  //     id: "1",
  //     name: "Dipt",
  //     email: "dp@gmail.com",
  //   },
  // ];
  const renderContactList = props.contacts.map((contact, index) => {
    return (
      <div className="main">
        <div
          className="item"
          key={contact.id}
          onClick={() => showContactDetails(contact)}
        ></div>
        <ContactCard
          contact={contact}
          clickHandler={deleteContactHandler}
          key={contact.id}
        ></ContactCard>
      </div>
    );
  });
  //  );

  const getSearchTerm = (e) => {
    props.searchKeyword(e.target.value);
  };

  return (
    <div className="main">
      <h2 style={{ paddingTop: "50px" }}>
        Contact List
        <Link to="/add">
          <button
            className="ui button blue right floated"
            style={{ alignItems: "right" }}
          >
            Add Contact
          </button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputEl}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term}
            onChange={getSearchTerm}
          ></input>
          <i className="search icon"></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
