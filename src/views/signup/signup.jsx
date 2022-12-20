import React, { Component } from "react";
import { Link } from "react-router-dom";
import illustration from "../../assets/images/Group_2019.png";
import "./signup.scss";

export class Signup extends Component {
    constructor() {
        super();
        this.EMAIL = { is_valid: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ };
        this.PASSWORD = { min: 8 };
        this.state = {
            email: "",
            password: "",
            confirm_password: "",
            is_error_email: false,
            is_error_password: false,
            is_error_confirm_password: false
        }
    }
    
    changeFormState = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    signupUser = (event) => {
        event.preventDefault();
        let { email, password, confirm_password } = event.target;

        if(!this.EMAIL.is_valid.test(email.value)) {
            this.setState({ is_error_email: true });
        }
        else {
            this.setState({ is_error_email: false });
        }

        if(!password.value || password.value.length <= this.PASSWORD.min) {
            this.setState({ is_error_password: true });
        }
        else {
            this.setState({ is_error_password: false });
        }

        if(confirm_password?.value !== password.value) {
            this.setState({ is_error_confirm_password: true });
        }
        else {
            this.setState({ is_error_confirm_password: false });
        }
    }

    componentDidUpdate(prev_props, prev_state) {
        let { is_error_email, is_error_password, is_error_confirm_password }= this.state;

        if(prev_state.is_error_email !== is_error_email
            || prev_state.is_error_password !== is_error_password
            || prev_state.is_error_confirm_password !== is_error_confirm_password
        ) {
            if(!is_error_email && !is_error_password && !is_error_confirm_password) {
                window.location.href = "./wall";
            }
        }

    }

	render() {
        let { is_error_email, is_error_password, is_error_confirm_password } = this.state;
		return (
            <div className="signup_container">
                <div className="form_container">
                    <form method="post" onSubmit={this.signupUser}>
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
                                onChange={this.changeFormState}
                                className={is_error_email ? "show_error_color" : ""}
                            />
                            <div className={is_error_email ? "error_message show_error_message" : "error_message"}>Incorrect Email</div>
                        </div>
                        <div className="form_group">
                            <label htmlFor="password_input">Password</label>
                            <input 
                                type="password" 
                                name="password" 
                                id="password_input" 
                                tabIndex="2" 
                                onChange={this.changeFormState}
                                className={is_error_password ? "show_error_color" : ""}
                            />
                            <div className={is_error_password ? "error_message show_error_message" : "error_message"}>Incorrect Password</div>
                        </div>
                        <div className="form_group">
                            <label htmlFor="confirm_password_input">Confirm Password</label>
                            <input 
                                type="password" 
                                name="confirm_password" 
                                id="confirm_password_input" 
                                tabIndex="3" 
                                onChange={this.changeFormState}
                                className={is_error_confirm_password ? "show_error_color" : ""}
                            />
                            <div className={is_error_confirm_password ? "error_message show_error_message" : "error_message"}>Password does not match</div>
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
