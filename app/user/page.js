"use client"
import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from 'next/navigation'
import "./user.css"
import axios from "axios"
import { signOut } from "next-auth/react"
import { ToastContainer, toast } from "react-toastify"

export default function Users() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [image, setImage] = useState(null);

    function onChangehandler(e) {
        if (e.target.files) {
            setImage(e.target.files[0])
        }
    }

    useEffect(() => {
        getDetails();
    }, [])

    const searchParams = useSearchParams()
    const user_id = searchParams.get('id')

    async function getDetails() {
        try {
            const response = await axios.post("/api/user", { user_id });
            setFirstName(response.data.firstname);
            setLastName(response.data.lastname);
        } catch (err) {
            console.log("Error getting details of the user", err.data);
        }
    }

    async function getLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                position => resolve(position.coords),
                error => {
                    console.log("Failed to get location:", error);
                    reject(error);
                }
            );
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            if (!image) {
                return
            }

            const location = await getLocation();
            const { longitude, latitude } = location

            toast("loading", {
                autoClose: false,
                closeOnClick: false
            })

            const formData = new FormData();
            formData.append("image", image)

            const response = await axios.post("/api/uploadImage", formData)
            const src = response.data.url

            const category = document.getElementById('category').value;
            const description = document.getElementById('desc').value;

            try {

                await axios.post("/api/newIssue", { user_id, category, description, longitude, latitude, src })

            } catch (err) {
                console.log("Error submitting new Issue", err);
            }

        } catch (err) {
            console.log("Error", err);
        }
        toast.dismiss();
        document.getElementById('form-container').reset();
    }

    return (
        <Suspense>
        <body>
            <ToastContainer />
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
                            <li>
                                <button className="nav-link active" aria-current="page" id="abc" onClick={e => {
                                    e.preventDefault()
                                    signOut()
                                }}>Signout</button>
                            </li>
                            <li className="nav-item p-2">
                                <a href={`/profile?id=${user_id}`} style={{textDecoration: "none"}}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                                        className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                                        <path fillRule="evenodd"
                                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <p className="pt-3 px-3 fs-5 fw-bold">Welcome Back, {firstName} {lastName}!</p>

            <div className="d-flex align-items-center">
                <div className="container-sm">
                    <form id="form-container" onSubmit={handleSubmit}>
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
                                <input onChange={onChangehandler} required className="form-control" type="file" id="formFile" accept=".jpg, .jpeg, .png" />
                            </div>
                            <button type="submit" id="submit-btn" className="btn btn-outline-success">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </body>
                                                </Suspense>
    )
}
