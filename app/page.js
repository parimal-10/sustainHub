"use client"
import "./home.css"

export default function Home() {
  return (
    <body>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-4" id="abc" href="#">SustainHub</a>
          <button
            style={{ border: 'none' }}
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="27"
              height="27"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
              style={{ color: 'white' }}
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
              <li class="nav-item px-2">
                <a class="nav-link active" aria-current="page" id="abc" href="#"
                >Home</a>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link active" aria-current="page" id="abc" href="#about-us"
                >About us</a>
              </li>
              <li class="nav-item px-2">
                <a class="nav-link active" aria-current="page" id="abc" href="#contact"
                >Contact us</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <section id="section">
        <div class="container">
          <div class="text-box">
            <p class="tagline">Spot it. Report it. Sustain it.</p>
            <p>Join the Sustain Hub movement today!</p>
            <a href="/signup">learn More</a>
          </div>
        </div>
      </section>

      <br />
      <div class="about-us" id="about-us">
        <h2><b>About Us</b></h2>
        <p id="text">
          Sustain Hub is a web platform designed to empower citizens to report and
          track public facility issues within their local community and get reward
          points. By providing an intuitive interface, Sustain Hub makes it easy
          for users to pinpoint problems and submit detailed reports, including
          photos, which can be accessed and addressed by local authorities.
        </p>
      </div>

      <footer class="footer mt-auto py-3 bg-light" id="contact">
        <div class="container text-center">
          <p id="para">
            <span id="footer-text"><b>SustainHub</b></span>
            <span class="text-muted">Copyright © 2023 | All rights reserved</span>
            <span id="logos">
              <span
              ><a href="https://github.com/kushal7201/Sustain_Hub_GSC">
                  <img
                    class="smaller"
                    id="img_con"
                    src="github.png"
                    alt="HTML"
                  /> </a></span>
              <span
              ><a href="mailto:321kushalbansal.kb@gmail.com">
                  <img
                    id="img_con"
                    class="smaller"
                    src="gmail.png"
                    alt="Instagram"
                  /> </a></span>
            </span>
          </p>

          <div class="contact"></div>
        </div>
      </footer>
    </body>
  )
}
