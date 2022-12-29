import React, { Component } from "react";
import { Link } from "react-router-dom";
import illustration from "../../assets/images/Group_2019.png";
import { EMAIL, PASSWORD } from "../../__config/constant";
import "./signup.scss";

export class Signup extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            is_error_email: false,
            is_error_password: false,
            is_error_confirm_password: false
        };
    }
    
    /**
    *   DOCU: Change the state of the form.
    *   Triggered by src/views/signup/signup.jsx
    *   Last updated at: December 29, 2022
    *   @param {object} event onChange event that is trigged.
    *   @author Alfonso Martin Angeles
    */
    changeFormState = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    /**
    *   DOCU: Signup the user and redirect if no error.
    *   Triggered by src/views/signup/signup.jsx
    *   Last updated at: December 29, 2022
    *   @param {object} event onSubmit event that is trigged.
    *   @author Alfonso Martin Angeles
    */
    submitSignupUser = (event) => {
        event.preventDefault();
        const { email, password, confirm_password } = this.state;
		const error = {
			is_error_email: false,
			is_error_password: false,
			is_error_confirm_password: false,
		}

        /** Validate email. */
        error.is_error_email = !EMAIL.is_valid.test(email);

        /** Validate password. */
        error.is_error_password = !password || password.length <= PASSWORD.min;

        /** Validate confirm password. */
        error.is_error_confirm_password = !confirm_password || confirm_password !== password;

        /** Check if no error, if none redirect to the wall page else display errors. */
        if(!error.is_error_email && !error.is_error_password && !error.is_error_confirm_password) {
            window.location.href = "./wall";
        }
        else {
            this.setState(error);
        }
    }

	render() {
        let { 
            email,
            password,
            confirm_password,
            is_error_email, 
            is_error_password, 
            is_error_confirm_password,
        } = this.state;

		return (
            <div className="signup_container">
                <div className="form_container">
                    <form method="post" onSubmit={this.submitSignupUser}>
                        <h3>The Wall</h3>
                        <h1>Register</h1>
                        <div className="form_group">
                            <label htmlFor="email_input">Email</label>
                            <input 
                                type="text" 
                                name="email" 
                                id="email_input" 
                                tabIndex="1" 
                                autoFocus 
                                value={email}
                                onChange={this.changeFormState}
                                className={is_error_email ? "show_error_color" : ""}
                            />
                            <span className={`error_message ${is_error_email ? "show_error_message" : ""}`}>Incorrect Email</span>
                        </div>
                        <div className="form_group">
                            <label htmlFor="password_input">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password_input" 
                                tabIndex="2" 
                                value={password}
                                onChange={this.changeFormState}
                                className={is_error_password ? "show_error_color" : ""}
                            />
                            <span className={`error_message ${is_error_password ? "show_error_message" : ""}`}>Incorrect Password</span>
                        </div>
                        <div className="form_group">
                            <label htmlFor="confirm_password_input">Confirm Password</label>
                            <input 
                                type="password" 
                                name="confirm_password" 
                                id="confirm_password_input" 
                                tabIndex="3" 
                                value={confirm_password}
                                onChange={this.changeFormState}
                                className={is_error_confirm_password ? "show_error_color" : ""}
                            />
                            <span className={`error_message ${is_error_confirm_password ? "show_error_message" : ""}`}>Password does not match</span>
                        </div>
                        <p>
                            By creating an account, you agree with The W<br />all's <a href="#">Privacy Policy</a> and <a href="#">Terms of Use</a>
                        </p>
                        <button type="submit" tabIndex="4">SIGN UP</button>
                        <p>
                            <span>Already have an account ? </span>
                            <Link to="/">Sign in</Link>
                        </p>
                    </form>
                </div>
                <div className="illustration_container">
                    <img src={illustration} alt="illustration" />
                </div>
            </div>
        );
	}
}

export default Signup;
