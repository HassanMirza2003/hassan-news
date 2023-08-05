import {Link} from 'react-router-dom';
import React, { Component } from 'react'

export class Navbar extends Component {
    static propTypes = {}

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Hassan-News</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Business">Business</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Entertainment">Entertainment
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Health">Health</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Science">Science</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Sports">Sports</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" to="/Technology">Technology</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        )
    }
}

export default Navbar