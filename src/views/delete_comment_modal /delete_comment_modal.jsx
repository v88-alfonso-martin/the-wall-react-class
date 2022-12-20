import React, { Component } from "react";
import close_icon from "../../assets/images/cancel.png";
import "./delete_comment_modal.scss";

export class DeleteCommentModal extends Component {
	submitDeleteComment = (event) => {
		event.preventDefault();
		let { closeDeleteCommentModal, deleteComment, comment_id } = this.props;

		deleteComment(comment_id);
		closeDeleteCommentModal(event);
	};
	render() {
		let { closeDeleteCommentModal } = this.props;
		return (
			<div className="delete_comment_modal" onClick={closeDeleteCommentModal}>
				<div className="modal_container">
					<img src={close_icon} alt="Close Icon" onClick={closeDeleteCommentModal} />
					<form method="post" onSubmit={this.submitDeleteComment}>
						<h2>Confirm Delete Comment</h2>
						<p>Are you sure you want to remove this comment? This action cannot be undone.</p>
						<div className="buttons_container">
							<button type="button" className="cancel_button" onClick={closeDeleteCommentModal}>Cancel</button>
							<button type="submit" className="success_button">Yes, Remove it.</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default DeleteCommentModal;
