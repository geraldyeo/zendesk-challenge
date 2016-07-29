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
		const containers = [
			this.todosNew.drakeContainer,
			this.todosWip.drakeContainer,
			this.todosDone.drakeContainer
		];

		const drake = dragula(containers, {
			delay: 200,
			moves: (el, container, handle) => {
				return handle.matches('.vertical.ellipsis');
			}
		});

		drake.on('drop', (el, target, source, sibling) => {
			const action = {type: '', payload: {}};
			const dragWithin = target === source;
			const items = target.querySelectorAll('.item');
			drake.cancel(true);
			// update state of todo
			if (target.matches('.list.to-do')) {
				action.payload.state = 'new';
			} else if (target.matches('.list.in-progress')) {
				action.payload.state = 'wip';
			} else if (target.matches('.list.done')) {
				action.payload.state = 'done';
			}
			if (dragWithin) {
				// sort order
				const ids = [];
				let item;
				let i;
				for (i = 0; i < items.length; i++) {
					item = items[i];
					ids.push(item.getAttribute('data-uuid'));
				}
				action.type = 'SORT_TODO';
				action.payload.ids = ids;
			} else {
				// move between columns
				action.type = 'MOVE_TODO';
				action.payload.todoId = el.getAttribute('data-uuid');
			}
			// exec
			onAcceptDrop(action);
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
							color="red"
							todos={todos.filter(todo => todo.state === 'new')}
							/>
					</div>
					<div className="column">
						<Todos
							ref={this.setDragulaRef('todosWip')}
							title="In Progress"
							color="orange"
							todos={todos.filter(todo => todo.state === 'wip')}
							/>
					</div>
					<div className="column">
						<Todos
							ref={this.setDragulaRef('todosDone')}
							title="Done"
							color="green"
							todos={todos.filter(todo => todo.state === 'done')}
							/>
					</div>
				</div>
			</div>
		);
	}
}

export default Content;
