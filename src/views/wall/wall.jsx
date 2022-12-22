import React, { Component } from "react";
import empty_icon from "../../assets/images/empty.png";
import CreateMessageModal from "./modals/create_message_modal";
import { getId } from "../../__helpers/helpers";
import MessageContainer from "./components/message_container";
import DeleteMessageModal from "./modals/delete_message_modal";
import "./wall.scss";

export class Wall extends Component {
    constructor() {
        super();
        this.state = {
            is_open_create_message_modal: false,
            is_open_delete_message_modal: false,
            messages: [],
            message_content: "",
            message_id: ""
        };
    }

    openCreateMessageModal = () => {
        this.setState({ is_open_create_message_modal: true });
    }

    closeCreateMessageModal = () => {
        this.setState({ is_open_create_message_modal: false, message_content: "" });
    }

    changeMessageContent = (event) => {
        this.setState({ message_content: event.target.value });
    }

    submitMessage = (event) => {
        event.preventDefault();
        this.setState(prev_state => ({
            messages: [{id: getId(), content: prev_state.message_content}, ...prev_state.messages],
            is_open_create_message_modal: false,
            message_content: ""
        }));
    }

    openDeleteMessageModal = (message_id) => {
		this.setState({ is_open_delete_message_modal: true, message_id });
	}

    closeDeleteMessageModal = () => {
		this.setState({ is_open_delete_message_modal: false });
	}

    deleteMessage = (message_id) => {
        this.setState(prev_state => ({ messages: prev_state.messages.filter((message) => message.id !== message_id), is_open_delete_message_modal: false }));
    }

	render() {
        let { 
            is_open_create_message_modal, 
            is_open_delete_message_modal, 
            messages, 
            message_content,
            message_id
        } = this.state;

		return (
            <div className="wall_container">
                <header>
                    <div className="container">
                        <h4>The Wall Assignment</h4>
                        <nav>
                            <p>Welcome, Alfonso Martin B. Angeles!</p>
                            <a href="/">Logout</a>
                        </nav>
                    </div>
                </header>
                <main>
                    <div className="container">
                        <div className="main_header">
                            <p>
                                <span>{messages.length}</span> messages arranged by latest posted
                            </p>
                            <button onClick={this.openCreateMessageModal}>Create Message</button>
                        </div>
                        <ul className="messages_container">
                            {messages.map((message) => (
                                <MessageContainer 
                                    key={message.id}
                                    message={message}
                                    openDeleteMessageModal={this.openDeleteMessageModal}
                                />
                            ))}
                        </ul>
                        {messages.length === 0 && (
                            <div id="no_messages">
                                <img src={empty_icon} alt="Empty Icon" />
                                <p>No Posted Message Yet.</p>
                            </div>
                        )}
                    </div>
                </main>
                {is_open_create_message_modal && (
                    <CreateMessageModal 
                        show={is_open_create_message_modal}
                        onHide={this.closeCreateMessageModal} 
                        changeMessageContent={this.changeMessageContent}
                        message_content={message_content}
                        submitMessage={this.submitMessage}
                    />
                )}
                {is_open_delete_message_modal && (
                    <DeleteMessageModal
                        show={is_open_delete_message_modal}
                        message_id={message_id}
                        onHide={this.closeDeleteMessageModal}
                        deleteMessage={this.deleteMessage}
                    />
                )}
            </div>
        );
	}
}

export default Wall;
