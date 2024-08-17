import React from "react";
import { Link, useNavigate } from "react-router-dom";
import user from "../images/user.jpg";

const ContactCard = (props) => {
  const { id, name, email } = props.contact;

  return (
    <div className="item">
      <img className="ui avatar image" src={user} alt="user" />
      <div className="content">
        <Link
          to={{
            pathname: `/contact/${id}`,
            state: { contact: props.contact },
          }}
        >
          <div className="header">{name}</div>
          <div>{email}</div>
        </Link>
      </div>
      <div>
        <i
          className="trash alternate outline icon right floated"
          style={{
            color: "red",
            marginTop: "7px",
            alignItems: "right ",
            cursor: "pointer",
            marginLeft: "10px",
          }}
          onClick={() => props.clickHandler(id)}
        ></i>
        <div></div>
        <div>
          <Link
            to={{
              pathname: `/edit/${id}`,
              state: { contact: props.contact },
            }}
          >
            <i
              className="edit alternate outline icon right floated"
              style={{
                color: "blue",
                marginTop: "7px",
                alignItems: "right ",
                cursor: "pointer",
              }}
            ></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
