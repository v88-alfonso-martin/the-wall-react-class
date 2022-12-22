import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "./delete_modal.scss";

export class DeleteMessageModal extends Component {
	submitDeleteMessage = event => {
		event.preventDefault();
		let { deleteMessage, message_id } = this.props;

		deleteMessage(message_id);
	};
	render() {
		let { deleteMessage, message_id, ...rest } = this.props;
		return (
			<Modal
				className="delete_comment_modal"
				{...rest}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body className="py-0 px-5 pb-5">
					<form
						method="post"
						onSubmit={this.submitDeleteMessage}
					>
						<h3 className="pb-3">Confirm Delete Message</h3>
						<p>Are you sure you want to remove this message? This action cannot be undone.</p>
						<div className="buttons_container">
							<button
								type="button"
								className="cancel_button"
								onClick={rest.onHide}
							>
								Cancel
							</button>
							<button
								type="submit"
								className="success_button"
							>
								Yes, Remove it.
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default DeleteMessageModal;
