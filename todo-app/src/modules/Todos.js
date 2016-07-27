import React, {Component, PropTypes} from 'react';
import cx from 'classnames';
import Todo from './Todo';
import './Todos.css';

class Todos extends Component {
	static propTypes = {
		title: PropTypes.string,
		todos: PropTypes.array
	};

	static defaultProps = {
		title: '',
		todos: []
	}

	setDragulaRef = c => {
		this.drakeContainer = c;
	};

	render() {
		const {title, todos} = this.props;
		return (
			<div className="todos ui segments">
				<div className="header ui clearing segment">
					<div className="ui left floated basic segment">
						{title}
					</div>
					<div className="ui right floated segment">
						<div className="ui mini statistic">
							<div className="value">{todos.length}</div>
							<div className="label">Projects</div>
						</div>
					</div>
				</div>
				<div className="content ui segment">
					<div
						ref={this.setDragulaRef}
						className={cx('ui large divided list', title.toLowerCase().replace(' ', '-'))}
						>
						{todos.map(todo => <Todo key={todo.id} uuid={todo.id} title={todo.title}/>)}
					</div>
				</div>
			</div>
		);
	}
}

export default Todos;
