import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

import "./index.css";
import Appointments from "./components/Appointments/Appointments.jsx";
import StylistList from "./components/Stylists/StylistList.jsx";
import StylistDetails from "./components/Stylists/StylistDetails.jsx";
import CustomerList from "./components/Customers/CustomersList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Appointments />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="stylists" element={<StylistList />} />
          <Route path="stylists/:stylistId" element={<StylistDetails />} />
          <Route path="customers" element={<CustomerList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
