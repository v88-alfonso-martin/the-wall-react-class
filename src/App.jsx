import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Practice from "./practice";
import Login from "./views/login/login";
import Signup from "./views/signup/signup";
import Wall from "./views/wall/wall";

class App extends Component {
	constructor() {
		super();
		this.state = {
			show_modal: false,
		};
	}
	render() {
		return (
			// <div>
			// 	<Practice
			// 		show={this.state.show_modal}
			// 		onHide={() => this.setState({ show_modal: false })}
			// 	/>
			// 	<button onClick={() => this.setState({ show_modal: true })}>acasc</button>
			// </div>
			<Router>
				<Routes>
					<Route exact path="/" element={<Login/>}></Route>
					<Route exact path="/signup" element={<Signup/>}></Route>
					<Route exact path="/wall" element={<Wall/>}></Route>
				</Routes>
			</Router>
		);
	}
}

export default App;
