import { useEffect, useState } from "react";
import { getAllStylists } from "../../services/stylistServices";
import { Col, Container, Row } from "react-bootstrap";
import AddStylistModal from "./AddStylistModal";

function StylistList() {
  const [stylists, setStylists] = useState([]);
  const [showAddStylistModal, setShowAddStylistModal] = useState(false);

  const handleAddStylistModalClose = () => {
    setShowAddStylistModal(false);
  };

  const getAndSetStylists = async () => {
    const stylists = await getAllStylists();
    setStylists(stylists);
  };

  useEffect(() => {
    getAndSetStylists();
  }, []);

  useEffect(() => {
    // Fetch stylists from the API
  }, []);

  return (
    <Container>
      <Row className="m-3">
        <Col sm={{ span: 4, offset: 4 }}>
          <h2>Stylists</h2>
        </Col>
        <Col sm={{ span: 2 }}>
          <button
            className="btn btn-dark"
            onClick={() => setShowAddStylistModal(true)}
          >
            +
          </button>
        </Col>
        <Col sm={2}></Col>
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
      <AddStylistModal
        show={showAddStylistModal}
        onClose={handleAddStylistModalClose}
        getAndSet={getAndSetStylists}
      />
      ;
    </Container>
  );
}

export default StylistList;
