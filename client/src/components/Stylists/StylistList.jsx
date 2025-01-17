import { useEffect, useState } from "react";
import { getAllStylists } from "../../services/stylistServices";
import { Col, Container, Row } from "react-bootstrap";

function StylistList() {
  const [stylists, setStylists] = useState([]);

  useEffect(() => {
    // Fetch stylists from the API
    getAllStylists().then(setStylists);
  }, []);

  return (
    <Container>
      <Row className="m-3">
        <h2>Stylists</h2>
      </Row>
      <Row className="m-3">
        {stylists.map((stylist) => (
          <Col
            key={stylist.id}
            sm={12}
            md={3}
            className="bg-dark text-light p-3 m-3 rounded"
          >
            {stylist.firstName + " " + stylist.lastName}
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default StylistList;
