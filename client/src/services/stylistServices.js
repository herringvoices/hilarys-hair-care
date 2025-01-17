//get all stylists
export const getAllStylists = async () => {
  const response = await fetch("/api/stylists");
  return response.json();
};

//get stylist by id
export const getStylistById = async (id) => {
  const response = await fetch(`/api/stylists/${id}`);
  return response.json();
};

//add new stylist
export const addStylist = async (stylist) => {
  const response = await fetch("/api/stylists", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stylist),
  });
  return response.json();
};

//delete stylist by id
export const deleteStylist = async (id) => {
  await fetch(`/api/stylists/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

//update stylist by id
export const updateStylist = async (id, stylist) => {
  await fetch(`/api/stylists/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(stylist),
  });
};
