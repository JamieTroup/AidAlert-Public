import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/**
 * MyNavbar component provides a responsive navigation bar for the application.
 * It includes links for navigation and functionality to toggle offcanvas components.
 *
 * @param {Object} props - Component props
 * @param {Function} props.onToggleOffcanvasEvents - Handler to toggle visibility of the events offcanvas
 * @param {Function} props.onToggleOffcanvasResponders - Handler to toggle visibility of the responders offcanvas
 */
const myNavbar = ({ onToggleOffcanvasEvents, onToggleOffcanvasResponders }) => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
			<Container fluid>
				<Navbar.Brand>AidAlert</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">
							Dashboard
						</Nav.Link>
						<Nav.Link as={Link} to="/settings">
							Settings
						</Nav.Link>
						<Nav.Link as={Link} to="/about">
							About
						</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link onClick={onToggleOffcanvasEvents}>Events</Nav.Link>
					</Nav>
					<Nav>
						<Nav.Link onClick={onToggleOffcanvasResponders}>
							Responders
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default myNavbar;

/**
 * SettingsNavBar component provides a simplified navigation bar for the settings pages.
 * It lacks the offcanvas toggling links present in the main navigation bar.
 */
const SettingsNavBar = () => {
	return (
		<Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
			<Container fluid>
				<Navbar.Brand>AidAlert</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={Link} to="/">
							Dashboard
						</Nav.Link>
						<Nav.Link as={Link} to="/settings">
							Settings
						</Nav.Link>
						<Nav.Link as={Link} to="/about">
							About
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export { SettingsNavBar };
