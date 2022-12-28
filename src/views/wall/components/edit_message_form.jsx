import React, { Component, createRef } from "react";
import EditFormButtons from "./edit_form_buttons";
import "./edit_message_form.scss";

export class EditMessageForm extends Component {
	constructor(props) {
        super(props);
        this.textarea = createRef();
        this.state = {
            message_content: this.props.message_content,
        }
    }

    /**
    * DOCU: Change the state of the message content.
    */
    changeMessageContent = (event) => {
        this.setState({
            message_content: event.target.value
        });
    }

    /**
    * DOCU: Add cursor on textarea when editing comment.
    */
    componentDidMount() {
        if(this.props.is_editing) {
            let end = this.state.message_content.length;
            this.textarea.current.setSelectionRange(end, end);
            this.textarea.current.focus();
        }
    }

	render() {
		let { submitEditMessage, disableEditMessage, message_id } = this.props;
        let { message_content } = this.state;
        
		return (
			<form method="post" className="edit_message_form" onSubmit={(event) => {
                submitEditMessage(event, message_content, message_id );
                disableEditMessage();
            }}>
				<textarea name="post" placeholder="Type your message here." value={message_content} onChange={this.changeMessageContent} ref={this.textarea}></textarea>
				<EditFormButtons cancelEditForm={disableEditMessage} textarea_content={message_content} />
			</form>
		);
	}
}

export default EditMessageForm;
