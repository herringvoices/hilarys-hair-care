/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Row,
  Col,
  Toast,
  ToastContainer,
} from "react-bootstrap";
import { getCustomerByPhoneNumber } from "../../services/customerServices";
import { getAllServices } from "../../services/serviceServices";
import { addAppointment } from "../../services/appointmentServices";
import { addAppointmentService } from "../../services/appointmentServicesServices";

function AppointmentModal({
  show,
  onClose,
  selectedDate,
  stylistId,
  getAndSet,
}) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [customer, setCustomer] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [services, setServices] = useState([]);
  const [checkedServices, setCheckedServices] = useState([]);
  const [total, setTotal] = useState(0);
  const [eventDate, setEventDate] = useState("");

  useEffect(() => {
    getAllServices().then(setServices);
  }, []);

  //calculate the total based on the services selected
  useEffect(() => {
    setTotal(checkedServices.reduce((acc, curr) => acc + curr.price, 0));
  }, [checkedServices]);

  //set the date and time of the event
  useEffect(() => {
    // Convert to a Date object
    const dateObj = new Date(selectedDate);

    // Format the date and time
    const formattedDate = new Intl.DateTimeFormat("en-US", {
      dateStyle: "full", // e.g., Thursday, January 16, 2025
      timeStyle: "short", // e.g., 9:00 AM
    }).format(dateObj);
    setEventDate(formattedDate);
  }, [selectedDate]);

  const customerSearch = () => {
    getCustomerByPhoneNumber(phoneNumber)
      .then((result) => {
        if (result) {
          setCustomer(result);
        } else {
          setShowToast(true);
        }
      })
      .catch((error) => {
        console.error("Error fetching customer:", error);
        setShowToast(true);
      });
  };

  const handleNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleServiceCheck = (service) => {
    setCheckedServices((prev) => {
      if (prev.map((s) => s.id).includes(service.id)) {
        // If already checked, remove it
        return prev.filter((s) => s.id !== service.id);
      } else {
        // Otherwise, add it
        return [...prev, service];
      }
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const titleString =
      customer.firstName +
      " " +
      customer.lastName +
      " with Stylist #" +
      stylistId;
    const startISO = new Date(selectedDate).toISOString(); // Convert to ISO 8601
    const endISO = new Date(
      new Date(selectedDate).getTime() + 60 * 60 * 1000
    ).toISOString(); // Add 1 hour and convert

    const appointment = {
      title: titleString,
      start: startISO,
      end: endISO,
      allDay: false,
      customerId: customer.id,
      stylistId: stylistId,
    };

    try {
      // Save the appointment and get the generated appointmentId
      const savedAppointment = await addAppointment(appointment);

      // Use the returned appointmentId to create AppointmentServices
      await Promise.all(
        checkedServices.map((service) =>
          addAppointmentService({
            appointmentId: savedAppointment.id,
            serviceId: service.id,
          })
        )
      );
      getAndSet();

      // Close the modal or perform any other actions
      onClose();
    } catch (error) {
      console.error("Error saving appointment:", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{eventDate}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col xs={11} className="mx-auto">
              <Form.Group>
                <Form.Label>Customer Phone Number</Form.Label>
                <Row>
                  <Col xs={8}>
                    <Form.Control
                      type="text"
                      placeholder="Enter customer phone number"
                      value={phoneNumber}
                      onChange={handleNumberChange}
                    />
                  </Col>
                  <Col xs={4}>
                    <Button variant="dark" onClick={customerSearch}>
                      Search
                    </Button>
                  </Col>
                </Row>
                <h3 className="fs-6">Customer Name:</h3>
                <p className="fs-3">
                  {customer
                    ? `${customer.firstName} ${customer.lastName}`
                    : "No Customer Selected"}
                </p>
                <Button variant="dark">Add new Customer</Button>
              </Form.Group>
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
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Button className="w-100" variant="danger" onClick={onClose}>
                Cancel
              </Button>
            </Col>
            <Col xs={4}></Col>
            <Col xs={4}>
              <Button
                className="w-100"
                variant="primary"
                disabled={!customer || !total}
                onClick={handleSubmit}
              >
                Save
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>

      {/* Toast Notification */}
      <ToastContainer position="top-center" className="p-3">
        <Toast
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={3000}
          autohide
          bg="warning"
        >
          <Toast.Header>
            <strong className="mx-auto">Search Result</strong>
          </Toast.Header>
          <Toast.Body>No customer found with that phone number.</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  );
}

export default AppointmentModal;
