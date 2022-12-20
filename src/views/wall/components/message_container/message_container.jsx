import React, { Component, Fragment } from "react";
import ActionButtons from "../actions_buttons/action_buttons";
import EditFormButtons from "../edit_form_buttons/edit_form_buttons";
import EditMessageForm from "../edit_message_form/edit_message_form";
import PostCommentForm from "../post_comment_form/post_comment_form";
import { getId } from "../../wall";
import "./message_container.scss";
import CommentsContainer from "../comments_container/comments_container";

export class MessageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            comment_content: "",
            toggle_comment: false,
            message_content: this.props.message.content,
            prev_message_content: this.props.message.content,
            is_editing: false,
            is_button_disabled: false,
        }
    }

    /* Comment actions */
    toggleCreateComment = () => {
        this.setState(prev_state => ({ toggle_comment: !prev_state.toggle_comment, comment_content: "" }));
    }

    changeCommentContent = (event) => {
        this.setState({ comment_content: event.target.value });
    }

    submitComment = (event) => {
        event.preventDefault();
        this.setState(prev_state => ({ comments: [{id: getId(), content: prev_state.comment_content}, ...prev_state.comments], comment_content: "" }));
    }

    /* Edit actions */
    enableEditMessage = () => {
        this.setState({ is_editing: true });
    }

    cancelEditMessage = () => {
        this.setState(prev_state => ({
            is_editing: false,
            message_content: prev_state.prev_message_content
        }));
    }

    changeMessageContent = (event) => {
        this.setState({
            message_content: event.target.value,
            is_button_disabled: event.target.value !== "" ? false : true
        });
    }

    submitEditMessage = (event) => {
        event.preventDefault();
        this.setState({
            is_editing:false,
            message_content: event.target.post.value,
            prev_message_content: event.target.post.value
        });
    }

    deleteComment = (comment_id) => {
        this.setState(prev_state => ({ comments: prev_state.comments.filter((comment) => comment.id !== comment_id) }))
    }

	render() {
        let { message_content, is_editing, is_button_disabled, toggle_comment, comment_content, comments } = this.state;
        let { openDeleteMessageModal, message: { id } } = this.props;
		return (
            <li className="message_container">
                <EditMessageForm 
                    message_content={message_content}
                    is_editing={is_editing}
                    changeMessageContent={this.changeMessageContent}
                    submitEditMessage={this.submitEditMessage}
                    toggle_comment={toggle_comment}
                >
                    <ActionButtons 
                        openModal={openDeleteMessageModal} 
                        id={id}
                        enableEditForm={this.enableEditMessage}
                        toggleCreateComment={this.toggleCreateComment}
                        comment_length={comments.length}
                        action_for="message"
                        toggle_comment={toggle_comment}
                    />
                    <EditFormButtons
                        cancelEditForm={this.cancelEditMessage}
                        is_button_disabled={is_button_disabled}
                    />
                </EditMessageForm>
                {toggle_comment ? (
                    <Fragment>
                        <PostCommentForm changeCommentContent={this.changeCommentContent} comment_content={comment_content} submitComment={this.submitComment}/>
                        <CommentsContainer comments={comments} deleteComment={this.deleteComment}/>
                    </Fragment>
                ) : null}
            </li>
        );
	}
}

export default MessageContainer;
