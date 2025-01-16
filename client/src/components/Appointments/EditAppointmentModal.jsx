/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col, Alert } from "react-bootstrap";

import { getAllServices } from "../../services/serviceServices";
import { deleteAppointment } from "../../services/appointmentServices";
import { addAppointmentServices } from "../../services/appointmentServicesServices";

function EditAppointmentModal({ show, onClose, selectedEvent, getAndSet }) {
  const [services, setServices] = useState([]);
  const [checkedServices, setCheckedServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [eventDate, setEventDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  useEffect(() => {
    setLoading(true);
    const fetchAndFilterServices = async () => {
      try {
        const allServices = await getAllServices();
        setServices(allServices);

        if (selectedEvent?.extendedProps?.services) {
          const filteredServices = allServices.filter((service) =>
            selectedEvent.extendedProps.services.some(
              (s) => s.id === service.id
            )
          );
          setCheckedServices(filteredServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        alert("Failed to fetch services.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterServices();
  }, [selectedEvent]);

  useEffect(() => {
    setTotal(checkedServices.reduce((acc, curr) => acc + curr.price, 0));
  }, [checkedServices]);

  useEffect(() => {
    if (selectedEvent?.startStr) {
      const dateObj = new Date(selectedEvent.startStr);
      const formattedDate = dateObj.toLocaleString("en-US", {
        dateStyle: "full",
        timeStyle: "short",
      });
      setEventDate(formattedDate);
    }
  }, [selectedEvent]);

  const handleServiceCheck = (service) => {
    setCheckedServices((prev) =>
      prev.map((s) => s.id).includes(service.id)
        ? prev.filter((s) => s.id !== service.id)
        : [...prev, service]
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const appointmentServices = checkedServices.map((service) => ({
        appointmentId: selectedEvent.id,
        serviceId: service.id,
      }));
      await addAppointmentServices(appointmentServices);
      getAndSet();
      onClose();
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const confirmCancel = async () => {
    try {
      await deleteAppointment(selectedEvent.id);
      getAndSet();
      onClose();
    } catch (error) {
      console.error("Error canceling appointment:", error);
      alert("Failed to cancel the appointment.");
    }
  };

  const dismissCancelConfirmation = () => {
    setShowCancelConfirmation(false);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{eventDate}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loading ? (
          <p>Loading services...</p>
        ) : (
          <>
            <Form.Group>
              <Form.Label>Service Requested:</Form.Label>
              {services.map((service) => (
                <Form.Check
                  key={service.id}
                  type="checkbox"
                  label={service.name}
                  checked={checkedServices.some((s) => s.id === service.id)}
                  onChange={() => handleServiceCheck(service)}
                />
              ))}
            </Form.Group>
            <h2>Total:</h2>
            <p>${total}.00</p>

            <Row>
              <Col xs={4}>
                <Button
                  className="w-100"
                  variant="danger"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs={4}></Col>
              <Col xs={4}>
                <Button
                  className="w-100"
                  variant="primary"
                  onClick={handleSubmit}
                >
                  Save
                </Button>
              </Col>
            </Row>

            {/* Cancel Confirmation Alert */}
            {showCancelConfirmation && (
              <Alert variant="danger" className="mt-3">
                <p>Are you sure you want to cancel this appointment?</p>
                <div className="d-flex justify-content-end">
                  <Button
                    variant="secondary"
                    className="me-2"
                    onClick={dismissCancelConfirmation}
                  >
                    No
                  </Button>
                  <Button variant="danger" onClick={confirmCancel}>
                    Yes, Cancel
                  </Button>
                </div>
              </Alert>
            )}
          </>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default EditAppointmentModal;
