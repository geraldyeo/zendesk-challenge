import React, {Component, PropTypes} from 'react';
import uuid from 'node-uuid';
import Header from './Header';
import Content from './Content';
import './App.css';

class App extends Component {
	static propTypes = {
		todos: PropTypes.array
	};

	static defaultProps = {
		todos: []
	};

	constructor(props) {
		super(props);
		this.state = {
			todos: [...this.props.todos]
		};
	}

	handleAddProject = title => {
		this.setState({
			todos: [
				{
					id: uuid.v1(),
					title,
					state: 'new'
				},
				...this.state.todos
			]
		});
	}

	handleDrop = ({ids, uuid, status}) => {
		const todos = [...this.state.todos];

		if (ids) {
			const matches = todos.filter(todo => todo.state === status);
			const nonmatches = todos.filter(todo => todo.state !== status);
			const sorted = ids.map(uuid => matches.find(match => match.id === uuid));
			this.setState({
				todos: [
					...sorted,
					...nonmatches
				]
			});
		} else {
			const i = todos.find(todo => todo.id === uuid);
			if (i) {
				i.state = status;
				this.setState({
					todos: [...todos]
				});
			}
		}
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
