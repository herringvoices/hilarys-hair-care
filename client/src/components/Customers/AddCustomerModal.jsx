/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { addCustomer } from "../../services/customerServices";

function AddCustomerModal({ show, onClose, setCustomer }) {
  const [newCustomer, setNewCustomer] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
  });

  const handleSubmit = async () => {
    // Add the customer to the database
    const addedCustomer = await addCustomer(newCustomer);
    // Set the customer in the parent component
    if (setCustomer) {
      setCustomer(addedCustomer);
    }
    // Close the modal
    onClose();
  };
  return (
    <Modal
      show={show}
      onHide={onClose}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Customer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={11} md={5} className="mx-auto">
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newCustomer.firstName}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, firstName: e.target.value })
                }
              />
            </Form.Group>
          </Col>
          <Col xs={11} md={5} className="mx-auto">
            <Form.Group>
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter last name"
                value={newCustomer.lastName}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, lastName: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={11} md={5} className="mx-auto">
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="###-####"
                value={newCustomer.phoneNumber}
                onChange={(e) =>
                  setNewCustomer({
                    ...newCustomer,
                    phoneNumber: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Col>
          <Col xs={11} md={5} className="mx-auto">
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={newCustomer.email}
                onChange={(e) =>
                  setNewCustomer({ ...newCustomer, email: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className="mx-auto mt-3">
            <Button
              onClick={handleSubmit}
              disabled={Object.values(newCustomer).some((value) => !value)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
export default AddCustomerModal;
