import React, { Component, Fragment } from "react";
import DeleteMessageModal from "../../../delete_message_modal/delete_message_modal";
import MessageContainer from "../message_container/message_container";
import "./messages_container.scss";

export class MessagesContainer extends Component {
	constructor() {
		super();
		this.state = {
			is_open_delete_message_modal: false,
			message_id: "",
		};
	}

	openDeleteMessageModal = (message_id) => {
		this.setState({ is_open_delete_message_modal: true, message_id });
	}

	closeDeleteMessageModal = (event) => {
		if (event.target === event.currentTarget) {
			this.setState({ is_open_delete_message_modal: false });
		}
	}

	render() {
		let { messages, deleteMessage } = this.props;
		let { is_open_delete_message_modal, message_id } = this.state;
		return (
			<Fragment>
				<ul className="messages_container">
					{messages.map((message) => (
						<MessageContainer key={message.id} message={message} openDeleteMessageModal={this.openDeleteMessageModal} />
					))}
				</ul>
				{is_open_delete_message_modal ? <DeleteMessageModal message_id={message_id} closeDeleteMessageModal={this.closeDeleteMessageModal} deleteMessage={deleteMessage} /> : null}
			</Fragment>
		);
	}
}

export default MessagesContainer;
