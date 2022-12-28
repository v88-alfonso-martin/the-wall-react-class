import React, { Component, createRef } from "react";
import "./post_comment_form.scss";

export class PostCommentForm extends Component {
	constructor() {
        super();
        this.textarea = createRef();
		this.state = {
			comment_content: ""
		};
    }

	/**
    * DOCU: Change the state of the comment content.
    */
	changeCommentContent = (event) => {
        this.setState({ comment_content: event.target.value });
    }

    /**
    * DOCU: Add cursor on textarea when posting comment.
    */
    componentDidMount() {
    	this.textarea.current.focus();
    }

	render() {
		let { submitComment, message_id } = this.props;
		let { comment_content } = this.state;

		return (
			<form method="post" className="post_comment_form" onSubmit={(event) => {
				event.preventDefault();
				submitComment(message_id, comment_content);
				this.setState({comment_content: ""})
			}}>
				<textarea 
					name="comment" 
					placeholder="Type your comment here." 
					value={comment_content} 
					onChange={this.changeCommentContent} 
					ref={this.textarea}
				></textarea>
				<button 
					type="submit" 
					className={!comment_content ? "success_button disabled_button" : "success_button"} 
					disabled={!comment_content}
				>
					Post Comment
				</button>
			</form>
		);
	}
}

export default PostCommentForm;
