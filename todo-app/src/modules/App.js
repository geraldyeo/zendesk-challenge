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

	render() {
		const {todos} = this.state;
		return (
			<div className="App ui grid">
				<Header total={todos.length} onAddProject={this.handleAddProject}/>
				<Content todos={todos}/>
			</div>
		);
	}
}

export default App;
