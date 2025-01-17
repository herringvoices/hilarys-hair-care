import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Alert, Col, Row } from "react-bootstrap";
import StylistSelect from "./StylistSelect";
import { getAppointmentsByStylistId } from "../../services/appointmentServices";
import NewAppointmentModal from "./NewAppointmentModal";
import EditAppointmentModal from "./EditAppointmentModal";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [stylistId, setStylistId] = useState(null);
  const [showNewAppointmentModal, setShowNewAppointmentModal] = useState(false);
  const [showEditAppointmentModal, setShowEditAppointmentModal] =
    useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [alertMessage, setAlertMessage] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState({});

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
        setShowNewAppointmentModal(true);
      } else {
        setAlertMessage("Please select a time at the top of the hour");
      }
    } else {
      setAlertMessage("Please select a stylist first");
    }
  };

  const handleEventClick = (info) => {
    setSelectedEvent(info.event);
    setShowEditAppointmentModal(true);
  };

  // Handle Appointment Modal close
  const handleNewAppointmentModalClose = () => {
    setShowNewAppointmentModal(false); // Close the Appointment Modal
    setSelectedDate(null); // Reset the selected date
  };
  // Handle Appointment Modal close
  const handleEditAppointmentModalClose = () => {
    setShowEditAppointmentModal(false); // Close the Appointment Modal
    setSelectedEvent(null); // Reset the selected event
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
          slotMinTime="08:00:00" // Start time (8 AM)
          slotMaxTime="18:00:00" // End time (6 PM)
          height="auto"
          allDaySlot={false} // Turn off the "All Day" section
        />
        {showNewAppointmentModal && (
          <NewAppointmentModal
            show={showNewAppointmentModal}
            onClose={handleNewAppointmentModalClose}
            selectedDate={selectedDate}
            stylistId={stylistId}
            getAndSet={getAndSetAppointments}
          />
        )}
        {showEditAppointmentModal && (
          <EditAppointmentModal
            selectedEvent={selectedEvent}
            getAndSet={getAndSetAppointments}
            show={showEditAppointmentModal}
            onClose={handleEditAppointmentModalClose}
          />
        )}
      </Col>
    </Row>
  );
}

export default Appointments;
