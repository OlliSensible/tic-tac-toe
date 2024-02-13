import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { editParticipant } from '../features/participant-slice'

import TextField from './registrations/text-field';
import EmailForm from './registrations/email';
import SelectField from './registrations/select-field';
import DateField from './registrations/date-field';

const EditPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.selectedUser;
  const dispatch = useDispatch();
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    setEditedUser({
      id: user.id,
      name: user.name,
      surname: user.surname,
      birthday: user.birthday,
      gender: user.gender,
      gameTag: user.gameTag,
      gameType: user.gameType,
      email: user.email,
      event: user.event,
    });
  }, [user]);

   if (!user) {
    navigate('/participants');
    return;
  }

  const handleChange = (name, value) => {
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSave = () => {
    dispatch(editParticipant(editedUser));
    navigate('/participants');
  };

  return (
    <div>
      <form>
        <TextField
          label="Name"
          value={editedUser.name}
          onChange={(value) => handleChange("name", value)}
        />
        <TextField
          label="Surname"
          value={editedUser.surname}
          onChange={(value) => handleChange("surname", value)}
        />
        <DateField
          id="birthdayInput"
          label="Birthday"
          initialDate={editedUser.birthday}
          onChange={(value) => handleChange("birthday", value)}
        />
        <SelectField
          id="genderSelect"
          label="Gender"
          value={editedUser.gender}
          onChange={(value) => handleChange("gender", value)}
          options={[
            { value: "", label: "Select Gender" },
            { value: "man", label: "Man" },
            { value: "woman", label: "Woman" }
          ]}
        />
        <SelectField
          id="gameTypeSelect"
          label="Game Type"
          value={editedUser.gameType}
          onChange={(value) => handleChange("gameType", value)}
          options={[
            { value: "", label: "Select Game Type" },
            { value: "3x3", label: "3x3" },
            { value: "4x4", label: "4x4" },
            { value: "5x5", label: "5x5" }
          ]}
        />
        <EmailForm
          initialEmail={editedUser.email}
          onChange={(email, isValid) => handleChange("email", email)}
        />
        <SelectField
          id="eventSelect"
          label="Event"
          value={editedUser.event}
          onChange={(value) => handleChange("event", value)}
          options={[
            { value: "", label: "Select Event" },
            { value: "Event1", label: "Event 1" },
            { value: "Event2", label: "Event 2" },
            { value: "Event3", label: "Event 3" }
          ]}
        />
        <button className="btnSave" type="button" onClick={handleSave}>
          Save
        </button>
      </form>
    </div>
  );
};

export default EditPage;