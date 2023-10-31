import React, { useState, useEffect } from 'react';
import dbRef from '../Firebase';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./Home.css"

function Home() {
  const [data, setData] = useState({});
  const onDelete = (id) => {
    if (window.confirm("Are you sure that you want to delete that Business Details?")) {
      dbRef.child(`biz-contacts/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Business-Details deleted successfully");
        }
      });
    }
  }

  useEffect(() => {
    dbRef.child("biz-contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    }
  }, []);

  return (
    <div style={{ marginTop: "100px" }}>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Sr. No.</th>
            <th style={{ textAlign: "center" }}>Business-Name</th>
            <th style={{ textAlign: "center" }}>Address</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Website</th>
            <th style={{ textAlign: "center" }}>Contact-Person-Name</th>
            <th style={{ textAlign: "center" }}>Phone-Number</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{index + 1}</th>
                <td>{data[id].bizName}</td>
                <td>{data[id].address}</td>
                <td>{data[id].email}</td>
                <td>{data[id].website}</td>
                <td>{data[id].contactPersonName}</td>
                <td>{data[id].phoneNo}</td>
                <td>
                  <Link to={`update/${id}`}>
                    <button className='btn btn-edit'>Edit</button>
                  </Link>
                  <button className='btn btn-delete' onClick={() => onDelete(id)}>Delete</button>
                  <Link to={`view/${id}`}>
                    <button className='btn btn-view'>View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2>home</h2>
    </div>
  )
}

export default Home;
