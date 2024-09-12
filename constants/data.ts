import type { ITask } from './interfaces';

export const usersNames = ['Ivan', 'Petro', 'Oksana', 'Galya'];

export enum statuses {
	TODO = 'TODO',
	PROGRESS = 'Progress',
	DONE = 'Done',
}

export enum priorities {
	LOW = '1',
	MIDDLE = '2',
	HIGHT = '3',
}

export const fakeTasks: ITask[] = [
	{
		id: '1',
		title: 'Create board',
		description: 'The board should be simple and convenient',
		responsible: 'Ivan',
		performers: ['Petro', 'Oksana'],
		status: statuses.TODO,
		priority: priorities.LOW,
	},
	{
		id: '2',
		title: 'Make guard',
		description: 'The board should be simple and convenient',
		responsible: 'Oksana',
		performers: ['Petro', 'Galya', 'Ivan'],
		status: statuses.PROGRESS,
		priority: priorities.HIGHT,
	},
];
