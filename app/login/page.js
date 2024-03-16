import "./login.css"

export default function Login() {
    return (
        <>
            <body style={{backgroundColor: 'rgb(199, 229, 154)'}}>
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
                                    <a className="nav-link active" aria-current="page" id="abc" href="/login">Login</a>
                                </li>
                                <li className="nav-item px-2">
                                    <a className="nav-link active" aria-current="page" id="abc" href="/signup">Sign up</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <p className="pt-3 px-3 fs-5" id="bcd"></p>

                <div className="d-flex align-items-center">
                    <div style={{ width: 'fit-content', padding: '30px', backgroundColor: '#ffffff', borderRadius: '4px' }}
                        className="container-sm">
                        <form action="">
                            <h4 className="mb-4 text-center">Login</h4>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input required type="email" className="form-control" id="exampleInputEmail1"
                                    aria-describedby="emailHelp" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input required type="password" className="form-control" id="exampleInputPassword1" minLength="8" />
                                <div id="passHelp" className="form-text">Note: The password should be minimum of 8 characters.</div>
                            </div>
                            <button type="submit" className="btn btn-outline-success" id="kushal">Submit</button>
                        </form>
                    </div>
                </div>
            </body>
        </>
    )
}
