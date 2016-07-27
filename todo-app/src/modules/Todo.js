import React, {Component, PropTypes} from 'react';
import './Todo.css';

class Todo extends Component {
	static propTypes = {
		title: PropTypes.string
	};

	static defaultProps = {
		title: ''
	}

	render() {
		const {title} = this.props;
		return (
			<div className="todo item">
				<div className="content">
					<div className="header">{title}</div>
				</div>
			</div>
		);
	}
}

export default Todo;
