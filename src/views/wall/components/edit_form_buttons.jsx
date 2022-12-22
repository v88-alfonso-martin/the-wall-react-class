import React, { Component } from "react";
import "./edit_form_buttons.scss";

export class EditFormButtons extends Component {
	render() {
        let { cancelEditForm, textarea_content } = this.props;
		return (
            <div className="edit_form_buttons">
                <button type="button" className="cancel_button" onClick={cancelEditForm}>Cancel</button>
                <button type="submit" className={!textarea_content ? "success_button disabled_button" : "success_button"} disabled={!textarea_content}>Update Message</button>
            </div>
        );
	}
}

export default EditFormButtons;
