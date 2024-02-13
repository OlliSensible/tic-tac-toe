import React, { useState } from "react";
import { Link } from "react-router-dom";
import { setLocalStorageData } from "../utils/local-storage"
import { setParticipant } from "../features/participant-slice";

import TextField from "./registrations/text-field";
import DateField from "./registrations/date-field";
import Email from "./registrations/email";
import { useDispatch } from "react-redux";
import SelectField from "./registrations/select-field";


function RegistrationPage() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    birthday: "",
    gender: "",
    gameTag: "",
    gameType: "",
    email: "",
    event: "",
  });
  
  const dispatch = useDispatch();

  const handleSave = () => {
    dispatch(setParticipant(formData));
    setLocalStorageData("formData", formData, true);
  };

  return (
    <div>
      <TextField
        id="nameInput"
        label="Name"
        value={formData.name}
        onChange={(value) => setFormData({ ...formData, name: value })}
      />
      <TextField
        id="surnameInput"
        label="Surname"
        value={formData.surname}
        onChange={(value) => setFormData({ ...formData, surname: value })}
      />
      <DateField
        id="birthdayInput"
        label="Birthday"
        initialDate={formData.birthday}
        onChange={(value) => setFormData({ ...formData, birthday: value })}
      />
      <SelectField
        id="genderSelect"
        label="Gender"
        value={formData.gender}
        onChange={(value) => setFormData({ ...formData, gender: value })}
        options={[
          { value: "", label: "Select Gender" },
          { value: "man", label: "Man" },
          { value: "woman", label: "Women" }
        ]}
      />
      <TextField
        id="gameTagInput"
        label="Game Tag"
        value={formData.gameTag}
        onChange={(value) => setFormData({ ...formData, gameTag: value })}
      />
      <SelectField
        id="gameType"
        label="Game"
        value={formData.gameType}
        onChange={(value) => setFormData({ ...formData, gameType: value })}
        options={[
          { value: "", label: "Select game type" },
          { value: "3x3", label: "3x3" },
          { value: "4x4", label: "4x4" },
          { value: "5x5", label: "5x5" }
        ]}
      />
      <Email
        value={formData.email}
        onChange={(value) => setFormData({ ...formData, email: value })}
      />
      <SelectField
        id="Event"
        label="Event"
        value={formData.event}
        onChange={(value) => setFormData({ ...formData, event: value })}
        options={[
          { value: "", label: "Select event" },
          { value: "Event1", label: "Event1" },
          { value: "Event2", label: "Event2" },
          { value: "Event3", label: "Event3" }
        ]}
      />
      <Link to="/">
        <button className="btnSave" onClick={handleSave}>
          Save
        </button>
      </Link>
    </div>
  );
}

export default RegistrationPage;