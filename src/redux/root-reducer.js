import { combineReducers } from "redux";
    import authReducer from "./auth/authReducers";
import scrsizeReducer from "./scrsize/ssizeReducers";

    const rootReducer = combineReducers({
      authReducer,
	scrsizeReducer,
    });

    export default rootReducer;
