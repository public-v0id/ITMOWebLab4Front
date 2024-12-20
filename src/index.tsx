import "./index.css"
import {createStore} from "redux";
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import ReactDOM from "react-dom"
import StartPage from "./StartPage.jsx"
import MainPage from "./MainPage.jsx"
import { Provider } from "react-redux";
import rootReducer from './redux/root-reducer';

const store = createStore(rootReducer);

function App() {
	return (
		<Provider store={store}>
		<Router>
			<div>
				<Route
					exact path="/"
					exact component={StartPage}
				/>
				<Route
					exact path="/Main"
					exact component={MainPage}
				/>
			</div>
		</Router>
		</Provider>
	);
}

ReactDOM.render(<App/>, document.getElementById('root'));
