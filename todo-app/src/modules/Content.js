import React, {Component, PropTypes} from 'react';
import dragula from 'react-dragula';
import Todos from './Todos';
import './Content.css';

class Content extends Component {
	static propTypes = {
		todos: PropTypes.array,
		onAcceptDrop: PropTypes.func
	};

	static defaultProps = {
		todos: [],
		onAcceptDrop: () => {}
	};

	setDragulaRef = ref => {
		return c => {
			this[ref] = c;
		};
	};

	componentDidMount() {
		const {onAcceptDrop} = this.props;

		dragula([
			this.todosNew.drakeContainer,
			this.todosWip.drakeContainer,
			this.todosDone.drakeContainer
		], {
			accepts: (el, target, source, sibling) => {
				const uuid = el.getAttribute('data-uuid');
				if (sibling) {
					return true;
				}
				if (target.matches('.list.to-do')) {
					onAcceptDrop(uuid, 'new');
				} else if (target.matches('.list.in-progress')) {
					onAcceptDrop(uuid, 'wip');
				} else if (target.matches('.list.done')) {
					onAcceptDrop(uuid, 'done');
				}
				return false;
			}
		});
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
