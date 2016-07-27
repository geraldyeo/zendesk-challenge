import {extendObservable} from 'mobx';

export default class TodoModel {
	constructor({store, id, title, done}) {
		this.store = store;
		this.id = id;
		extendObservable(this, {
			title,
			done
		});
	}

	static createTodo({store, id, title, done}) {
		return new TodoModel({store, id, title, done});
	}

	destroy() {
		this.store.todos.remove(this);
	}

	toggle() {
		this.done = !this.done;
	}

	updateTitle(title) {
		this.title = title;
	}

	serialize() {
		return {
			id: this.id,
			title: this.title,
			done: this.done
		};
	}
}
