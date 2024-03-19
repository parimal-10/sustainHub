"use client"
import React, { useEffect, useState } from 'react'
import "./profile.css"
import { useSearchParams } from 'next/navigation'
import axios from 'axios'

export default function ProfilePage() {
    const searchParams = useSearchParams();
    const user_id = searchParams.get("id")

    const [details, setDetails] = useState(null)

    const [editMode, setEditMode] = useState(false);
    const [editedDetails, setEditedDetails] = useState({
        phone: null,
        address: ""
    });

    async function getDetails() {
        const response = await axios.post("/api/profile", { user_id })
        setDetails(response.data)
    }

    useEffect(() => {
        getDetails()
    })

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    async function handleSave () {
        try {
            await axios.patch("/api/profile", {user_id, editedDetails});
            await getDetails()
            setEditMode(false);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return (
        <body>
            {details ? (
                <>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container-fluid">
                            <a className="navbar-brand fw-bold fs-4" id="abc" href="#">SustainHub</a>
                            <button style={{ border: 'none' }} className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
                                aria-label="Toggle navigation">
                                <svg style={{ color: 'white' }} xmlns="http://www.w3.org/2000/svg" width="27" height="27" fill="currentColor"
                                    className="bi bi-list" viewBox="0 0 16 16">
                                    <path fillRule="evenodd"
                                        d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                                </svg>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                    <li className="nav-item px-2">
                                        <a className="nav-link active" aria-current="page" id="abc" href={`/user?id=${user_id}`}>Home</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className="container">
                        <div className="main-body">
                            <div className="row gutters-sm">
                                <div className="col-md-4 mb-3">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle"
                                                    width="150" />
                                                <h4 className="m-3">{details.user_details.firstname} {details.user_details.lastname}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    {/* <div className="card mt-3">
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                        className="feather feather-globe mr-2 icon-inline">
                                                        <circle cx="12" cy="12" r="10"></circle>
                                                        <line x1="2" y1="12" x2="22" y2="12"></line>
                                                        <path
                                                            d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z">
                                                        </path>
                                                    </svg>Website
                                                </h6>
                                                <a href="https://kushal7201.github.io/Portfolio/" className="text-secondary no-underline">Check out
                                                    website</a>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                        className="feather feather-github mr-2 icon-inline">
                                                        <path
                                                            d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                                                        </path>
                                                    </svg>Github
                                                </h6>
                                                <a href="https://github.com/kushal7201" className="text-secondary no-underline">kushal7201</a>
                                            </li>
                                            <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                                                <h6 className="mb-0">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                        className="feather feather-instagram mr-2 icon-inline text-danger">
                                                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                                    </svg>Instagram
                                                </h6>
                                                <a href="https://www.instagram.com/__kushal112__/"
                                                    className="text-secondary no-underline">__kushal7201__</a>
                                            </li>
                                        </ul>
                                    </div> */}
                                </div>
                                <div className="col-md-8">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <div className="row">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    {details.email}
                                                </div>
                                            </div>
                                            <hr />
                                            <div className="row">
                                                {!editMode ? (
                                                    <>
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Phone</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">{details.user_details.phone}</div>
                                                    </>
                                                ) : (
                                                    <li className="list-group-item">
                                                        <input type="text" name="phone" value={editedDetails.phone} onChange={handleChange} />
                                                    </li>
                                                )}
                                            </div>
                                            <hr />
                                            <div className="row">
                                                {!editMode ? (
                                                    <>
                                                        <div className="col-sm-3">
                                                            <h6 className="mb-0">Address</h6>
                                                        </div>
                                                        <div className="col-sm-9 text-secondary">
                                                            {details.user_details.address}
                                                        </div>
                                                    </>) :
                                                    <li className="list-group-item">
                                                        <input type="text" name="address" value={editedDetails.address} onChange={handleChange} />
                                                    </li>
                                                }
                                            </div>
                                            <hr />
                                            <div className="row">
                                                <div className="col-sm-12">
                                                    {editMode ? (
                                                        <button className="btn btn-outline-success" type="button" onClick={handleSave}>Save</button>
                                                    ) : (
                                                        <button className="btn btn-outline-primary" onClick={handleEdit}>Edit</button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-8">
                                        <div className="card mb-3">
                                            <div className="card-body">
                                                <h6 className="d-flex align-items-center mb-3">Points Earned</h6>
                                                <p>{details.user_details.rewards} Points</p>
                                                <div className="progress mb-3" style={{ height: '5px' }}>
                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${details.user_details.rewards}%` }} aria-valuenow="80"
                                                        aria-valuemin="0" aria-valuemax="100"></div>
                                                </div>
                                                <small>Total points: {details.user_details.rewards}</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <h1>Loading</h1>
            )}
        </body>
    );
}
