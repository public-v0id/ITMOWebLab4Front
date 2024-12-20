const INITIAL_STATE = {
	screenSize: "",
};

const scrsizeReducer = (state = INITIAL_STATE, action) => {
	console.log("Payload is " + action.payload);
	switch (action.type) {
                case "SET_SCRSIZE":
                        const newState = {
                                ...state,
                                screenSize: action.payload,
                        };
			console.log(newState);
			return newState;
                default:
                        return state;
	}
}

export default scrsizeReducer;
