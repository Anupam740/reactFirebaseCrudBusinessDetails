import React, { useState, useEffect } from 'react';
import dbRef from '../Firebase';
import './View.css';
import { useParams,useNavigate } from 'react-router-dom';

function View() {
    const navigate=useNavigate()
    const handleGoBackBtn=()=>{
        navigate("/")
    }
    const [user, setUser] = useState({});
    const { id } = useParams();

    useEffect(() => {
        dbRef.child(`biz-contacts/${id}`).get().then((snapshot) => {
            if (snapshot.exists()) {
                setUser(snapshot.val());
            } else {
                setUser({});
            }
        });
    }, [id]);

    return (
        <div style={{marginTop:"150px"}}>
            <div className="card">
                <div className="card-header">
                    <p>Biz-Details</p>
                </div>
                <div className="container">
                    <strong>ID:</strong>
                    <span>{id}</span><br /><br />
                    <strong>Business Name:</strong>
                    <span>{user.bizName}</span><br /><br />
                    <strong>Address:</strong>
                    <span>{user.address}</span><br /><br />
                    <strong>Email:</strong>
                    <span>{user.email}</span><br /><br />
                    <strong>Website:</strong>
                    <span>{user.website}</span><br /><br />
                    <strong>Contact Person Name:</strong>
                    <span>{user.contactPersonName}</span><br /><br />
                    <strong>Phone Number:</strong>
                    <span>{user.phoneNo}</span><br /><br />
                    
                    <button onClick={handleGoBackBtn} className='btn btn-view'>Go Back</button>
                  
                </div>
                
            </div>
            
        </div>
    );
}

export default View;
