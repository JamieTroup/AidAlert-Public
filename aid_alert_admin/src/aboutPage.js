import React from 'react';
import MyNavbar from './myNavBar.js';
import RespondersOffcanvas from './respondersOffcanvas.js';
import './aboutPage.css';

/**
 * Renders the About page with a navigation bar and an offcanvas for responders.
 */
const AboutPage = () => {
	return (
		<div>
			<MyNavbar />
			<RespondersOffcanvas />
			<div className="container mt-4">
				<h1>Welcome to AidAlert Administrator</h1>
				<p>
					The AidAlert Administrator application is designed to streamline the
					management of emergency responses at the University of Dundee. It
					enables campus security administrators to monitor and coordinate first
					aid-trained staff swiftly during medical emergencies.
				</p>

				<h1>How to Use AidAlert Administrator</h1>
				<h3>View First Aiders&apos; Locations</h3>
				<p>
					Once logged in, you can view the real-time locations of online first
					aiders, each marked by a blue dot on the interactive map. Click on any
					blue dot to see the first aider&apos;s name, or use the
					&apos;Responders&apos; button for a list view of responders, which
					also allows you to centre the map on their location.
				</p>

				<h3>Create an Event</h3>
				<p>
					Click directly on the map where the incident has occurred to begin
					creating an event. A modal will appear prompting you to enter:
					<ul>
						<li>
							<strong>Event Title</strong>: The brief title or identification of
							the incident.
						</li>
						<li>
							<strong>Event Description</strong>: Detailed information about the
							incident.
						</li>
						<li>
							<strong>Responder</strong>: Select from a list of available first
							aiders to assign to the event.
						</li>
					</ul>
					Complete these fields and submit the form to dispatch the selected
					responder.
				</p>

				<h3>Delete/Edit Event</h3>
				<p>
					Should changes need to be made or an event needs to be removed, click
					on the event icon marked by a red warning triangle on the map. You
					will have the option to edit the event details or delete the event
					entirely. <strong>Note:</strong> Once deleted, an event cannot be
					recovered.
				</p>

				<h3>Track Event Status</h3>
				<p>
					Click on the &apos;Events&apos; button to view a comprehensive list of
					all active events. This list provides updates on each event’s status,
					indicating whether responders have been assigned, have accepted, or
					have arrived at the incident location.
				</p>

				<h2>Security and Compliance</h2>
				<p>
					AidAlert is committed to maintaining the highest standards of security
					and data protection. Utilising AWS Cognito, the application ensures
					robust user authentication and secure management of data, adhering
					strictly to GDPR compliance for protecting personal information.
				</p>
				<p>
					For further information or specific inquiries about the application,
					feel free to contact the development team.
				</p>
				<p>
					Email:{' '}
					<a href="mailto:troup.jamie1@gmail.com">troup.jamie1@gmail.com</a>
				</p>
			</div>
		</div>
	);
};

export default AboutPage;
