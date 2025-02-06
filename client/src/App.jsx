import { Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Nav, NavbarCollapse } from "react-bootstrap";
import "./App.css";

function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" className="px-5">
        <Navbar.Brand href="/">Hillary&apos;s Hair Care</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <NavbarCollapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/appointments">Appointments</Nav.Link>
            <Nav.Link href="/stylists">Stylists</Nav.Link>
            <Nav.Link href="/customers">Customers</Nav.Link>
            
          </Nav>
        </NavbarCollapse>
      </Navbar>
      <Outlet />
    </>
  );
}

export default App;
