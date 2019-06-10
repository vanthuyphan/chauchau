import React from 'react';
import { Col, Row, Container } from 'reactstrap';
import { Field, reduxForm } from 'redux-form';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const background = `${process.env.PUBLIC_URL}/img/landing/header_bg.png`;

const Header = ({ onClick }) => (
  <div className="landing__header" style={{ backgroundImage: `url(${background})` }}>
    <Container>
      <Row>
        <Col offset={4} md={6}>
          <form className="form quote-form" onSubmit={onClick}>
            <div className="form__form-group">
              <span className="form__form-group-label">Property Value</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <AccountOutlineIcon />
                </div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Value"
                />
              </div>
            </div>
            <div className="form__form-group">
              <span className="form__form-group-label">Property Value</span>
              <div className="form__form-group-field">
                <div className="form__form-group-icon">
                  <AccountOutlineIcon />
                </div>
                <Field
                  name="name"
                  component="input"
                  type="text"
                  placeholder="Value"
                />
              </div>
            </div>
            <Link className="btn btn-primary account__btn account__btn--small" to="/pages/one">Get Quote</Link>
          </form>
        </Col>
      </Row>
    </Container>
  </div>
);

Header.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'quote_form',
})(Header);
