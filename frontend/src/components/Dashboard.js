import React from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom'

export default function Dashboard(){
    return (
        <div>
            <div className="container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar">
                        <input className="search_input" type="text" name="" placeholder="Search..." />
                        <Link to='#' className="search_icon"><i className="fas fa-search"></i></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
