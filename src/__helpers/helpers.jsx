export const getId = () => {
	return `id${Date.now() + Math.random().toString(16).slice(2)}`;
};

export const toggleShowModal = (modal_name, modal_state) => {
	return {[modal_name]: modal_state};
}