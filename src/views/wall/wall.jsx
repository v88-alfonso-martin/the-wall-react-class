import React, { Component } from "react";
import empty_icon from "../../assets/images/empty.png";
import CreateMessageModal from "./modals/create_message_modal";
import { getId, toggleShowModal } from "../../__helpers/helpers";
import MessageContainer from "./components/message_container";
import DeleteMessageModal from "./modals/delete_message_modal";
import "./wall.scss";
import DeleteCommentModal from "./modals/delete_comment_modal";

export class Wall extends Component {
    constructor() {
        super();
        this.state = {
            is_open_create_message_modal: false,
            is_open_delete_message_modal: false,
            is_open_delete_comment_modal: false,
            messages: [],
            message_content: "",
            message_id: "",
            comment_id: ""
        };
    }

    /**
    *   DOCU: Change the message state of the form.
    *   Triggered by src/views/wall/modals/create_message_modal.jsx
    *   Last updated at: December 29, 2022
    *   @param {object} event onChange event that is trigged.
    *   @author Alfonso Martin Angeles
    */
    changeMessageContent = (event) => {
        this.setState({ message_content: event.target.value });
    }
    
    /**
    *   DOCU: Add the message of the user.
    *   Triggered by src/views/wall/modals/create_message_modal.jsx
    *   Last updated at: December 29, 2022
    *   @param {object} event onChange event that is trigged.
    *   @author Alfonso Martin Angeles
    */
    submitMessage = (event) => {
        event.preventDefault();
        this.setState(prev_state => ({
            messages: [{id: getId(), content: prev_state.message_content, comments: []}, ...prev_state.messages],
            is_open_create_message_modal: false,
            message_content: ""
        }));
    }

    /**
    *   DOCU: Delete the selected message.
    *   Triggered by src/views/wall/modals/delete_message_modal.jsx
    *   Last updated at: December 29, 2022
    *   @param {object} event onChange event that is trigged.
    *   @author Alfonso Martin Angeles
    */
    deleteMessage = (message_id) => {
        this.setState(prev_state => ({ messages: prev_state.messages.filter((message) => message.id !== message_id), is_open_delete_message_modal: false }));
    }

    /**
    *   DOCU: Add edited message of the user.
    *   Triggered by src/views/wall/components/edit_message_form.jsx
    *   Last updated at: December 29, 2022
    *   @param {object} event onChange event that is trigged.
    *   @param {string} message_content edited message to be added.
    *   @param {string} message_id id of the message edited.
    *   @returns {array} messages [{ id, content, comments }]
    *   @author Alfonso Martin Angeles
    */
    submitEditMessage = (event, message_content, message_id) => {
        event.preventDefault();

        this.setState(prev_state => ({
            messages: prev_state.messages.map(message => {
                /** Change the selected message via id else return the message */
                if(message.id === message_id) {
                    return { ...message, content: message_content};
                }
                return message;
            })
        }));
    }

    /**
    *   DOCU: Add comment to the message.
    *   Triggered by src/views/wall/components/post_comment_form.jsx
    *   Last updated at: December 29, 2022
    *   @param {string} message_id id of the comment's parent message.
    *   @param {string} comment_content comment to be added.
    *   @returns {string} random generated id
    *   @returns {array} messages [{ id, content, comments }]
    *   @author Alfonso Martin Angeles
    */
    submitComment = (message_id, comment_content) => {
        this.setState(prev_state => {
			return {
				messages: prev_state.messages.map(message => {
					/** Get the selected message then add the comment*/
					if (message.id === message_id) {
						return {
							...message,
							comments: [{ id: getId(), content: comment_content }, ...message.comments],
						};
					}

					return message;
				}),
			};
		});
    }

    /**
    *   DOCU: Delete selected comment.
    *   Triggered by src/views/wall/modals/delete_comment_modal.jsx
    *   Last updated at: December 29, 2022
    *   @param {string} message_id id of the comment's parent message.
    *   @param {string} comment_id id of the comment to be deleted.
    *   @returns {array} messages [{ id, content, comments }]
    *   @author Alfonso Martin Angeles
    */
    deleteComment = (message_id, comment_id) => {
        this.setState(prev_state => {
			return {
				messages: prev_state.messages.map(message => {
					/** Get the parent message then delete the selected comment */
					if (message.id === message_id) {
						return {
							...message,
							comments: message.comments.filter(comment => comment.id !== comment_id),
						};
					}
					return message;
				}),
			};
		});
    }

    /**
    *   DOCU: Edit selected comment.
    *   Triggered by src/views/wall/components/edit_comment_form.jsx
    *   Last updated at: December 29, 2022
    *   @param {string} message_id id of the comment's parent message.
    *   @param {string} comment_id id of the comment to be deleted.
    *   @param {string} comment_content edited comment to be added.
    *   @returns {array} messages [{ id, content, comments }]
    *   @author Alfonso Martin Angeles
    */
    submitEditComment = (message_id, comment_id, comment_content) => {
        this.setState(prev_state => {
			return {
				messages: prev_state.messages.map(message => {
					/** Get the parent message then edit the selected comment */
					if (message.id === message_id) {
						return {
							...message,
							comments: message.comments.map(comment => {
                                if(comment.id === comment_id) {
                                    return {
                                        ...comment, content: comment_content
                                    }
                                }
                                return comment;
                            })
						};
					}
					return message;
				}),
			};
		});
    }

	render() {
        let { 
            is_open_create_message_modal, 
            is_open_delete_message_modal, 
            is_open_delete_comment_modal,
            messages, 
            message_content,
            message_id,
            comment_id 
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
                            <button onClick={() => {this.setState(toggleShowModal("is_open_create_message_modal", true))}}>Create Message</button>
                        </div>
                        <ul className="messages_container">
                            {messages.map((message) => (
                                <MessageContainer 
                                    key={message.id}
                                    message={message}
                                    submitEditMessage={this.submitEditMessage}
                                    submitComment={this.submitComment}
                                    submitEditComment={this.submitEditComment}
                                    openDeleteMessageModal={(message_id) => {this.setState({...toggleShowModal("is_open_delete_message_modal", true), message_id})}}
                                    openDeleteCommentModal={(comment_id, message_id) => {this.setState({...toggleShowModal("is_open_delete_comment_modal", true), comment_id, message_id})}}
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
                        onHide={() => {this.setState({...toggleShowModal("is_open_create_message_modal", false), message_content: ""})}} 
                        changeMessageContent={this.changeMessageContent}
                        message_content={message_content}
                        submitMessage={this.submitMessage}
                    />
                )}
                {is_open_delete_message_modal && (
                    <DeleteMessageModal
                        show={is_open_delete_message_modal}
                        message_id={message_id}
                        onHide={() => {this.setState(toggleShowModal("is_open_delete_message_modal", false))}}
                        deleteMessage={this.deleteMessage}
                    />
                )}
                {is_open_delete_comment_modal && (
                    <DeleteCommentModal 
                        show={is_open_delete_comment_modal}
                        message_id={message_id}
                        comment_id={comment_id} 
                        onHide={() => {this.setState(toggleShowModal("is_open_delete_comment_modal", false))}}
                        deleteComment={this.deleteComment}
                    />
                )}
            </div>
        );
	}
}

export default Wall;
