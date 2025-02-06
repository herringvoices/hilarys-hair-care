import { useEffect, useState } from "react";
import { getAllCustomers } from "../../services/customerServices";
import { Col, Container, Row } from "react-bootstrap";
import AddCustomerModal from "./AddCustomerModal";

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
      <Row className="m-3 mx-auto">
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
      <Row className="m-3 mx-auto">
        {customers.map((customer) => (
          <Col
            sm={12}
            md={3}
            key={customer.id}
            className="bg-dark text-light px-0 py-3 m-2 mx-1 rounded"
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
