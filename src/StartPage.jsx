import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import setLogin from './redux/auth/authActions.js'; 
import setScrSize from './redux/scrsize/ssizeActions.js';

const StartPage = (props) => {
	const dispatch = useDispatch(); // Хук для вызова действий
	const login = useSelector((state) => state.authReducer.login);
	const screenSize = useSelector((state) => state.scrsizeReducer.screenSize);
        const [password, setPassword] = useState('');
        const signinUrl = "/ITMOWebLab4-1/api/index/signIn";
        const registerUrl = "/ITMOWebLab4-1/api/index/register";
	const handleLoginChange = (val) => {
		dispatch(setLogin(val));
	};
	function getSize() {
		const width = window.innerWidth;
		if (width >= 1174) {
			return "desktop";
		}
		if (width >= 862) {
			return "tablet";
		}
		return "mobile";
	}
	useEffect(() => {
		const handleResize = () => {
			const sz = getSize();
			dispatch(setScrSize(sz));
			console.log("called resize |" + sz + "| |" + screenSize + "|");
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, []);
        return (
        <form style={{
        display: 'flex',            // Используем Flexbox
        flexDirection: 'column',    // Располагаем элементы вертикально
        alignItems: 'center',       // Центрируем элементы по горизонтали
        justifyContent: 'center',   // Центрируем элементы по вертикали
        height: '100vh',            // Контейнер занимает 100% высоты окна
    }}>
		<p>Логин</p>
                <Input type='text' name='login' required value={login} onChange={handleLoginChange}/>
		<p>Пароль</p>
		<Input type='text' type="password" name='password' required value={password} onChange={(e) => setPassword(e)}/>
		<div style={{flexDirection: 'row'}}>
		<Button onClick={(e) => {
                        e.preventDefault();
                        const res = axios.get(signinUrl, {params: { login, password }}, {headers: {
                                'content-type': 'application/json'
                        }}).then((resp) => {
                                console.log(resp.data);
                                if (resp.data === "Signed in successfully!") {
                                        props.history.push({
						pathname: '/Main'});
                                }
				else {
					alert(resp.data);
				}
                        }).catch(error => {
				if (error.response) {
                                	alert(error.response.data);
				}
                        });
                }}>
                Sign in
                </Button>
                <Button onClick={(e) => {
                        e.preventDefault();
                        const res = axios.post(registerUrl, { login, password}, {headers: {
                                'content-type': 'application/json'
                        }}).then((resp) => {
                                console.log(resp.data);
				if (resp.data === "User registered!") {
                                        props.history.push({
						pathname: '/Main'});
                                }
                        }).catch(error => {
				if (error.response) {
                                	alert(error.response.data);
				}
                        });
                }}>
                Register
                </Button>
		</div>
        </form>);

};

export default StartPage;
