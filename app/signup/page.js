"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import "./signup.css"
import { ToastContainer, toast } from "react-toastify"

export default function Signup() {
    const router = useRouter();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    async function handleSubmit (e) {
        e.preventDefault();
        const userData = {firstName, lastName, email, password }
        try {
            const response = await axios.post("/api/signup", userData);
            if (response.data === "yes") {
                router.push("/login");
            } else {
                toast.error("Try again!!")
            }
        } catch (error) {
            toast.error("Username already exists, Try again!!")
            console.error("Signup error", error);
        }
    };

    const notify = () => toast("Wow")
    

    return (
        <body>
            <ToastContainer />
            <nav className="navbar navbar-expand-   lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand fw-bold fs-4" id="abc" href="#">SustainHub</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
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
                                <a className="nav-link active" aria-current="page" id="abc" href="#">Login</a>
                            </li>
                            <li className="nav-item px-2">
                                <a className="nav-link active" aria-current="page" id="abc" href="#">Sign up</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="d-flex align-items-center my-4">
                <div style={{ width: 'fit-content', padding: '30px', borderRadius: '4px' }} className="container-sm">
                    <form onSubmit={handleSubmit}>
                        <h4 className="mb-4 text-center" id="bcd">Sign Up</h4>

                        <div className="mb-3">
                            <label htmlFor="firstname" className="form-label">First Name</label>
                            <input required type="text" className="form-control" placeholder="ex: John" id="firstname" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastname" className="form-label">Last Name</label>
                            <input required type="text" className="form-control" placeholder="ex: Doe" id="lastname" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Enter your email address</label>
                            <input required type="email" className="form-control" placeholder="ex: johndoe@gmail.com" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Create Password</label>
                            <input required type="password" className="form-control" id="exampleInputPassword1" minLength="8" value={password} onChange={(e) => setPassword(e.target.value)} />
                            <div id="passHelp" className="form-text">Note: The password should be minimum of 8 characters.</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                            <input required type="password" className="form-control" id="exampleInputPassword1" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-outline-success">Submit</button>
                    </form>
                </div>
            </div>
        </body>
    )
}