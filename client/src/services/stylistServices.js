//get all stylists
export const getAllStylists = async () => {
  const response = await fetch("/api/stylists");
  return response.json();
};
