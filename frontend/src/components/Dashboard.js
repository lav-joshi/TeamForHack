import React from 'react';
import './css/dashboard.css';
import { Link } from 'react-router-dom';
import Nav from './Nav';

export default function Dashboard() {
  return (
    <div>
      <Nav></Nav>
      <header className="masthead">
        <div className="container h-100">
          <div className="row h-100 align-items-center">
            <div className="col-12 text-center">
              <h1 className="font-weight-light">Yaha intro dedna</h1>
              <div className="container h-100 lead">
                <div className="d-flex justify-content-center h-100">
                  <div className="searchbar">
                    <input
                      className="search_input"
                      type="text"
                      name=""
                      placeholder="Search..."
                    />
                    <Link to="#" className="search_icon">
                      <i className="fas fa-search"></i>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="py-5">
        <div className="container">
          <h2 className="font-weight-light">Yaha Content Likhna</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus ab nulla dolorum autem nisi officiis blanditiis
            voluptatem hic, assumenda aspernatur facere ipsam nemo ratione
            cumque magnam enim fugiat reprehenderit expedita.
          </p>
        </div>
      </section>
    </div>
  );
}
