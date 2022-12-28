import React, { Component, createRef } from "react";
import Modal from "react-bootstrap/Modal";
import "./create_message_modal.scss";

export class CreateMessageModal extends Component {
	constructor() {
		super();
		this.textarea = createRef();
	}

    /**
    * DOCU: Add cursor on textarea when creating message.
    */
	componentDidMount() {
		this.textarea.current.focus();
	}

	render() {
		let { changeMessageContent, message_content, submitMessage, ...rest } = this.props;
		
		return (
			<Modal
				className="create_message_modal"
				{...rest}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
			>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<h4>Create a Message</h4>
					<form method="post" onSubmit={submitMessage}>
						<textarea
							name="message"
							placeholder="Type your message here."
							ref={this.textarea}
							value={message_content}
							onChange={changeMessageContent}
						></textarea>
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
								className={!message_content ? "success_button disabled_button" : "success_button"}
								disabled={!message_content}
							>
								Post Message
							</button>
						</div>
					</form>
				</Modal.Body>
			</Modal>
		);
	}
}

export default CreateMessageModal;
