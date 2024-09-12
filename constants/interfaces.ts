import { priorities, statuses } from './data';

export interface ITask {
	id: string;
	title: string;
	description: string;
	responsible: string;
	performers: string[];
	status: statuses;
	priority: priorities;
}
