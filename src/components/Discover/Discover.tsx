import React from 'react';
import './Discover.css';

const Discover: React.FC = () => {
  return (
    <section className="container py-4">
      <div className="row g-3">
        <div className="col-lg-6">
          <div className="bg-light p-4 rounded h-100">
            <div className="card h-100 w-100">
              <div className="card-body">
                <img src="" alt="" className="card-img-top" />
                <h5 className="card-title">Plant of the day</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="bg-light p-4 rounded h-100">
            <div className="card h-100 w-100">
              <div className="card-body">
                <img src="" alt="" className="card-img-top" />
                <h5 className="card-title">Fertilizing</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-3">
          <div className="bg-light p-4 rounded h-100">
            <div className="card h-100 w-100">
              <div className="card-body">
                <img src="" alt="" className="card-img-top" />
                <h5 className="card-title">Light Meter</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-3 mt-3">
        <div className="col-lg-4">
          <div className="bg-light p-4 rounded h-100">
            <div className="card h-100 w-100">
              <div className="card-body">
                <img src="" alt="" className="card-img-top" />
                <h5 className="card-title">Dr Plant</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="bg-light p-4 rounded h-100">
            <div className="card h-100 w-100">
              <div className="card-body">
                <img src="" alt="" className="card-img-top" />
                <h5 className="card-title">Plant Community</h5>
                <p className="card-text">
                  This is a longer card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discover;
