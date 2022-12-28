import React, { Component, createRef } from "react";
import "./edit_comment_form.scss";
import EditFormButtons from "./edit_form_buttons";

export class EditCommentForm extends Component {
    constructor(props) {
        super(props);
        this.textarea = createRef();
        this.state = {
            comment_content: this.props.comment_content,
        }
    }

    changeEditCommentContent = (event) => {
        this.setState({ comment_content: event.target.value });
    }

    componentDidMount() {
        if(this.props.is_editing) {
            let end = this.props.comment_content.length;
            this.textarea.current.setSelectionRange(end, end);
            this.textarea.current.focus();
        }
    }

	render() {
		let { submitEditComment, cancelEditComment, comment_id, message_id} = this.props;
        let { comment_content } = this.state;
		return (
			<form method="post" className="edit_comment_form" onSubmit={(event) => {
                event.preventDefault();
                submitEditComment(message_id, comment_id, comment_content);
                cancelEditComment();
            }}>
				<textarea name="post_comment" value={comment_content} onChange={this.changeEditCommentContent} ref={this.textarea}></textarea>
                <EditFormButtons cancelEditForm={cancelEditComment} textarea_content={comment_content} />
			</form>
		);
	}
}

export default EditCommentForm;
