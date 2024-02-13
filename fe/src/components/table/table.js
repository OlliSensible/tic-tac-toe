import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import './table-styles.css';
import { deleteParticipant } from '../../features/participant-slice';

const Table = ({ tableData }) => {
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [sortBy, setSortBy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('tableData:', tableData);
    setData(tableData);
  }, [tableData]);

  const sortDataByName = () => {
    let order;
    if (sortOrder === 'ASC') {
      order = 'DESC';
    } else if (sortOrder === 'DESC') {
      order = null;
    } else {
      order = 'ASC';
    }

    const sorted = [...data].sort((a, b) => {
      if (a.name < b.name) return order === 'ASC' ? -1 : 1;
      if (a.name > b.name) return order === 'ASC' ? 1 : -1;
      return 0;
    });

    setSortedData(order ? sorted : []);
    setSortOrder(order);
    setSortBy(order ? 'name' : null);
  };

  const handleDelete = () => {
    dispatch(deleteParticipant(selectedUser.id));
    setShowModalDelete(false);
  };

  const handleEdit = () => {
  navigate(`/participant/${selectedUser.id}`, {
    state: {
      selectedUser: selectedUser,
    },
  });
};



  const renderTableHeader = () => (
    <thead>
      <tr>
        <th onClick={sortDataByName}>
          Name
          {sortBy === 'name' && (sortOrder === 'ASC' ? ' ↑' : ' ↓')}
        </th>
        <th>Surname</th>
        <th>Birthday</th>
        <th>Gender</th>
        <th>Game-Tag</th>
        <th>Game-Type</th>
        <th>Email</th>
        <th>Event</th>
        <th>Action</th>
      </tr>
    </thead>
  );

  const renderTableBody = () => {
    const displayData = sortedData.length > 0 ? sortedData : data || [];

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = displayData.slice(indexOfFirstItem, indexOfLastItem);

    return (
      <tbody>
        {currentItems.map((item, index) => (
          <tr key={index} className={index % 2 === 0 ? 'even-row' : 'odd-row'}>
            <td>{item.name}</td>
            <td>{item.surname}</td>
            <td>{item.birthday}</td>
            <td>{item.gender}</td>
            <td>{item.gameTag}</td>
            <td>{item.gameType}</td>
            <td>{item.email}</td>
            <td>{item.event}</td>
            <td>
              <button onClick={() => handleDeleteUser(item)} className='buttonParticipants'>Delete</button>
              <button onClick={() => handleEditUser(item)} className='buttonParticipants'>Edit</button>
            </td>
          </tr>
        ))}
      </tbody>
    );
  };

  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setShowModalDelete(true);
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowModalEdit(true);
  };

  const renderModalDelete = () => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <p>{`Are you sure you want to delete this user?`}</p>
          <button onClick={handleDelete} className='buttonParticipants'>Yes</button>
          <button onClick={() => setShowModalDelete(false)} className='buttonParticipants'>No</button>
        </div>
      </div>
    );
  };

  const renderModalEdit = () => {
    return (
      <div className="modal-overlay">
        <div className="modal">
          <p>{`Are you sure you want to edit this user?`}</p>
          <button onClick={handleEdit} className='buttonParticipants'>Yes</button>
          <button onClick={() => setShowModalEdit(false)} className='buttonParticipants'>No</button>
        </div>
      </div>
    );
  };

  const renderPagination = () => {
    const displayData = sortedData.length > 0 ? sortedData : tableData || [];
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(displayData.length / itemsPerPage); i++) {
      const buttonClass = i === currentPage ? 'buttonParticipants activeButton' : 'buttonParticipants';
      pageNumbers.push(
        <button key={i} onClick={() => setCurrentPage(i)} className={buttonClass}>
          {i}
        </button>
      );
    }
  
    return (
      <div>
        {pageNumbers}
        <Link to="/">
          <button className="buttonParticipants">Home page</button>
        </Link>
      </div>
    );
  };  

  return (
    <div className='table-wrapper'>
      <table>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
      {renderPagination()}
      {showModalDelete && renderModalDelete()}
      {showModalEdit && renderModalEdit()}
    </div>
  );
};

export default Table;