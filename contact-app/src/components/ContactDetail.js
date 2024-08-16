import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import user from "../images/user.png";

const ContactDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { contact } = location.state || {}; // Safely access state

  const backContactList = () => {
    navigate("/");
  };

  if (!contact) {
    return <div>No contact details available</div>; // Handle cases where contact is not provided
  }

  const { id, name, email } = contact;
  //   const { name, email } = props.location.state.contact;
  return (
    <div className="main">
      <div className="ui card centered" style={{ marginTop: "50px" }}>
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content">
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div">
        <button className="ui button blue center" onClick={backContactList}>
          Back To Contact List
        </button>
      </div>
    </div>
  );
};

export default ContactDetail;
