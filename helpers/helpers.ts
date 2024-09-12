import type { ITask } from '~/constants/interfaces';

export const sortTasksByPriority = (list: ITask[]): void => {
	list.sort((a, b) => a.priority - b.priority);
};
