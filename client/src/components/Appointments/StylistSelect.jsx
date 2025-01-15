/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllStylists } from "../../services/stylistServices";
import { Dropdown } from "react-bootstrap";

function StylistSelect({ setId }) {
  const [stylists, setStylists] = useState([]);
  const [selectedStylist, setSelectedStylist] = useState(null);

  useEffect(() => {
    getAllStylists().then(setStylists);
  }, []);

  const handleSelect = (eventKey) => {
    const selectedId = parseInt(eventKey, 10);
    setId(selectedId);
    setSelectedStylist(stylists.find((stylist) => stylist.id === selectedId));
  };

  return (
    <Dropdown onSelect={handleSelect}>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
        {selectedStylist
          ? selectedStylist.firstName + " " + selectedStylist.lastName
          : "Select a stylist"}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {stylists.map((stylist) => (
          <Dropdown.Item key={stylist.id} eventKey={stylist.id}>
            {stylist.firstName + " " + stylist.lastName}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default StylistSelect;
