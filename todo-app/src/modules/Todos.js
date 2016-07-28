import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import Todo from './Todo';
import './Todos.css';

class Todos extends Component {
	static propTypes = {
		title: PropTypes.string,
		color: PropTypes.string,
		todos: PropTypes.array
	};

	static defaultProps = {
		title: '',
		color: '',
		todos: []
	}

	setDragulaRef = c => {
		this.drakeContainer = c;
	};

	render() {
		const {title, color, todos} = this.props;
		return (
			<div className="todos ui segments">
				<div className="header ui clearing segment">
					<div className="ui left floated basic segment">
						{title}
					</div>
					<div className={cx('ui right floated segment', color)}>
						<div className="ui tiny horizontal statistic">
							<div className="value">{todos.length}</div>
							<div className="label">Project{todos.length > 0 ? 's' : ''}</div>
						</div>
					</div>
				</div>
				<div className="content ui segment">
					<div
						ref={this.setDragulaRef}
						className={cx('ui huge divided list', title.toLowerCase().replace(' ', '-'))}
						>
						{todos.map(todo => <Todo key={todo.id} uuid={todo.id} title={todo.title}/>)}
					</div>
				</div>
			</div>
		);
	}
}

export default Todos;
