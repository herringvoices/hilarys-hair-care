export const getAllServices = async () => {
  const response = await fetch("/api/services");
  return response.json();
};
