import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Alert, Col, Row } from "react-bootstrap";
import StylistSelect from "./StylistSelect";
import { getAppointmentsByStylistId } from "../../services/appointmentServices";
import AppointmentModal from "./AppointmentModal";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [stylistId, setStylistId] = useState(null);
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);

  const getAndSetAppointments = async () => {
    if (stylistId) {
      const appointments = await getAppointmentsByStylistId(stylistId);
      setAppointments(appointments);
    }
  };
  // Fetch appointments from the API
  useEffect(() => {
    getAndSetAppointments();
  }, [stylistId]);

  // Handle date or event clicks
  const handleDateClick = (info) => {
    if (stylistId) {
      const selectedDate = new Date(info.dateStr);
      if (selectedDate.getMinutes() === 0) {
        setSelectedDate(info.dateStr);
        setShowAppointmentModal(true);
      } else {
        setAlertMessage("Please select a time at the top of the hour");
      }
    } else {
      setAlertMessage("Please select a stylist first");
    }
  };

  const handleEventClick = (info) => {
    console.log("Event clicked:", info.event);
    // TODO: Open a AppointmentModal to edit the selected appointment
  };

  // Handle Appointment Modal close
  const handleAppointmentModalClose = () => {
    setShowAppointmentModal(false); // Close the Appointment Modal
    setSelectedDate(null); // Reset the selected date
  };

  const handleAlertClose = () => {
    setAlertMessage(null); // Close the alert message
  };

  return (
    <Row>
      <Col xs={12} md={10} className="mx-auto">
        <h1>Appointments</h1>
        {alertMessage && (
          <Alert variant="warning" onClose={handleAlertClose} dismissible>
            {alertMessage}
          </Alert>
        )}
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
          editable={false} // Allow dragging and resizing
          selectable={true} // Allow selecting time slots
          nowIndicator={true} // Show current time indicator
        />
        {showAppointmentModal && (
          <AppointmentModal
            show={showAppointmentModal}
            onClose={handleAppointmentModalClose}
            selectedDate={selectedDate}
            stylistId={stylistId}
            getAndSet={getAndSetAppointments}
          />
        )}
      </Col>
    </Row>
  );
}

export default Appointments;
