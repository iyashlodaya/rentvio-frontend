import React from 'react'

export default function SignUpModal() {
  return (
    <div>
      <div
        className="modal fade"
        id="signUpModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="signUpModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="signUpModalTitle">
                Sign Up
              </h5>
              <p className="modal-sub-title" id="signUpModalSubTitle">
                Get started today by entering just a few details
              </p>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label for="fullName">Full Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="fullNameControl"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="emailControl"
                    placeholder="e.g. john.doe@gmail.com"
                  />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="passwordControl"
                    placeholder="Enter your password!"
                  />
                </div>
                <div className="d-grid gap-2 mt-4">
                    <button className="btn btn-primary" type="button">
                        Sign Up {'->'}
                    </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
