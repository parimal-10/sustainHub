"use client"
import { useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { useSearchParams } from 'next/navigation'
import axios from 'axios'
import 'mapbox-gl/dist/mapbox-gl.css'
import "./details.css"

export default function Details() {

    const searchParams = useSearchParams()
    const issue_id = searchParams.get('id')
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [longitude, setLongitude] = useState(0)
    const [latitude, setLatitude] = useState(0)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [src, setSrc] = useState("")

    async function getIssueDetails() {
        try {

            const response = await axios.post("/api/issue", { issue_id })
            const data = response.data;
            setLongitude(parseFloat(data.longitude))
            setLatitude(parseFloat(data.latitude))
            setTitle(data.category)
            setDescription(data.description)
            setName(data.users.user_details.firstname + " " + data.users.user_details.lastname)
            setEmail(data.users.email)
            setSrc(data.src)
            
        } catch (err) {
            console.log("Error getting issue details in frontend", err.message);
        }
    }

    useEffect(() => {
        getIssueDetails();
    }, [])

    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MP

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [longitude, latitude],
            zoom: 10
        });


        new mapboxgl.Marker()
            .setLngLat([longitude, latitude])
            .setPopup(
                new mapboxgl.Popup({ offset: 25 })
                    .setHTML(
                        `<a href="https://www.google.com/maps/place/${latitude},${longitude}" target="_blank">Get Directions</a>`
                    )
            )
            .addTo(map);

    }, [latitude, longitude])

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

            <div className="d-flex align-items-center p-4">
                <div style={{ width: 'fit-content', padding: '20px', backgroundColor: 'rgb(233, 233, 233)', borderRadius: '4px' }}
                    className="container-sm">
                    <form action="">
                        <h4 className="mb-4">Title: {title}</h4>
                        <dl className="row">
                            <dt className="col-sm-3 fw-medium">Description</dt>
                            <dd className="col-sm-9">{description}</dd>
                        </dl>
                        <h6 className="fw-bold">User Details: </h6>
                        <dl className="row">
                            <dt className="col-sm-3 fw-medium">Name</dt>
                            <dd className="col-sm-9">{name}</dd>
                            <dt className="col-sm-3 fw-medium">Email</dt>
                            <dd className="col-sm-9">{email}</dd>
                        </dl>

                        <div id="map" style={{ width: '100%', height: '400px' }}></div>

                        <h6>Photos:</h6>
                        <div class="photos">
                            <img class="photo" src={src} />
                        </div>

                        <div className="mb-3 form-check mt-3">
                            <input required type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Mark as resolved</label>
                        </div>
                        <button type="submit" className="btn btn-outline-success">Submit</button>
                    </form>
                </div>
            </div>
        </body>
    )
}