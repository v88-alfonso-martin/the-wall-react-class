import React, { Component, Fragment } from "react";
import DeleteCommentModal from "../../../delete_comment_modal /delete_comment_modal";
import CommentContainer from "../comment_container/comment_container";
import "./comments_container.scss";

export class CommentsContainer extends Component {
    constructor() {
        super();
        this.state = {
            is_open_delete_comment_modal: false,
            comment_id: ""
        }
    }

    openDeleteCommentModal = (comment_id) => {
		this.setState({ is_open_delete_comment_modal: true, comment_id });
	}

	closeDeleteCommentModal = (event) => {
		if (event.target === event.currentTarget) {
			this.setState({ is_open_delete_comment_modal: false });
		}
	}
	render() {
        let { is_open_delete_comment_modal, comment_id } = this.state;
        let { comments, deleteComment } = this.props;
		return (
            <Fragment>
                <ul className="comments_container">
                    {comments.map(comment => (
                        <CommentContainer key={comment.id} comment={comment} openDeleteCommentModal={this.openDeleteCommentModal}/>
                    ))}
                </ul>
                {is_open_delete_comment_modal ? <DeleteCommentModal comment_id={comment_id} closeDeleteCommentModal={this.closeDeleteCommentModal} deleteComment={deleteComment}/> : null}
            </Fragment>
        );
	}
}

export default CommentsContainer;
