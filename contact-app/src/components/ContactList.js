import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  console.log(props);
  const navigate = useNavigate();

  const showContactDetails = (contact) => {
    navigate(`/contact/${contact.id}`, { state: { contact } });
  };

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  // const contacts = [
  //   {
  //     id: "1",
  //     name: "Dipesh",
  //     email: "dp@gmail.com",
  //   },
  // ];
  const renderContactList = props.contacts.map((contact) => {
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

      <div className="ui celled list">{renderContactList}</div>
    </div>
  );
};

export default ContactList;
