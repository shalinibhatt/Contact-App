import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

//we dont use hooks in class based components
const EditContacts = (props) => {
  const location = useLocation();
  const { id, name, email } = location.state.contact;
  const [newNamw, setnewNamw] = useState(name);
  const [newEmail, setnewEmail] = useState(email);

  const navigate = useNavigate();
  const update = (e) => {
    e.preventDefault();
    if (newNamw === "" || newEmail === "") {
      alert("all the fields are mandatory");
      return;
    }
    props.updatecontactHandler({ id, name:newNamw, email:newEmail });
    setnewNamw("");
    setnewEmail("");
    navigate("/");
  };

  return (
    <div className="ui main">
      <h2>Edit Contact</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newNamw}
            onChange={(e) => setnewNamw(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setnewEmail(e.target.value)}
          />
        </div>
          <button className="ui button blue">Update</button>
      </form>
    </div>
  );
};
export default EditContacts;
