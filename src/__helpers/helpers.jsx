export const getId = () => {
	return `id${Date.now() + Math.random().toString(16).slice(2)}`;
};
