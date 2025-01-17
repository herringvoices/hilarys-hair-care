import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteStylist,
  getStylistById,
  updateStylist,
} from "../../services/stylistServices";
import { Button, Col, Container, Row, Table } from "react-bootstrap";

function StylistDetails() {
  const [stylist, setStylist] = useState({});
  const { stylistId } = useParams();

  function formatDate(dateString) {
    const date = new Date(dateString); // Convert string to Date object

    // Extract date parts
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const day = date.getDate().toString().padStart(2, "0");
    const year = date.getFullYear();

    // Extract time parts
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "pm" : "am";

    // Convert to 12-hour format
    hours = hours % 12 || 12; // 0 should become 12 in 12-hour format

    // Return formatted string
    return `${month}/${day}/${year} at ${hours}:${minutes}${ampm}`;
  }
  // Fetch stylist from the API
  const getAndSetStylist = () => {
    getStylistById(parseInt(stylistId)).then((stylist) => {
      if (stylist && stylist.appointments) {
        stylist.appointments.sort(
          (b, a) => new Date(a.start) - new Date(b.start)
        );
      }
      setStylist(stylist);
    });
  };

  useEffect(() => {
    getAndSetStylist();
  }, [stylistId]);

  const handleSoftDelete = () => {
    deleteStylist(stylist.id).then(getAndSetStylist);
  };

  const handleReactivate = () => {
    const activatedStylist = { ...stylist, isActive: true };
    updateStylist(stylist.id, activatedStylist).then(getAndSetStylist);
  };

  return (
    <Container>
      <h2>{stylist.firstName && stylist.firstName + " " + stylist.lastName}</h2>
      <Row>
        <Col
          xs={12}
          md={5}
          className="bg-dark text-light rounded p-4 text-start mx-auto"
        >
          <h3 className="fs-4 mb-0 mt-4">Phone Number</h3>
          <p className="fs-2">{stylist.phoneNumber}</p>

          <h3 className="fs-4 mb-0 mt-4">Email</h3>
          <p className="fs-2">{stylist.email}</p>
          {!stylist.isActive && (
            <Button className="btn btn-danger" onClick={handleReactivate}>
              Inactive
            </Button>
          )}
          {stylist.isActive && (
            <Button onClick={handleSoftDelete} className="btn btn-success">
              Active
            </Button>
          )}
        </Col>
        <Col xs={12} md={5} className=" text-start mx-auto">
          <h3>Appointments</h3>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Date</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {stylist.appointments &&
                stylist.appointments.map((appointment) => (
                  <tr key={appointment.id}>
                    <td>
                      {appointment.extendedProps.customer.firstName +
                        " " +
                        appointment.extendedProps.customer.lastName}
                    </td>
                    <td>{formatDate(appointment.start)}</td>
                    <td>${appointment.extendedProps.totalPrice}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default StylistDetails;
