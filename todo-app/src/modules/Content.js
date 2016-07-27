import React, {Component} from 'react';
import dragula from 'react-dragula';
import Todos from './Todos';
import './Content.css';

class Content extends Component {
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
		return (
			<div className="App-content sixteen wide column">
				<div className="ui three column grid">
					<div className="column"><Todos ref={this.setDragulaRef('todosNew')} title="To Do"/></div>
					<div className="column"><Todos ref={this.setDragulaRef('todosWip')} title="In Progress"/></div>
					<div className="column"><Todos ref={this.setDragulaRef('todosDone')} title="Done"/></div>
				</div>
			</div>
		);
	}
}

export default Content;
