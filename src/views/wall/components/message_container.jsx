import React, { Component } from "react";
import ActionButtons from "./action_buttons";
import EditMessageForm from "./edit_message_form";
import PostCommentForm from "./post_comment_form";
import "./message_container.scss";
import CommentContainer from "./comment_container";

export class MessageContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggle_comment: false,
            is_editing: false,
        };
    }

	render() {
        let { is_editing, toggle_comment } = this.state;
        let { 
            submitEditMessage, 
            openDeleteMessageModal, 
            message: { id, content, comments }, 
            submitComment,
            submitEditComment,
            openDeleteCommentModal
        } = this.props;

        return (
            <li className="message_container">
                {!is_editing ? (
                    <>
                        <p>{content}</p>
                        <ActionButtons 
                            openModal={openDeleteMessageModal} 
                            id={id}
                            enableEditForm={() => {this.setState({ is_editing: true })}}
                            toggleCreateComment={() => this.setState(prev_state => ({ toggle_comment: !prev_state.toggle_comment }))}
                            comment_length={comments.length}
                            action_for="message"
                            toggle_comment={toggle_comment}
                        />
                    </>
                ) : (
                    <EditMessageForm 
                        message_content={content}
                        message_id={id}
                        is_editing={is_editing}
                        submitEditMessage={submitEditMessage}
                        toggle_comment={toggle_comment}
                        disableEditMessage={() => this.setState({ is_editing: false })}
                    />
                )}
                
                {toggle_comment && (
                    <>
                        <PostCommentForm 
                            message_id={id}
                            submitComment={submitComment}
                        />
                        <ul className="comments_container">
                            {comments.map(comment => (
                                <CommentContainer 
                                    key={comment.id} 
                                    comment={comment} 
                                    message_id={id}
                                    submitEditComment={submitEditComment}
                                    openDeleteCommentModal={openDeleteCommentModal}
                                />
                            ))}
                        </ul>
                    </>
                )}
            </li>
        );
	}
}

export default MessageContainer;
