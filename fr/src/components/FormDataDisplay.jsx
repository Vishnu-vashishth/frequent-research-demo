import React from 'react';
import { useLocation } from 'react-router-dom';

const FormDataDisplay = () => {
  const location = useLocation();
  const data = location.state.data;

  return (
    <div className="flex justify-center items-center">
      <div className="w-full sm:w-96 bg-white p-6 shadow-xl rounded-lg">
        <h2>Submitted Form Data</h2>
        <table className="table-auto w-full">
          <tbody>
            <tr>
              <td>First Name:</td>
              <td>{data.firstName}</td>
            </tr>
            <tr>
              <td>Last Name:</td>
              <td>{data.lastName}</td>
            </tr>
            <tr>
              <td>Email:</td>
              <td>{data.email}</td>
            </tr>
            <tr>
              <td>Country:</td>
              <td>{data.country}</td>
            </tr>
            <tr>
              <td>State:</td>
              <td>{data.state}</td>
            </tr>
            <tr>
              <td>City:</td>
              <td>{data.city}</td>
            </tr>
            <tr>
              <td>Gender:</td>
              <td>{data.gender}</td>
            </tr>
            <tr>
              <td>Date of Birth:</td>
              <td>{data.dob}</td>
            </tr>
            <tr>
              <td>Age:</td>
              <td>{data.age}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div> 
    
  );
};

export default FormDataDisplay;
