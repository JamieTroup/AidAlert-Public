// React imports
import React, { useState, useEffect } from 'react';
// Material-UI components import
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogActions,
	TextField,
	Button,
	Select,
	MenuItem,
	InputLabel,
	FormControl,
	FormHelperText,
	Checkbox,
	ListItemText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
// Custom hook for fetching locations
import useFetchLocations from './getLocations';

/**
 * EventModal component for creating and editing events.
 * This modal provides fields for event name, description, and responder selection.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - State controlling visibility of the modal
 * @param {function} props.onClose - Handler to close the modal
 * @param {function} props.onSubmit - Handler to submit the event data
 * @param {Object} props.eventDetails - Details of the event being edited
 * @param {string} props.mode - Mode of the modal: 'edit' or 'add'
 */
function EventModal({ isOpen, onClose, onSubmit, eventDetails, mode }) {
	// State initialization
	const [eventName, setEventName] = useState('');
	const [eventDescription, setEventDescription] = useState('');
	const [responders, setResponders] = useState([]);
	const [locations] = useFetchLocations(true);

	// Effect hook for initializing the modal with event data or resetting it
	/* eslint-disable indent*/
	useEffect(() => {
		if (isOpen && mode === 'edit' && eventDetails) {
			setEventName(eventDetails.event_name || '');
			setEventDescription(eventDetails.event_description || '');
			setResponders(
				Array.isArray(eventDetails.responders)
					? eventDetails.responders.filter((responder) =>
							locations.some((location) => location.name === responder)
						)
					: []
			);
		} else if (isOpen && mode !== 'edit') {
			setEventName('');
			setEventDescription('');
			setResponders([]);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen, mode, eventDetails]); // Effect dependencies

	// Handles the submission of the modal form
	const handleSubmission = () => {
		onSubmit({
			event_name: eventName,
			event_description: eventDescription,
			assigned_responders: responders,
		});
		onClose();
	};

	return (
		<Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
			<DialogTitle id="form-dialog-title">
				{mode === 'edit' ? 'Edit Event' : 'Add New Event'}
			</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin="dense"
					label="Event Name"
					type="text"
					fullWidth
					variant="outlined"
					value={eventName}
					onChange={(e) => setEventName(e.target.value)}
				/>
				<TextField
					margin="dense"
					label="Event Description"
					type="text"
					fullWidth
					multiline
					minRows={4}
					variant="outlined"
					value={eventDescription}
					onChange={(e) => setEventDescription(e.target.value)}
				/>
				<FormControl fullWidth margin="normal">
					<InputLabel id="responder-label">Responder(s)</InputLabel>
					<Select
						multiple
						value={responders}
						onChange={(e) => setResponders(e.target.value)}
						renderValue={(selected) =>
							selected
								.map((id) => locations.find((loc) => loc.id === id)?.name)
								.join(', ')
						}
						MenuProps={{
							getContentAnchorEl: null,
							anchorOrigin: {
								vertical: 'bottom',
								horizontal: 'left',
							},
							transformOrigin: {
								vertical: 'top',
								horizontal: 'left',
							},
						}}
					>
						{locations.map((location) => (
							<MenuItem key={location.id} value={location.id}>
								<Checkbox checked={responders.includes(location.id)} />
								<ListItemText primary={location.name} />
							</MenuItem>
						))}
					</Select>
					<FormHelperText>Select responder(s)</FormHelperText>
				</FormControl>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} color="primary">
					Cancel
				</Button>
				<Button onClick={handleSubmission} color="primary" variant="contained">
					{mode === 'edit' ? 'Update' : 'Submit'}
				</Button>
			</DialogActions>
		</Dialog>
	);
}

// PropTypes for type-checking
EventModal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	onSubmit: PropTypes.func.isRequired,
	eventDetails: PropTypes.shape({
		event_name: PropTypes.string,
		event_description: PropTypes.string,
		responders: PropTypes.arrayOf(PropTypes.string),
	}),
	mode: PropTypes.string.isRequired,
};

// Export component as default
export default EventModal;
