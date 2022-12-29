/** 
*   DOCU: Get random id.
*   Triggered by src/views/wall/wall.jsx
*   Last updated at: December 29, 2022
*   @returns {string} random generated id
*   @author Alfonso Martin Angeles
*/
export const getId = () => {
	return `id${Date.now() + Math.random().toString(16).slice(2)}`;
};

/** 
*   DOCU: Toggle the selected modal.
*   Triggered by src/views/wall/wall.jsx
*   Last updated at: December 29, 2022
*   @param {string} modal_name name of the modal to be toggled. 
*   @param {string} modal_state state of the modal to be toggled.
*	@returns {object} {modal name: modal state}
*   @author Alfonso Martin Angeles
*/
export const toggleShowModal = (modal_name, modal_state) => {
	return {[modal_name]: modal_state};
}
