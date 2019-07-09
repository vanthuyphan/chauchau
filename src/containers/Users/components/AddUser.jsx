import React from 'react';
import { Col, Row, Container, Badge } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
const background = `${process.env.PUBLIC_URL}/img/user/adduser.png`;

const AddUser = ({ handleSubmit }) => {
  return (
    <div className="user__adduser" style={{ backgroundImage: `url(${background})` }}>
      <Container>
        <Row>
          <h1 className="title">
            New User
          </h1>
          <form className="form quote-form" onSubmit={handleSubmit}>
            <Col offset={6} md={6}>
              <div className="form__form-group">
                <span className="form__form-group-label">User Name</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Field
                    name="username"
                    component="input"
                    type="text"
                    placeholder="Value"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">First Name</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Field
                    name="firstName"
                    component="input"
                    type="text"
                    placeholder="Value"
                  />
                </div>
              </div>
              <div className="form__form-group">
                <span className="form__form-group-label">Middle Name</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Field
                    name="middleName"
                    component="input"
                    type="text"
                    placeholder="Value"
                  />
                </div>
              </div>

              <div className="form__form-group">

                <span className="form__form-group-label">Last Name</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Field
                    name="lastName"
                    component="input"
                    type="text"
                    placeholder="Value"
                  />
                </div>
              </div>
            </Col>
            <Col offset={6} md={6}>

              <div className="form__form-group">
                <span className="form__form-group-label">Email</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Field
                    name="email"
                    component="input"
                    type="text"
                    placeholder="put your email here"
                  />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Address</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Field
                    name="address"
                    component="input"
                    type="text"
                    placeholder="Value"
                  />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Role Enum</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Field
                    name="role"
                    component="input"
                    type="text"
                    placeholder="Value"
                  />
                </div>
              </div>

              <div className="form__form-group">
                <span className="form__form-group-label">Phone Number</span>
                <div className="form__form-group-field">
                  <div className="form__form-group-icon">
                    <AccountOutlineIcon />
                  </div>
                  <Field
                    name="phoneNumber"
                    component="input"
                    type="text"
                    placeholder="Value"
                  />
                </div>
              </div>
            </Col>
            <div className='subClose'>
              <button type="submit" className="btn btn-primary  account__btn--small" to="/pages/one">Submit</button>
            </div>
          </form>
        </Row>
      </Container>
    </div>
  );
};
AddUser.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'quote_form',
})(AddUser);
