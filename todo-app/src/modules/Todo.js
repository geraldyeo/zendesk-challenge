import React, {Component, PropTypes} from 'react';
import './Todo.css';

class Todo extends Component {
	static propTypes = {
		uuid: PropTypes.string,
		title: PropTypes.string
	};

	static defaultProps = {
		uuid: '',
		title: ''
	}

	render() {
		const {title, uuid} = this.props;
		return (
			<div className="todo item" data-uuid={uuid}>
				<div className="content">
					<div className="header">{title}</div>
				</div>
			</div>
		);
	}
}

export default Todo;
