import { useEffect, useState } from "react";
import { getAllCustomers } from "../../services/customerServices";
import { Col, Container, Row } from "react-bootstrap";
import AddCustomerModal from "./AddCustomerModal";
import { Link } from "react-router-dom";

function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [showAddCustomerModal, setShowAddCustomerModal] = useState(false);

  const handleAddCustomerModalClose = () => {
    setShowAddCustomerModal(false);
  };

  const getAndSetCustomers = async () => {
    const customers = await getAllCustomers();
    setCustomers(customers);
  };

  useEffect(() => {
    getAndSetCustomers();
  }, []);

  useEffect(() => {
    // Fetch customers from the API
  }, []);

  return (
    <Container>
      <Row className="m-3">
        <Col sm={{ span: 4, offset: 4 }}>
          <h2>Customers</h2>
        </Col>
        <Col sm={{ span: 2 }}>
          <button
            className="btn btn-dark"
            onClick={() => setShowAddCustomerModal(true)}
          >
            +
          </button>
        </Col>
        <Col sm={2}></Col>
      </Row>
      <Row className="m-3">
        {customers.map((customer) => (
          <Col
            key={customer.id}
            className="col-sm-12 col-md-3 bg-dark text-light p-3 m-3 rounded"
          >
            {customer.firstName + " " + customer.lastName}
          </Col>
        ))}
      </Row>
      <AddCustomerModal
        show={showAddCustomerModal}
        onClose={handleAddCustomerModalClose}
        getAndSet={getAndSetCustomers}
      />
    </Container>
  );
}

export default CustomerList;
