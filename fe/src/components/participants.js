import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "./table/table";
import { getLocalStorageData } from "../utils/local-storage";
import { setParticipant } from "../features/participant-slice";

function Participants() {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => 
    state.participants.data);

useEffect(() => {
  const formData = getLocalStorageData("formData");

  if (formData) {
    dispatch(setParticipant(formData));
  }
}, [dispatch]);

  return (
    <div>
      <Table tableData={tableData} />
    </div>
  );
}

export default Participants;