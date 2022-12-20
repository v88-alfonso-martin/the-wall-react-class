import React, { Component, createRef } from "react";
import "./post_comment_form.scss";

export class PostCommentForm extends Component {
	constructor() {
        super();
        this.textarea = createRef();
    }

    componentDidMount() {
    	this.textarea.current.focus();
    }

	render() {
		let { comment_content, submitComment, changeCommentContent } = this.props;

		return (
			<form method="post" className="post_comment_form" onSubmit={submitComment}>
				<textarea name="comment" placeholder="Type your comment here." value={comment_content} onChange={changeCommentContent} ref={this.textarea}></textarea>
				<button type="submit" className={!comment_content ? "success_button disabled_button" : "success_button"} disabled={!comment_content}>Post Comment</button>
			</form>
		);
	}
}

export default PostCommentForm;
