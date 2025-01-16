export const getAllCustomers = async () => {
  const response = await fetch("/api/customers");
  return response.json();
};

export const getCustomerByPhoneNumber = async (phoneNumber) => {
  const response = await fetch(`/api/customers/phone-number/${phoneNumber}`);
  return response.json();
};
