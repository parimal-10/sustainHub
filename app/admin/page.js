"use client"
import { useEffect } from "react";
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from "axios";
import "./admin.css"

// new mapboxgl.Marker() // initialize a new marker
//     .setLngLat([81.8517, 25.4425]) // Marker [lng, lat] coordinates
//     .addTo(map);


// navigator.geolocation.getCurrentPosition((cor)=> console.log(cor),()=>console.log("Not Found!"))
// 25.4425 latitude
// 81.8517 longitude

export default function Admin() {
    useEffect(() => {
        console.log("here");
        mapboxgl.accessToken = 'pk.eyJ1Ijoid29sdmVyNzIwMiIsImEiOiJjbHRoZTF1NWcwM28zMmpzNGozNWpkdXN1In0.aTkWHnxBQzGn1pHR3nImoQ'

        async function updateMap() {
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [77.02, 28.65],
                zoom: 5
            });

            const response = await axios.get("/api/map");
            const rsp = response.data.data;
            rsp.forEach(element => {
                const latitude = parseFloat(element.latitude); // Parse latitude as float
                const longitude = parseFloat(element.longitude); // Parse longitude as float

                new mapboxgl.Marker({ offset: [0, -50 / 2] })
                    .setLngLat([longitude, latitude]) // Set position with parsed latitude and longitude
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 }) // add popups
                            .setHTML(
                                `<p class = "fs-6 fw-bold">${element.country}</p class = "fs-6 fw-1=bolder"><p>${element.name}</p>
                                <a href = "https://www.google.com">More Details</a>`
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

            <p className="pt-3 px-3 fs-4 text-center fw-bold">Welcome back, Kushal!</p>

            <div className="container" style={{ width: '100%', height: '100vh' }}>
                <p className="mb-0">Click on a marker to see the details:</p>
                <div id="map" style={{ width: '100%', height: '100vh' }}></div>
            </div>
        </body>
    )
}