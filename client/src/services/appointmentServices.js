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

//post new appointment
export async function addAppointment(appointment) {
  const response = await fetch("/api/appointments", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointment),
  });
  return response.json();
}
//delete an appointment by id
export async function deleteAppointment(id) {
  await fetch(`api/appointments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}
