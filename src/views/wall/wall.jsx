import React, { Component } from "react";
import empty_icon from "../../assets/images/empty.png"
import CreateMessageModal from "../create_message_modal/create_message_modal";
import MessagesContainer from "./components/messages_container/messages_container";
import "./wall.scss";

export let getId = () => {
    return `id${Date.now() + Math.random().toString(16).slice(2)}`;
}

export class Wall extends Component {
    constructor() {
        super();
        this.state = {
            is_open_create_message_modal: false,
            message_content: "",
            is_button_disabled: false,
            messages: []
        };
    }

    openCreateMessageModal = () => {
        this.setState({ 
            is_open_create_message_modal: true,
            is_button_disabled: true
        });
    }

    closeCreateMessageModal = (event) => {
        if(event.target === event.currentTarget) {
            this.setState({ 
                is_open_create_message_modal: false,
                is_button_disabled: false
            });
        }
    }

    changeMessageContent = (event) => {
        this.setState({
            message_content: event.target.value,
            is_button_disabled: event.target.value !== "" ? false : true
        });
    }

    submitMessage = (event) => {
        event.preventDefault();
        this.setState(prev_state => ({
            messages: [{id: getId(), content: prev_state.message_content}, ...prev_state.messages]
        }));
        this.closeCreateMessageModal(event);
    }

    deleteMessage = (message_id) => {
        this.setState(prev_state => ({ messages: prev_state.messages.filter((message) => message.id !== message_id) }))
    }

	render() {
        let { is_open_create_message_modal, is_button_disabled, messages } = this.state;
		return (
            <div className="wall_container">
                <header>
                    <div className="container">
                        <h2>The Wall Assignment</h2>
                        <nav>
                            <p>Welcome, Alfonso Martin B. Angeles</p>
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
                        <MessagesContainer messages={messages} deleteMessage={this.deleteMessage} />
                        {messages.length === 0 ? (
                            <div id="no_messages">
                                <img src={empty_icon} alt="Empty Icon" />
                                <p>No Posted Message Yet.</p>
                            </div>
                        ) : null}
                    </div>
                </main>
                {is_open_create_message_modal ? (
                    <CreateMessageModal 
                        closeCreateMessageModal={this.closeCreateMessageModal} 
                        changeMessageContent={this.changeMessageContent}
                        is_button_disabled={is_button_disabled}
                        submitMessage={this.submitMessage}
                    />
                ) : null}
            </div>
        );
	}
}

export default Wall;
