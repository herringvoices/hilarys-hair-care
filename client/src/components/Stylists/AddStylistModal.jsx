/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import { addStylist } from "../../services/stylistServices";

function AddStylistModal({ show, onClose, getAndSet }) {
  const [newStylist, setNewStylist] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    isActive: true,
  });

  const handleSubmit = async () => {
    // Add the stylist to the database
    await addStylist(newStylist);
    // Set the stylist in the parent component
    getAndSet();
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
        <Modal.Title>Add Stylist</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={11} md={5} className="mx-auto">
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter first name"
                value={newStylist.firstName}
                onChange={(e) =>
                  setNewStylist({ ...newStylist, firstName: e.target.value })
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
                value={newStylist.lastName}
                onChange={(e) =>
                  setNewStylist({ ...newStylist, lastName: e.target.value })
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
                value={newStylist.phoneNumber}
                onChange={(e) =>
                  setNewStylist({
                    ...newStylist,
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
                value={newStylist.email}
                onChange={(e) =>
                  setNewStylist({ ...newStylist, email: e.target.value })
                }
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col xs={4} className="mx-auto mt-3">
            <Button
              onClick={handleSubmit}
              disabled={Object.values(newStylist).some((value) => !value)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
export default AddStylistModal;
