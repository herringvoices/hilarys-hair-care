import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Col, Row } from "react-bootstrap";
import StylistSelect from "./StylistSelect";
import { getAppointmentsByStylistId } from "../../services/appointmentServices";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [stylistId, setStylistId] = useState(null);

  // Fetch appointments from the API
  useEffect(() => {
    if (stylistId) {
      getAppointmentsByStylistId(stylistId).then(setAppointments);
    }
  }, [stylistId]);

  // Handle date or event clicks
  const handleDateClick = (info) => {
    console.log("Date clicked:", info.dateStr);
    // TODO: Open a modal to create a new appointment
  };

  const handleEventClick = (info) => {
    console.log("Event clicked:", info.event);
    // TODO: Open a modal to edit the selected appointment
  };

  return (
    <Row>
      <Col xs={12} md={10} className="mx-auto">
        <h1>Appointments</h1>
        <StylistSelect setId={setStylistId} />
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="timeGridWeek"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "timeGridWeek,timeGridDay",
          }}
          events={appointments} // Pass fetched appointments
          dateClick={handleDateClick} // Handle date clicks
          eventClick={handleEventClick} // Handle event clicks
          editable={true} // Allow dragging and resizing
          selectable={true} // Allow selecting time slots
          nowIndicator={true} // Show current time indicator
        />
      </Col>
    </Row>
  );
}

export default Appointments;
