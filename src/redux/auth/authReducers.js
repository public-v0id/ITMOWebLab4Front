const INITIAL_STATE = {
	login: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case "SET_LOGIN":
			return {
				...state,
				login: action.payload,
			};
		default:
			return state;
	};
}

export default authReducer;
