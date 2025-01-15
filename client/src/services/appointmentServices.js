//fetch all appointments
export async function getAllAppointments() {
  const response = await fetch("/api/appointments");
  return response.json();
}

//fetch appointments by stylistId
export async function getAppointmentsByStylistId(stylistId) {
  const response = await fetch(`/api/appointments?stylistId=${stylistId}`);
  return response.json();
}
