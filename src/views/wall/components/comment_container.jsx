import React, { Component } from "react";
import ActionButtons from "./action_buttons";
import EditCommentForm from "./edit_comment_form";
import "./comment_container.scss";

export class CommentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_editing: false,
        }
    }

	render() {
        let { 
            openDeleteCommentModal, 
            comment: { id, content }, 
            message_id, 
            submitEditComment 
        } = this.props;
        let { is_editing } = this.state;

		return (
            <li className="comment_container">
                {!is_editing ? (
                    <>
                        <p>{content}</p>
                        <ActionButtons 
                            id={id}
                            message_id={message_id}
                            openModal={openDeleteCommentModal}
                            action_for="comment"
                            enableEditForm={() => this.setState({ is_editing: true })}
                        />
                    </>
                ) : (
                    <EditCommentForm 
                        comment_content={content} 
                        comment_id={id}
                        message_id={message_id}
                        is_editing={is_editing} 
                        changeEditCommentContent={this.changeEditCommentContent} 
                        submitEditComment={submitEditComment}
                        cancelEditComment={() => this.setState({ is_editing: false})}
                    />
                )}
               
            </li>
        );
	}
}

export default CommentContainer;
