import React, { Component } from "react";
import { Link } from "react-router-dom";
import illustration from "../../assets/images/Group_2019.png";
import "./login.scss";

export class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: "",
            password: "",
            is_error: false
        }
    }

    changeFormState = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }

    loginUser = (event) => {
        event.preventDefault();
        let {email, password} = event.target;
        if(email.value === "test@test.com" && password.value === "password") {
            window.location.href = "/wall";
        }
        else {
            this.setState({ is_error: true });
        }
    }

	render() {
        let { is_error } = this.state;
		return (
			<div className="login_container">
				<div className="form_container">
					<form method="post" onSubmit={this.loginUser}>
						<h3>The Wall</h3>
						<h1>Log In</h1>
						<div className="form_group">
							<label htmlFor="email_input">Email</label>
							<input 
                                type="text" 
                                name="email" 
                                id="email_input" 
                                tabIndex="1" 
                                autoFocus 
                                onChange={this.changeFormState}
                                className={is_error ? "show_error_color" : ""}
                            />
							<div className={is_error ? "error_message show_error_message" : "error_message"}>Incorrect Email</div>
						</div>
						<div className="form_group">
							<div className="forgot_password_container">
								<label htmlFor="password_input">Password</label>
								<a href="#">Forgot Password ?</a>
							</div>
							<input 
                                type="password" 
                                name="password" 
                                id="password_input" 
                                tabIndex="2" 
                                onChange={this.changeFormState}
                                className={is_error ? "show_error_color" : ""}
                            />
							<div className={is_error ? "error_message show_error_message" : "error_message"}>Incorrect Password</div>
						</div>
						<button type="submit" tabIndex="3">
							SIGN IN
						</button>
						<p>
							I don't have an account ? <Link to="/signup">Sign up</Link>
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

export default Login;
