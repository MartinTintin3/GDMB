export const timestampToDateOnly = (date: Date): string => {
	return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`;
};