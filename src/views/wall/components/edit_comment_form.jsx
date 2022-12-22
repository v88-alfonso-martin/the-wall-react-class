import React, { Component, createRef } from "react";
import "./edit_comment_form.scss";

export class EditCommentForm extends Component {
    constructor() {
        super();
        this.textarea = createRef();
    }

    componentDidUpdate() {
        if(this.props.is_editing) {
            let end = this.props.comment_content.length;
            this.textarea.current.setSelectionRange(end, end);
            this.textarea.current.focus();
        }
    }

	render() {
		let { is_editing, children, comment_content, changeEditCommentContent, submitEditComment } = this.props;
		return (
			<form method="post" className="edit_comment_form" onSubmit={submitEditComment}>
				{is_editing ? <textarea name="post_comment" value={comment_content} onChange={changeEditCommentContent} ref={this.textarea}></textarea> : <p>{comment_content}</p>}
				{is_editing ? children[1] : children[0]}
			</form>
		);
	}
}

export default EditCommentForm;
