import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import api from "../api/contacts";

// Higher-order component to inject navigate prop
// function withRouter(Component) {
//   function ComponentWithRouterProp(props) {
//     const navigate = useNavigate();
//     return <Component {...props} navigate={navigate} />;
//   }
//   return ComponentWithRouterProp;
// }

// class EditContact extends React.Component {
//   constructor(props) {
//     super(props);
//     const { id, name, email } = props.location.state.contact;
//     this.state = {
//       id,
//       name,
//       email,
//     };
//   }

//   update = (e) => {
//     e.preventDefault();
//     if (this.state.name === "" || this.state.email === "") {
//       alert("All the item are mandatory!");
//       return;
//     }
//     this.props.addContactHandler(this.state);
//     this.setState({ name: "", email: "" });
//     console.log(this.props);

//     this.props.navigate("/");
//   };

function EditContact() {
  const { id } = useParams();
  const [contact, setContact] = useState({
    id: id,
    name: "",
    email: "",
  });
  const navigate = useNavigate();
  // const location = useLocation();

  // Extract state from location
  // const contact = location.state?.contact || { id: "", name: "", email: "" };
  // const contact = location.state?.contact || {};
  // const [name, setName] = useState([contact.name]);
  // const [email, setEmail] = useState([contact.email]);

  // console.log("name", name);

  // Update state when contact changes
  useEffect(() => {
    api
      .get(`http://localhost:3006/contacts/${id}`)
      .then((res) => {
        setContact({
          ...contact,
          name: res.data.name,
          email: res.data.email,
        });
      })
      .catch((err) => console.log(err));
  }, [id]);

  const update = (e) => {
    e.preventDefault();
    api
      .put(`http://localhost:3006/contacts/${id}`, contact)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  //   addContactHandler({ id: contact.id, name, email });
  //   setName("");
  //   setEmail("");
  //   navigate("/");
  // };

  // const update = (e) => {
  //   e.preventDefault();
  //   if (name === "" || email === "") {
  //     alert("All fields are mandatory!");
  //     return;
  //   }

  // render() {
  return (
    <div className="ui main">
      <h2 style={{ paddingTop: "50px" }}>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        {/*this*/}
        <div className="field">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={contact.name}
            // this.state.
            onChange={(e) => setContact({ ...contact, name: e.target.value })}
            // this.
          ></input>
        </div>
        <div className="field">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={contact.email}
            // this.state.
            onChange={(e) => setContact({ ...contact, email: e.target.value })}
            // this.
          ></input>
        </div>
        <button className="ui button blue">Update</button>
      </form>
    </div>
  );
}
// export default withRouter(EditContact);
export default EditContact;
