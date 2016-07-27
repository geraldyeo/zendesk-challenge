import React, {Component, PropTypes} from 'react';
import './Header.css';

class Header extends Component {
	static propTypes = {
		totalProjects: PropTypes.number
	};

	render() {
		const {totalProjects} = this.props;
		return (
			<div className="App-header sixteen wide column">
				<div className="ui left floated segment">
					<div className="ui right labeled input">
						<input type="text" placeholder="UX design"/>
						<a className="ui tag label">Add Project</a>
					</div>
				</div>
				<div className="ui right floated segment">
					<div className="ui statistic">
						<div className="value">{totalProjects}</div>
						<div className="label">Total Projects</div>
					</div>
				</div>

			</div>
		);
	}
}

export default Header;
