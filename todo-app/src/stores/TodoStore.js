import {extendObservable, computed, autorun} from 'mobx';
import TodoModel from '../models/TodoModel';

export default class TodoStore {
	constructor() {
		extendObservable(this, {
			todos: []
		});
	}
}
