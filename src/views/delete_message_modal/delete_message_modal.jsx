import React, { Component } from "react";
import close_icon from "../../assets/images/cancel.png";
import "./delete_message_modal.scss";

export class DeleteMessageModal extends Component {
	submitDeleteMessage = (event) => {
		event.preventDefault();
		let { closeDeleteMessageModal, deleteMessage, message_id } = this.props;

		deleteMessage(message_id);
		closeDeleteMessageModal(event);
	};
	render() {
		let { closeDeleteMessageModal } = this.props;
		return (
			<div className="delete_message_modal" onClick={closeDeleteMessageModal}>
				<div className="modal_container">
					<img src={close_icon} alt="Close Icon" onClick={closeDeleteMessageModal} />
					<form method="post" onSubmit={this.submitDeleteMessage}>
						<h2>Confirm Delete Message</h2>
						<p>Are you sure you want to remove this message? This action cannot be undone.</p>
						<div className="buttons_container">
							<button type="button" className="cancel_button" onClick={closeDeleteMessageModal}>Cancel</button>
							<button type="submit" className="success_button">Yes, Remove it.</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default DeleteMessageModal;
