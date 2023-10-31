import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './AddEdit.css';
import dbRef from '../Firebase';
import { toast } from 'react-toastify';

function AddEdit() {
  const initialState = {
    bizName: '',
    address: '',
    email: '',
    website: '',
    contactPersonName: '',
    phoneNo: '',
  };

  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [state, setState] = useState(initialState);
  const { id } = useParams();

  useEffect(() => {
    dbRef.child('biz-contacts').on('value', (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }
    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { bizName, address, email, website, contactPersonName, phoneNo } = state;

    if (!bizName || !address || !email || !website || !contactPersonName || !phoneNo) {
      toast.error('Please provide a value in each input field');
    } else {
      if (!id) {
        dbRef.child('biz-contacts').push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('New Business-Details Added Successfully');
          }
        });
      } else {
        dbRef.child(`biz-contacts/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success('Business-Details Updated Successfully');
          }
        });
      }

      setTimeout(() => navigate('/'), 2000);
    }
  };

  return (
    <div style={{ marginTop: '100px' }}>
      <form
        style={{
          margin: 'auto',
          padding: '15px',
          maxWidth: '400px',
          alignContent: 'center',
        }}
        onSubmit={handleSubmit}
      >
        <div className="form-group">
          <label htmlFor="bizName">Business Name:</label>
          <input type="text" id="bizName" name="bizName" value={state.bizName || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input type="text" id="address" name="address" value={state.address || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={state.email || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="website">Website:</label>
          <input type="text" id="website" name="website" value={state.website || ''} onChange={handleChange} />
        </div>

        <div className="form-group">
          <label htmlFor="contactPersonName">Contact Person Name:</label>
          <input
            type="text"
            id="contactPersonName"
            name="contactPersonName"
            value={state.contactPersonName || ''}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneNo">Phone Number:</label>
          <input type="number" id="phoneNo" name="phoneNo" value={state.phoneNo || ''} onChange={handleChange} />
        </div>

        <input type="submit" value={id ? 'Update' : 'Save'} />
      </form>
    </div>
  );
}

export default AddEdit;
