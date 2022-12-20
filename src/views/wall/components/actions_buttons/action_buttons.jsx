import React, { Component } from "react";
import "./action_buttons.scss";
import comment_icon from "../../../../assets/images/messages-bubble-square-text.png";
import comment_icon_blue from "../../../../assets/images/messages-bubble-square-text-blue.png";
import edit_icon from "../../../../assets/images/pencil-write.png";
import delete_icon from "../../../../assets/images/delete.png";
import user_icon from "../../../../assets/images/User-Placeholder.png";

export class ActionButtons extends Component {

	render() {
        let { openModal, id, enableEditForm, action_for, comment_length, toggle_comment, toggleCreateComment } = this.props;

		return (
            <div className="action_buttons">
                {action_for === "message" ? (
                    <button type="button" onClick={toggleCreateComment}>
                        <img src={toggle_comment ? comment_icon_blue : comment_icon} alt="Comment Icon" />
                        <span className={toggle_comment ? "blue_text" : ""}>{comment_length} Comment</span>
                    </button>
                ) : null}
                <button type="button" onClick={enableEditForm}>
                    <img src={edit_icon} alt="Edit Icon" />
                    <span className="blue_text">Edit</span>
                </button>
                <button type="button" onClick={() => openModal(id)}>
                    <img src={delete_icon} alt="Delete Icon" />
                    <span>Delete</span>
                </button>
                <div>
                    <img src={user_icon} alt="User Icon" />
                    <div>
                        <span>You</span> - Few seconds ago
                    </div>
                </div>
            </div>
        );
	}
}

export default ActionButtons;
