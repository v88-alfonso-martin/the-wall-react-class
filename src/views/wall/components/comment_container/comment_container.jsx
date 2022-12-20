import React, { Component } from "react";
import ActionButtons from "../actions_buttons/action_buttons";
import EditCommentForm from "../edit_comment_form/edit_comment_form";
import EditFormButtons from "../edit_form_buttons/edit_form_buttons";
import "./comment_container.scss";

export class CommentContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment_content: this.props.comment.content,
            prev_comment_content: this.props.comment.content,
            is_editing: false,
            is_button_disabled: false
        }
    }

    enableEditComment = () => {
        this.setState({ is_editing: true });
    }

    cancelEditComment = () => {
        this.setState(prev_state => ({
            is_editing: false,
            comment_content: prev_state.prev_comment_content,
            is_button_disabled: false
        }));
    }

    changeEditCommentContent = (event) => {
        this.setState({
            comment_content: event.target.value,
            is_button_disabled: event.target.value !== "" ? false : true
        });
    }

    submitEditComment = (event) => {
        event.preventDefault();
        this.setState({
            is_editing: false,
            comment_content: event.target.post_comment.value,
            prev_comment_content: event.target.post_comment.value
        });
    }

	render() {
        let { openDeleteCommentModal, comment: { id } } = this.props
        let { comment_content, is_editing, is_button_disabled } = this.state;

		return (
            <li className="comment_container">
                <EditCommentForm 
                    comment_content={comment_content} 
                    is_editing={is_editing} 
                    changeEditCommentContent={this.changeEditCommentContent} 
                    submitEditComment={this.submitEditComment}
                >
                    <ActionButtons 
                        id={id}
                        openModal={openDeleteCommentModal}
                        action_for="comment"
                        enableEditForm={this.enableEditComment}
                    />
                    <EditFormButtons cancelEditForm={this.cancelEditComment} is_button_disabled={is_button_disabled}/>
                </EditCommentForm>
            </li>
        );
	}
}

export default CommentContainer;
