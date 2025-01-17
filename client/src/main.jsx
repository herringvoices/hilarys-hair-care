import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";

import "./index.css";
import Appointments from "./components/Appointments/Appointments.jsx";
import StylistList from "./components/Stylists/StylistList.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Appointments />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="stylists" element={<StylistList />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
