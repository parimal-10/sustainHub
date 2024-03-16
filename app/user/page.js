"use client"
import { useEffect } from "react";
import "./user.css"

export default function Users() {
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(success, failure);

        function success (position) {
            console.log(position);
        }

        function failure () {
            console.log("failed to get location");
        }
    }, [])
    
    return (
        <body>
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
                                <a className="nav-link active" aria-current="page" id="abc" href="#">Home</a>
                            </li>
                            <li className="nav-item p-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                    className="bi bi-person-circle" viewBox="0 0 16 16">
                                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                    <path fillRule="evenodd"
                                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <p className="pt-3 px-3 fs-5 fw-bold">Welcome Back, Kushal!</p>

            <div className="d-flex align-items-center">
                <div className="container-sm">
                    <form action="" method="post" id="form-container">
                        <h4 className="text-center mb-4">Report a Problem</h4>
                        <div className="mb-3">
                            <label htmlFor="category" className="form-label">Select Category:</label>
                            <div className="dropdown mb-3" id="myDropdown">
                                <select name="category" id="category" required>
                                    <option value="1">Garbage Dump</option>
                                    <option value="2">Street Light Repair</option>
                                    <option value="3">Something else</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="desc" className="form-label">Description</label>
                                <textarea required className="form-control" id="desc"></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="formFile" className="form-label">Upload a photo:</label>
                                <input required className="form-control" type="file" id="formFile" accept=".jpg, .jpeg, .png" />
                            </div>
                            <button type="submit" id="submit-btn" className="btn btn-outline-success" disabled>Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
    )
}
