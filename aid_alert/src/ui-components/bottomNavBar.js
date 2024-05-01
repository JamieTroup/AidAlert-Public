import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { MapFill, GearFill, Wifi, WifiOff } from 'react-bootstrap-icons';
import { getOnlineStatus } from '../getOnlineStatus';
import './bottomNavBar.css';

/**
 * BottomNavBar provides navigation and displays the online status of the user.
 *
 * @param {Object} props - Component properties.
 * @param {Function} props.toggleOnlineStatus - Function to toggle online status.
 * @param {boolean} props.isButtonDisabled - Indicates if the online status button should be disabled.
 */
const BottomNavBar = ({ toggleOnlineStatus, isButtonDisabled }) => {
	const [isOnline, setIsOnline] = useState(null);

	// Fetch and set online status on component mount
	useEffect(() => {
		getOnlineStatus().then((status) => setIsOnline(status));
	}, [toggleOnlineStatus]);

	// Choose icons and text based on online status
	const onlineStatusIcon = isOnline ? (
		<Wifi size={24} />
	) : (
		<WifiOff size={24} />
	);
	const onlineStatusText = isOnline ? 'Online' : 'Offline';
	const onlineStatusClass = isOnline ? 'btn-success' : 'btn-warning';

	return (
		<nav className="navbar fixed-bottom navbar-light bg-light border-top p-0">
			<div className="container-fluid d-flex justify-content-around align-items-center p-2">
				<NavLink
					to="/dashboard"
					className="d-flex flex-column align-items-center text-decoration-none text-dark"
				>
					<MapFill size={24} />
					<small>Map</small>
				</NavLink>

				<button
					key={isOnline ? 'online' : 'offline'}
					className={`btn ${onlineStatusClass} d-flex flex-column align-items-center`}
					onClick={toggleOnlineStatus}
					disabled={isButtonDisabled}
				>
					{onlineStatusIcon}
					<small>{onlineStatusText}</small>
				</button>

				<NavLink
					to="/settings"
					className="d-flex flex-column align-items-center text-decoration-none text-dark"
				>
					<GearFill size={24} />
					<small>Settings</small>
				</NavLink>
			</div>
		</nav>
	);
};

BottomNavBar.propTypes = {
	toggleOnlineStatus: PropTypes.func.isRequired,
	isButtonDisabled: PropTypes.bool.isRequired,
};

export default BottomNavBar;
