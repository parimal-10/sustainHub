"use client"
import { useEffect, useState } from "react"
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js'
import { useSearchParams } from "next/navigation"
import 'mapbox-gl/dist/mapbox-gl.css'
import axios from "axios"
import "./admin.css"

export default function Admin() {
    const searchParams = useSearchParams();
    const user_id = searchParams.get("id");

    const [name, setName] = useState("");
    async function getAdminDetails() {
        try {

            const response = await axios.post("/api/user", { user_id })
            const data = response.data
            setName(data.firstname + " " + data.lastname)

        } catch (err) {

        }
    }
    useEffect(() => {
        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MP

        getAdminDetails()

        async function updateMap() {
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [77.02, 28.65],
                zoom: 5
            });

            const response = await axios.get("/api/adminMap");
            const rsp = response.data;
            rsp.forEach(element => {
                const latitude = parseFloat(element.latitude); 
                const longitude = parseFloat(element.longitude); 

                new mapboxgl.Marker({ offset: [0, -50 / 2] })
                    .setLngLat([longitude, latitude]) 
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                            .setHTML(
                                `<a href = "/details?id=${element.id}">More Details</a>`
                            )
                    )
                    .addTo(map);
            });
        }

        updateMap();
    }, []);

    return (
        <body>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
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

            <p className="pt-3 px-3 fs-4 text-center fw-bold">Welcome back, { name }</p>

            <div className="container" style={{ width: '100%', height: '100vh' }}>
                <p className="mb-0">Click on a marker to see the details:</p>
                <div id="map" style={{ width: '100%', height: '80%' }}></div>
            </div>
        </body>
    )
}