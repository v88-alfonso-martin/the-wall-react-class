import React, { Component, createRef } from "react";
import close_icon from "../../assets/images/cancel.png";
import "./create_message_modal.scss";

export class CreateMessageModal extends Component {
	constructor() {
		super();
		this.textarea = createRef();
	}

	componentDidMount() {
		this.textarea.current.focus();
	}

	render() {
		let { closeCreateMessageModal, changeMessageContent, is_button_disabled, submitMessage } = this.props;
		return (
			<div className="create_message_modal" onClick={closeCreateMessageModal}>
				<div className="modal_container">
					<img src={close_icon} alt="Close Icon" onClick={closeCreateMessageModal} />
					<h2>Create a Message</h2>
					<form method="post" onSubmit={submitMessage}>
						<textarea name="message" ref={this.textarea} onChange={changeMessageContent}></textarea>
						<div className="buttons_container">
							<button type="button" className="cancel_button" onClick={closeCreateMessageModal}>Cancel</button>
							<button 
								type="submit" 
								className={is_button_disabled ? "success_button disabled_button" : "success_button"} 
								disabled={is_button_disabled}
							>
								Post Message
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}
}

export default CreateMessageModal;
