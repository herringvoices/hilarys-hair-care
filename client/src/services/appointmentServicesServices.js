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

//add a batch of appointmentServices
export const addAppointmentServices = async (appointmentServices) => {
  await fetch("/api/appointment-services/batch", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appointmentServices),
  });
};
