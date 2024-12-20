import React, { useEffect, useState, useRef} from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import axios from 'axios';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Layout from 'react-toolbox/lib/layout';
import Checkbox from 'react-toolbox/lib/checkbox';
import Input from 'react-toolbox/lib/input';
import Button from 'react-toolbox/lib/button';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {		
	const graph = useRef(null);
	const [context, setContext] = useState(null);
	let margin = 15;
	const login = useSelector((state) => state.authReducer.login);
	const scrSize = useSelector((state) => state.scrsizeReducer.screenSize);
	const checkUrl = "/ITMOWebLab4-1/api/main/check";
	const getTableUrl = "/ITMOWebLab4-1/api/main/getTable";
	console.log(login);
	const [resTable, setResTable] = useState(null);
	const [loading, setLoading] = useState(true);
	const [r, setR] = useState(-4);
	const rRef = useRef(r);
	function drawPoint(x, y, r, hit) {
	    let xVal = parseFloat(x)/parseFloat(r);
	    let yVal = parseFloat(y)/parseFloat(r);
	    let grX = graph.current.width*(1/2 + xVal / 3);
	    let grY = graph.current.height*(1/2 - yVal / 3);
	    console.log("DRAWING ON " + grX + " " + grY);
	    context.fillStyle = hit ? "green" : "red";
	    context.beginPath();
	    context.arc(grX, grY, 5, 0, Math.PI * 2);
	    context.fill();
	}
	useEffect(() => {
		const getData = async () => { const resp = axios.get(getTableUrl, {params: {login}}, {headers: {
			                	                'content-type': 'application/json'
							}}).then((resp) => {
				                                console.log(resp.data);
								setResTable(resp.data);	
							}).catch(error => {
				                                console.error(error);
				                        }).finally(() => {
								setLoading(false);
							});
		}
		getData();	
	}, [login]);	
	const graphFullDraw = () => {
		if (!loading && graph != null && graph.current != null) {
			margin = 15;
	function drawAxis(context, fromX, fromY, toX, toY) {
	    const headLength = 10;
	    const angle = Math.atan2(toY - fromY, toX - fromX);

	    context.beginPath();
	    context.moveTo(fromX, fromY);
	    context.lineTo(toX, toY);
	    context.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
	    context.moveTo(toX, toY);
	    context.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
	    context.stroke();
	}
	const drawGraph = () => {
	    let width = graph.current.width;
	    let height = graph.current.height;
		context.clearRect(0, 0, width, height);
	    console.log("w: " + width + " h: " + height);
	    context.clearRect(0, 0, width, height);
	    context.font = "14px Arial";
	    context.strokeStyle = "black";
	    context.lineWidth = 1;
	    context.beginPath();
	    drawAxis(context, margin, height/2, width-margin, height/2);
	    drawAxis(context, width/2, height-margin, width/2, margin);
	    context.fillStyle = "#0000FF10"; // blue with 10% opacity
	    context.beginPath();
	    context.moveTo(width / 2, height / 2);
	    context.lineTo(width / 3, height / 2);
	    context.lineTo(width / 2, height / 3);
	    context.closePath();
	    context.fill();
	    context.strokeStyle = "#0000FF";
	    context.stroke();
	    context.fillStyle = "#FFFF0010"; // yellow with 10% opacity
	    context.fillRect(width / 2, height / 3, width/3, height/6);
	    context.strokeStyle = "#FFFF00";
	    context.fillRect(width / 2, height / 3, width/3, height/6);
	    context.fillStyle = "#39FF1410"; // green with 10% opacity
	    context.beginPath();
	    context.arc(width / 2, height / 2, height/6, -1.5*Math.PI, -Math.PI);
	    context.lineTo(width / 2, height / 2);
	    context.closePath();
	    context.fill();
	    context.strokeStyle = "#39FF14";
	    context.beginPath();
	    context.arc(width / 2, height / 2, height/6, -1.5*Math.PI, -Math.PI);
	    context.stroke();
	    context.fillStyle = "white";
	    const labelR = "R";
	    const labelRHalf = "R/2";
	    context.fillText(labelR, width / 2 + 100 - 5, height / 2 + 15);
	    context.fillText(labelRHalf, width / 2 + 50 - 12, height / 2 + 15);
	    context.fillText('-' + labelR, width / 2 - 100 - 10, height / 2 + 15);
	    context.fillText('-' + labelRHalf, width / 2 - 50 - 15, height / 2 + 15);
	    context.fillText(labelR, width / 2 + 10, height / 2 - 100 + 5);
	    context.fillText(labelRHalf, width / 2 + 10, height / 2 - 50 + 5);
	    context.fillText('-' + labelR, width / 2 + 10, height / 2 + 100 + 5);
	    context.fillText('-' + labelRHalf, width / 2 + 10, height / 2 + 50 + 5);
	    context.fillStyle = "white";
	    context.strokeStyle = "#000000";
	    const tickLength = 10; // Length of the tick marks
	    for (let tickValue = -2; tickValue <= 2; tickValue++) {
	        const xTickPosition = width / 2 + tickValue * 50;
        	context.beginPath();
	        context.moveTo(xTickPosition, height / 2 - tickLength / 2);
        	context.lineTo(xTickPosition, height / 2 + tickLength / 2);
	        context.stroke();
	    }
	    for (let tickValue = -2; tickValue <= 2; tickValue++) {
	        const yTickPosition = height / 2 - tickValue * 50;
        	context.beginPath();
	        context.moveTo(width / 2 - tickLength / 2, yTickPosition);
        	context.lineTo(width / 2 + tickLength / 2, yTickPosition);
	        context.stroke();
	    }
	}
		drawGraph();
		resTable.forEach((res) => {
									if (res.r == r) {
										console.log("Drawing " + res.x + " " + res.y + " " + res.res);
										drawPoint(res.x, res.y, res.r, res.res);
									}
								})
		}
		console.log(graph.current);
	};
	useEffect(() => {
		if (graph.current != null) {
			setContext(graph.current.getContext('2d'));	
		}
	}, [loading]);
	useEffect(() => {
		if (context != null) {
			graphFullDraw();
			graph.current.addEventListener('click', (event) => {
				console.log("Clicked with r " + rRef.current);
				if (rRef.current == -4) {
					alert("No R selected!");
					return;	
				}
				let clickX = event.clientX - graph.current.getBoundingClientRect().left;
				let clickY = event.clientY - graph.current.getBoundingClientRect().top;
				let xSize = graph.current.width;
				let ySize = graph.current.height;
				console.log("clicked! On " + clickX + " " + clickY);
				console.log("X " + graph.current.getBoundingClientRect().left + " Y " + graph.current.getBoundingClientRect().top);
				console.log("PageX " + event.pageX + " PageY " + event.pageY);
				const x = (Math.round((clickX-xSize/2)*parseFloat(rRef.current)*3000000/xSize)/1000000.0);
				const y = (Math.round((ySize/2-clickY)*parseFloat(rRef.current)*3000000/ySize)/1000000.0);
				console.log(x, y, rRef.current);
				const res = axios.post(checkUrl, { x, y, r:rRef.current, login }, {headers: {
					                                'content-type': 'application/json'
								}}).then((resp) => {
					                                console.log(resp.data);
									setResTable(prevTable => [...prevTable, resp.data]);
									console.log("Context is " + context);
									if (context != null) {
										drawPoint(resp.data.x, resp.data.y, resp.data.r, resp.data.res);
									}
									console.log(resTable);
								}).catch(error => {
					                                console.error(error);
					                        });
			});
		}
	}, [context]);
	console.log(resTable);
	const [xCheck, setXCheck] = useState(new Array(9).fill(false));
	function newX(num) {
		let newX = [...xCheck];
		newX[num] = !newX[num];
		for (let i = 0; i < newX.length; i++) {
			if (i !== num) {
				newX[i] = false;
			}
		}
		return newX;
	}
	const [rCheck, setRCheck] = useState(new Array(9).fill(false));
	function newR(num) {
		let newR = [...rCheck];	
		newR[num] = !newR[num];
		console.log("newR is " + newR[num]);
		if (newR[num] === true) {
			setR(num-3);
		}
		else {
			setR(-4);
		}	
		for (let i = 0; i < newR.length; i++) {
			if (i !== num) {
				newR[i] = false;
			}
		}	
		return newR;
	}
	useEffect(() => { 
		rRef.current = r;
		if (r != -4) {
			graphFullDraw();
		}
		console.log("R is " + r);
	}, [r]);
	const [yVal, setYVal] = useState("0");	
	if (loading) return <div>Loading...</div>;
	switch (scrSize) {
		case "desktop":
		        return (
		<Layout>
			<table className="table">
			<tbody>
			<tr>
				<td colSpan="3">
					<h1 className = "header">Игнатов Петр Дмитриевич, P3216, вариант 89125</h1>
				</td>
			</tr>
			<tr className="inp">    
				<td className="expandable">
                		<h3 className = "header">X:</h3>
				<div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: "center" }} classname="header">
					{xCheck.map((val, index) =>
					<Checkbox
						key= {"x"+index}
						checked={xCheck[index]}
						label={index === 3 ? "0" : -3+index }
						onChange = {() => {setXCheck(newX(index))}} 
				        />)}
				</div>
            	</td>
				<td className="expandable">
                	<form>
                		<h3 className = "header">Y:</h3>
				<Input className="header" type="number" required value={yVal} onChange={(e) => setYVal(e)}/>
                	</form>
                </td>
				<td className="expandable">
					<div className = "header">
			                        <canvas id="graph" width="300" height="300" ref={graph}>
						</canvas>
					</div>
				</td>
			</tr>
		<tr className="inp">
				<td className="expandable" style={{verticalAlign:"top"}}>
	 	           		<Button 
						className = "center" 
						id = "btn"
						onClick = {() => {
								let x = -4;
								for (let i = 0; i < xCheck.length; i++) {
									if (xCheck[i]) {
										x = i-3;
									}
								}
								if (x === -4) {
									alert("No X selected!");
									return;
								}
								if (!yVal || Number(yVal) < -5 || Number(yVal) > 3) {
									alert("Invalid Y!");
									return;
								}
								let y = Number(yVal);
								if (r === -4) {
									alert("No R selected!");
									return;
								}
								const res = axios.post(checkUrl, { x, y, r, login }, {headers: {
					                                'content-type': 'application/json'
								}}).then((resp) => {
					                                console.log(resp.data);
									setResTable(prevTable => [...prevTable, resp.data]);
									console.log("Context is " + context);
									drawPoint(resp.data.x, resp.data.y, resp.data.r, resp.data.res);
									console.log(resTable);
								}).catch(error => {
					                                console.error(error);
					                        });}}
					>Проверить</Button>
            			</td>
			    <td className="expandable" style={{verticalAlign:"top"}}>
                		<h3 className = "header">R:</h3>
				<div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: "center" }}>
                			{rCheck.map((val, index) =>
					<Checkbox
						disabled={index<4}
						key= {"r"+index}
						checked={rCheck[index]}
						label={index === 3 ? "0" : -3+index }
						onChange = {() => {setRCheck(newR(index))}} 
				        />)}
				</div>
                </td>
				<td className="expandable" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
					<h3 className = "header">Предыдущие данные</h3>
					<table id="prevData" border="1">
						<thead>
							<tr>
								<th><h5>X</h5></th>
								<th><h5>Y</h5></th>
								<th><h5>R</h5></th>
								<th><h5>Ответ</h5></th>
								<th><h5>Время выполнения</h5></th>
								<th><h5>Время</h5></th>
							</tr>
						</thead>
						<tbody>
							{
								resTable != null && resTable != undefined && resTable.map((res, i) => {
							      console.log(res); // вывод в консоль
							      return (
								<tr key={i}>
							              <td>{res.x}</td>
							              <td>{res.y}</td>
							              <td>{res.r}</td>
								      <td>{res.res.toString()}</td>
								      <td>{res.exTime}</td>
								      <td>{res.servTime}</td>
							          </tr>
							      );
							})}
						</tbody>
					</table>
				</td>
			</tr>
			</tbody>
			</table>
			<div className="header">
				<Link to="/">Перейти на стартовую страницу</Link>
			</div>
			<h6 className="header">г. Санкт-Петербург, НИУ "ИТМО", Факультет Программной Инженерии и Компьютерных Технологий, 2024 г.</h6>
		</Layout>
	);
		case "tablet":
		        return (
		<Layout>
			<table className="table">
			<tbody>
			<tr>
				<td colSpan="2">
					<h1 className = "header">Игнатов Петр Дмитриевич, P3216, вариант 89125</h1>
				</td>
			</tr>
			<tr className="inp">    
				<td className="expandable">
                		<h3 className = "header">X:</h3>
				<div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: "center" }} classname="header">
					{xCheck.map((val, index) =>
					<Checkbox
						key= {"x"+index}
						checked={xCheck[index]}
						label={index === 3 ? "0" : -3+index }
						onChange = {() => {setXCheck(newX(index))}} 
				        />)}
				</div>
		            	</td>
				<td className="expandable">
                	<form>
                		<h3 className = "header">Y:</h3>
				<Input className="header" type="number" required value={yVal} onChange={(e) => setYVal(e)}/>
                	</form>
                </td>
				</tr>
				<tr className="inp">	
			    <td className="expandable" style={{verticalAlign:"top"}}>
                		<h3 className = "header">R:</h3>
				<div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: "center" }}>
                			{rCheck.map((val, index) =>
					<Checkbox
						disabled={index<4}
						key= {"r"+index}
						checked={rCheck[index]}
						label={index === 3 ? "0" : -3+index }
						onChange = {() => {setRCheck(newR(index))}} 
				        />)}
				</div>
                </td>
				<td className="expandable" style={{verticalAlign:"top"}}>
	 	           		<Button 
						className = "center" 
						id = "btn"
						onClick = {() => {
								let x = -4;
								for (let i = 0; i < xCheck.length; i++) {
									if (xCheck[i]) {
										x = i-3;
									}
								}
								if (x === -4) {
									alert("No X selected!");
									return;
								}
								if (!yVal || Number(yVal) < -5 || Number(yVal) > 3) {
									alert("Invalid Y!");
									return;
								}
								let y = Number(yVal);
								if (r === -4) {
									alert("No R selected!");
									return;
								}
								const res = axios.post(checkUrl, { x, y, r, login }, {headers: {
					                                'content-type': 'application/json'
								}}).then((resp) => {
					                                console.log(resp.data);
									setResTable(prevTable => [...prevTable, resp.data]);
									console.log("Context is " + context);
									drawPoint(resp.data.x, resp.data.y, resp.data.r, resp.data.res);
									console.log(resTable);
								}).catch(error => {
					                                console.error(error);
					                        });}}
					>Проверить</Button>
            			</td>
				</tr>
				<tr>
				<td className="expandable" style={{verticalAlign:"top"}}>
					<div className = "header">
			                        <canvas id="graph" width="300" height="300" ref={graph}>
						</canvas>
					</div>
				</td>
				<td className="expandable" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
					<h3 className = "header">Предыдущие данные</h3>
					<table id="prevData" border="1">
						<thead>
							<tr>
								<th><h5>X</h5></th>
								<th><h5>Y</h5></th>
								<th><h5>R</h5></th>
								<th><h5>Ответ</h5></th>
								<th><h5>Время выполнения</h5></th>
								<th><h5>Время</h5></th>
							</tr>
						</thead>
						<tbody>
							{
								resTable != null && resTable != undefined && resTable.map((res, i) => {
							      console.log(res); // вывод в консоль
							      return (
								<tr key={i}>
							              <td>{res.x}</td>
							              <td>{res.y}</td>
							              <td>{res.r}</td>
								      <td>{res.res.toString()}</td>
								      <td>{res.exTime}</td>
								      <td>{res.servTime}</td>
							          </tr>
							      );
							})}
						</tbody>
					</table>
				</td>
			</tr>
			</tbody>
			</table>
			<div className="header">
				<Link to="/">Перейти на стартовую страницу</Link>
			</div>
			<h6 className="header">г. Санкт-Петербург, НИУ "ИТМО", Факультет Программной Инженерии и Компьютерных Технологий, 2024 г.</h6>
		</Layout>
	);
	case "mobile":
		        return (
		<Layout>
			<table className="table">
			<tbody>
			<tr>
				<td>
					<h1 className = "header">Игнатов Петр Дмитриевич, P3216, вариант 89125</h1>
				</td>
			</tr>
			<tr className="inp">    
				<td className="expandable">
                		<h3 className = "header">X:</h3>
				<div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: "center" }} classname="header">
					{xCheck.map((val, index) =>
					<Checkbox
						key= {"x"+index}
						checked={xCheck[index]}
						label={index === 3 ? "0" : -3+index }
						onChange = {() => {setXCheck(newX(index))}} 
				        />)}
				</div>
		            	</td>
				</tr>
				<tr className="inp">
				<td className="expandable">
                	<form>
                		<h3 className = "header">Y:</h3>
				<Input className="header" type="number" required value={yVal} onChange={(e) => setYVal(e)}/>
                	</form>
                </td>
				</tr>
				<tr className="inp">	
			    <td className="expandable" style={{verticalAlign:"top"}}>
                		<h3 className = "header">R:</h3>
				<div style={{ display: 'flex', gap: '10px', alignItems: 'center', justifyContent: "center" }}>
                			{rCheck.map((val, index) =>
					<Checkbox
						disabled={index<4}
						key= {"r"+index}
						checked={rCheck[index]}
						label={index === 3 ? "0" : -3+index }
						onChange = {() => {setRCheck(newR(index))}} 
				        />)}
				</div>
                </td>
				</tr>
				<tr className="inp">
				<td className="expandable" style={{verticalAlign:"top"}}>
	 	           		<Button 
						className = "center" 
						id = "btn"
						onClick = {() => {
								let x = -4;
								for (let i = 0; i < xCheck.length; i++) {
									if (xCheck[i]) {
										x = i-3;
									}
								}
								if (x === -4) {
									alert("No X selected!");
									return;
								}
								if (!yVal || Number(yVal) < -5 || Number(yVal) > 3) {
									alert("Invalid Y!");
									return;
								}
								let y = Number(yVal);
								if (r === -4) {
									alert("No R selected!");
									return;
								}
								const res = axios.post(checkUrl, { x, y, r, login }, {headers: {
					                                'content-type': 'application/json'
								}}).then((resp) => {
					                                console.log(resp.data);
									setResTable(prevTable => [...prevTable, resp.data]);
									console.log("Context is " + context);
									drawPoint(resp.data.x, resp.data.y, resp.data.r, resp.data.res);
									console.log(resTable);
								}).catch(error => {
					                                console.error(error);
					                        });}}
					>Проверить</Button>
            			</td>
				</tr>
				<tr>
				<td className="expandable">
					<div className = "header">
			                        <canvas id="graph" width="300" height="300" ref={graph}>
						</canvas>
					</div>
				</td>
				</tr>
				<tr>
				<td className="expandable" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
					<h3 className = "header">Предыдущие данные</h3>
					<table id="prevData" border="1">
						<thead>
							<tr>
								<th><h5>X</h5></th>
								<th><h5>Y</h5></th>
								<th><h5>R</h5></th>
								<th><h5>Ответ</h5></th>
								<th><h5>Время выполнения</h5></th>
								<th><h5>Время</h5></th>
							</tr>
						</thead>
						<tbody>
							{
								resTable != null && resTable != undefined && resTable.map((res, i) => {
							      console.log(res); // вывод в консоль
							      return (
								<tr key={i}>
							              <td>{res.x}</td>
							              <td>{res.y}</td>
							              <td>{res.r}</td>
								      <td>{res.res.toString()}</td>
								      <td>{res.exTime}</td>
								      <td>{res.servTime}</td>
							          </tr>
							      );
							})}
						</tbody>
					</table>
				</td>
			</tr>
			</tbody>
			</table>
			<div className="header">
				<Link to="/">Перейти на стартовую страницу</Link>
			</div>
			<h6 className="header">г. Санкт-Петербург, НИУ "ИТМО", Факультет Программной Инженерии и Компьютерных Технологий, 2024 г.</h6>
		</Layout>
	);
		default:
			return (
				<h1>Неизвестный тип устройства!</h1>
			);
	}
}

export default MainPage;
