import React, {Component, PropTypes} from 'react';
import dragula from 'react-dragula';
import Todos from './Todos';
import './Content.css';

class Content extends Component {
	static propTypes = {
		todos: PropTypes.array
	};

	static defaultProps = {
		todos: []
	};

	setDragulaRef = ref => {
		return c => {
			this[ref] = c;
		};
	};

	componentDidMount() {
		dragula([
			this.todosNew.drakeContainer,
			this.todosWip.drakeContainer,
			this.todosDone.drakeContainer
		]);
	}

	render() {
		const {todos} = this.props;
		return (
			<div className="App-content sixteen wide column">
				<div className="ui three column grid">
					<div className="column">
						<Todos
							ref={this.setDragulaRef('todosNew')}
							title="To Do"
							todos={todos.filter(todo => todo.state === 'new')}
							/>
					</div>
					<div className="column">
						<Todos
							ref={this.setDragulaRef('todosWip')}
							title="In Progress"
							todos={todos.filter(todo => todo.state === 'wip')}
							/>
					</div>
					<div className="column">
						<Todos
							ref={this.setDragulaRef('todosDone')}
							title="Done"
							todos={todos.filter(todo => todo.state === 'done')}
							/>
					</div>
				</div>
			</div>
		);
	}
}

export default Content;
