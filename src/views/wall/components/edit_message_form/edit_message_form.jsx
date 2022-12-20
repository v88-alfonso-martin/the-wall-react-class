import React, { Component, createRef } from "react";
import "./edit_message_form.scss";

export class EditMessageForm extends Component {
	constructor() {
        super();
        this.textarea = createRef();
    }

    componentDidUpdate() {
        if(this.props.is_editing && !this.props.toggle_comment) {
            let end = this.props.message_content.length;
            this.textarea.current.setSelectionRange(end, end);
            this.textarea.current.focus();
        }
    }

	render() {
		let { message_content, children, is_editing, submitEditMessage, changeMessageContent } = this.props;
		return (
			<form method="post" className="edit_message_form" onSubmit={submitEditMessage}>
				{is_editing ? (
					<textarea name="post" placeholder="Type your message here." value={message_content} onChange={changeMessageContent} ref={this.textarea}></textarea>
				) : (
					<p>{message_content}</p>
				)}
				{is_editing ? children[1] : children[0]}
			</form>
		);
	}
}

export default EditMessageForm;
