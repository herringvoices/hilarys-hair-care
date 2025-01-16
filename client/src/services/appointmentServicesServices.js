//add new appointmentService
export const addAppointmentService = async (appointmentService) => {
  await fetch("/api/appointment-services", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentService),
  });
};

