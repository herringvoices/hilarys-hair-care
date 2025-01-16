export const getAllCustomers = async () => {
  const response = await fetch("/api/customers");
  return response.json();
};

export const getCustomerByPhoneNumber = async (phoneNumber) => {
  const response = await fetch(`/api/customers/phone-number/${phoneNumber}`);
  return response.json();
};

export const addCustomer = async (customer) => {
  const response = await fetch("/api/customers", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(customer),
  });
  return response.json();
};
