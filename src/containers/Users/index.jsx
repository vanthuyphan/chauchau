import React from 'react';
import { Col, Container, Row } from 'reactstrap';
import UserTable from './components/UserTable';

const Users = () => (
  <Container>
    <Row>
      <Col md={12}>
        <h3 className="page-title">User</h3>
        <h3 className="page-subhead subhead">
        </h3>
      </Col>
    </Row>
    <Row>
      <UserTable />
    </Row>
  </Container>
);

export default Users;
