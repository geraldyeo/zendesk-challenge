import React, {Component, PropTypes} from 'react';
import Header from './Header';
import Content from './Content';
import './App.css';

function reducer(state = {todos: []}, action) {
	const {todos} = state;
	switch (action.type) {
		case 'ADD_TODO': {
			const {id, title, state} = action.payload;
			return {
				...state,
				todos: [
					{id, title, state},
					...todos
				]
			};
		}
		case 'MOVE_TODO': {
			const {todoId, state} = action.payload;
			return {
				...state,
				todos: todos.map(todo => {
					if (todo.id === todoId) {
						return {
							...todo,
							state
						};
					}
					return todo;
				})
			};
		}
		case 'SORT_TODO': {
			const {ids, state} = action.payload;
			return {
				...state,
				todos: [
					...ids.map(todoId => todos.find(todo => todo.id === todoId)),
					...todos.filter(todo => todo.state !== state)
				]
			};
		}
		default:
			return state;
	}
}

class App extends Component {
	static propTypes = {
		todos: PropTypes.array
	};

	static defaultProps = {
		todos: []
	};

	constructor(props) {
		super(props);
		this.state = reducer({todos: [...this.props.todos]}, {type: 'INIT'});
	}

	handleAddProject = action => {
		this.setState(reducer(this.state, action));
	}

	handleDrop = action => {
		this.setState(reducer(this.state, action));
	};

	render() {
		const {todos} = this.state;
		return (
			<div className="App ui grid">
				<Header total={todos.length} onAddProject={this.handleAddProject}/>
				<Content todos={todos} onAcceptDrop={this.handleDrop}/>
			</div>
		);
	}
}

export default App;
