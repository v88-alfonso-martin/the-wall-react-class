import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import "./delete_modal.scss";

export class DeleteCommentModal extends Component {
	render() {
		let {deleteComment, comment_id, message_id, ...rest } = this.props;
		return (
			<Modal
				className="delete_comment_modal"
				{...rest}
				size="md"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<form
						method="post"
						onSubmit={(event) => {
							event.preventDefault();
							deleteComment(message_id, comment_id);
							rest.onHide();
						}}
					>
						<h4>Confirm Delete Comment</h4>
						<p>Are you sure you want to remove this comment? This action cannot be undone.</p>
						<div className="buttons_container">
							<button
								type="button"
								className="cancel_button"
								onClick={rest.onHide}
							>
								Cancel
							</button>
							<button type="submit" className="success_button">
								Yes, Remove it.
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default DeleteCommentModal;
