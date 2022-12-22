import React, { Component, Fragment } from "react";
import ActionButtons from "./action_buttons";
import EditFormButtons from "./edit_form_buttons";
import EditMessageForm from "./edit_message_form";
import PostCommentForm from "./post_comment_form";
import { getId } from "../../../__helpers/helpers";
import "./message_container.scss";
import CommentContainer from "./comment_container";
import DeleteCommentModal from "../modals/delete_comment_modal";

export class MessageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle_comment: false,
            message_content: this.props.message.content,
            prev_message_content: this.props.message.content,
            is_editing: false,
            comments: [],
            comment_content: "",
            is_open_delete_comment_modal: false,
            comment_id: ""
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
            message_content: event.target.value
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

    openDeleteCommentModal = (comment_id) => {
		this.setState({ is_open_delete_comment_modal: true, comment_id });
	}

	closeDeleteCommentModal = () => {
        this.setState({ is_open_delete_comment_modal: false });
	}

    deleteComment = (comment_id) => {
        this.setState(prev_state => ({ comments: prev_state.comments.filter((comment) => comment.id !== comment_id), is_open_delete_comment_modal: false }))
    }

	render() {
        let { 
            message_content, 
            is_editing, 
            toggle_comment, 
            comment_content, 
            comments,
            comment_id,
            is_open_delete_comment_modal 
        } = this.state;
        let { 
            openDeleteMessageModal, 
            message: { id } 
        } = this.props;

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
                    <EditFormButtons cancelEditForm={this.cancelEditMessage} textarea_content={message_content} />
                </EditMessageForm>
                {toggle_comment && (
                    <Fragment>
                        <PostCommentForm 
                            changeCommentContent={this.changeCommentContent}
                            comment_content={comment_content} 
                            submitComment={this.submitComment}
                        />
                        <ul className="comments_container">
                            {comments.map(comment => (
                                <CommentContainer 
                                    key={comment.id} 
                                    comment={comment} 
                                    openDeleteCommentModal={this.openDeleteCommentModal}
                                />
                            ))}
                        </ul>
                        {is_open_delete_comment_modal && (
                            <DeleteCommentModal 
                                show={is_open_delete_comment_modal}
                                comment_id={comment_id} 
                                onHide={this.closeDeleteCommentModal} 
                                deleteComment={this.deleteComment}
                            />
                        )}
                    </Fragment>
                )}
            </li>
        );
	}
}

export default MessageContainer;
