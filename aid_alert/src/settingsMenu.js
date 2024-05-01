import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
	fetchUserAttributes,
	updateUserAttributes,
	updatePassword,
} from 'aws-amplify/auth';
import { Amplify } from 'aws-amplify';
import awsExports from './aws-exports';
import { FaUserEdit, FaKey } from 'react-icons/fa'; // Importing FontAwesome icons
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import './settingsMenu.css';
import { useOnlineStatus } from './useOnlineStatus';

Amplify.configure(awsExports);

const SettingsMenu = ({ signOut }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [updateSuccess, setUpdateSuccess] = useState(false);
	const [updateError, setUpdateError] = useState('');
	const [validated, setValidated] = useState(false);
	const { offlineStatus } = useOnlineStatus();

	const validateEmail = (email) => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	};

	async function handleFetchUserAttributes() {
		try {
			const userAttributes = await fetchUserAttributes();
			setName(userAttributes.name);
			setEmail(userAttributes.email);
		} catch (error) {
			console.log('Unable to fetch user attributes', error);
		}
	}

	useEffect(() => {
		handleFetchUserAttributes();
		console.log('SettingsMenu component mounted.');
	}, []);

	useEffect(() => {
		let timer;
		if (updateSuccess) {
			timer = setTimeout(() => {
				setUpdateSuccess(false);
			}, 7000);
		}

		// Clear the timeout if the component unmounts or the dependency changes
		return () => clearTimeout(timer);
	}, [updateSuccess]);

	async function handleUpdateEmailAndNameAttributes(updatedEmail, updatedName) {
		try {
			await updateUserAttributes({
				userAttributes: {
					email: updatedEmail,
					name: updatedName,
				},
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function handleUpdatePassword(oldPassword, newPassword) {
		try {
			await updatePassword({ oldPassword, newPassword });
		} catch (err) {
			console.log(err);
		}
	}

	const handleProfileSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false || !validateEmail(email)) {
			e.stopPropagation();
			setValidated(true);
		} else {
			try {
				await handleUpdateEmailAndNameAttributes(email, name);
				setUpdateSuccess(true);
				setUpdateError('');
			} catch (error) {
				console.error('Error updating user attributes:', error);
				setUpdateError(error.message || 'Failed to update profile.');
				setUpdateSuccess(false);
			}
		}
	};

	const handlePasswordSubmit = async (e) => {
		e.preventDefault();
		const form = e.currentTarget;
		if (form.checkValidity() === false) {
			e.stopPropagation();
			setValidated(true);
		} else {
			try {
				await handleUpdatePassword(oldPassword, newPassword);
				setUpdateSuccess(true);
				setUpdateError('');
			} catch (error) {
				console.error('Error updating password:', error);
				setUpdateError(error.message || 'Failed to update password.');
				setUpdateSuccess(false);
			}
		}
	};

	return (
		<div className="relative-container mt-0">
			{updateSuccess && (
				<div className="alert alert-success success-message">
					Profile updated successfully.
				</div>
			)}
			{updateError && <div className="alert alert-danger">{updateError}</div>}
			<div className="card top-card">
				<div className="card-body">
					<form
						noValidate
						onSubmit={handleProfileSubmit}
						className={`mb-2 needs-validation ${validated ? 'was-validated' : ''}`}
					>
						<h4 className="card-title">
							<FaUserEdit /> Update Profile
						</h4>
						<div className="mb-3">
							<label htmlFor="nameInput" className="form-label">
								Name
							</label>
							<input
								type="text"
								className="form-control"
								id="nameInput"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
							<div className="invalid-feedback">
								Please provide a valid name.
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="emailInput" className="form-label">
								Email Address
							</label>
							<input
								type="email"
								className={`form-control ${validated && !validateEmail(email) ? 'is-invalid' : ''}`}
								id="emailInput"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
							/>
							<div className="invalid-feedback">
								Please provide a valid email address.
							</div>
						</div>
						<div className="d-grid gap-2">
							<button id="main" type="submit" className="btn-main">
								Update Profile
							</button>
						</div>
					</form>
				</div>
			</div>

			<div className="card mt-3">
				<div className="card-body">
					<form
						noValidate
						onSubmit={handlePasswordSubmit}
						className={`mb-2 needs-validation ${validated ? 'was-validated' : ''}`}
					>
						<h4 className="card-title">
							<FaKey /> Update Password
						</h4>
						<div className="mb-3">
							<label htmlFor="oldPasswordInput" className="form-label">
								Old Password
							</label>
							<input
								type="password"
								className="form-control"
								id="oldPasswordInput"
								value={oldPassword}
								onChange={(e) => setOldPassword(e.target.value)}
								required
							/>
							<div className="invalid-feedback">
								Please enter your old password.
							</div>
						</div>
						<div className="mb-3">
							<label htmlFor="newPasswordInput" className="form-label">
								New Password
							</label>
							<input
								type="password"
								className="form-control"
								id="newPasswordInput"
								value={newPassword}
								onChange={(e) => setNewPassword(e.target.value)}
								required
							/>
							<div className="invalid-feedback">
								Please enter a new password.
							</div>
						</div>
						<div className="d-grid gap-2">
							<button id="main" type="submit" className="btn-main">
								Update Password
							</button>
						</div>
					</form>
				</div>
			</div>
			<button
				type="button"
				className="btn-secondary"
				onClick={() => {
					offlineStatus();
					signOut();
				}}
			>
				Sign Out
			</button>
		</div>
	);
};

export default SettingsMenu;

SettingsMenu.propTypes = {
	signOut: PropTypes.func.isRequired,
};
