import React, {Component, PropTypes} from 'react';
import uuid from 'node-uuid';
import './Header.css';

class Header extends Component {
	static propTypes = {
		total: PropTypes.number,
		onAddProject: PropTypes.func
	};

	static defaultProps = {
		total: 0,
		onAddProject: () => {}
	};

	constructor(props) {
		super(props);
		this.state = {
			input: ''
		};
	}

	handleInputChange = event => {
		this.setState({input: event.target.value});
	};

	handleKeyPress = event => {
		if (event.key === 'Enter') {
			this.handleAddProject();
		}
	};

	handleAddProject = event => {
		if (event) {
			event.preventDefault();
		}
		this.props.onAddProject({
			type: 'ADD_TODO',
			payload: {
				id: uuid.v1(),
				title: this.state.input,
				state: 'new'
			}
		});
		this.setState({input: ''});
	};

	render() {
		const {total} = this.props;
		const {input} = this.state;
		return (
			<div className="App-header sixteen wide column">
				<div className="ui left floated segment">
					<div className="ui action input">
						<input
							onChange={this.handleInputChange}
							onKeyPress={this.handleKeyPress}
							type="text"
							placeholder="ux design, development"
							value={input}
							/>
						<button onClick={this.handleAddProject} className="ui button">
							<i className="icon tasks"></i>Add Project
						</button>
					</div>
				</div>
				<div className="ui right floated segment">
					<div className="ui statistic">
						<div className="value">{total}</div>
						<div className="label">Total Project{total > 0 ? 's' : ''}</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Header;
