import React, { Component } from "react";
import "./edit_form_buttons.scss";

export class EditFormButtons extends Component {
	render() {
        let { cancelEditForm, is_button_disabled } = this.props;
		return (
            <div className="edit_form_buttons">
                <button type="button" className="cancel_button" onClick={cancelEditForm}>Cancel</button>
                <button type="submit" className={is_button_disabled ? "success_button disabled_button" : "success_button"} disabled={is_button_disabled}>Update Message</button>
            </div>
        );
	}
}

export default EditFormButtons;
