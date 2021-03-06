import mqtt from 'mqtt';
import { remote, ipcRenderer } from 'electron';
import * as ACTION from '../../actions/moto/Const';
import * as PROGRESSBUTTON from '../../const/moto/ProgressButtonConst';
import * as MISC from '../../const/moto/Misc';
import Game from '../../phasor/popper/main'

// import * as hashLeftOuterJoin from "lodash-joins/lib/hash/hashLeftOuterJoin.js"
let _ = require('lodash');
let joins = require('lodash-joins');
let sorty = require('sorty')
let fs = require('fs');
let mqttClient = null;


// window.game = new Game()

export async function gameStart(disp, getSt, myCanvas) {
  let dispatch = disp;
  let getState = getSt;
  let myCanvasId = myCanvas;
  window.game = new Game(dispatch, getState, myCanvasId);
} // start

export async function subscribe(disp,getSt,topic,callback) {
//  var that = this;
	var dispatch = disp;
	var getState = getSt;
	var subtop = topic;
	var subcall = callback;

	if(null==mqttClient){

		mqttClient = mqtt.connect('mqtt://c4125e88:a68051977e87f879@broker.shiftr.io', {
		  clientId: 'javascript'
		});
/*		mqttClient = mqtt.connect('mqtt://try:try@broker.shiftr.io', {
		  clientId: 'javascript'
		});
*/
	//	mqttClient  = mqtt.connect({ host: 'localhost', port: 1883 }) //activemq
		mqttClient.on('connect', function () {
			mqttClient.subscribe(subtop);
			if ('development'==process.env.NODE_ENV) {
				console.log('connected');
			}
		});

		mqttClient.on('message', function (topic, message) {
		  // message is Buffer
		  console.log(message.toString());
		  subcall(message.toString());
		})
	}


	return;

} // start



export async function fanStart(disp,getSt) {
//  var that = this;
	var dispatch = disp;
	var getState = getSt;

//	dispatch({ type:ACTION.SET_GO_BUTTON, goButton:PROGRESSBUTTON.LOADING });
	mqttClient.publish('fan', 'fanon');
	if ('development'==process.env.NODE_ENV) {
		console.log('publish fan->fanon');
	}

//	await MISC.sleep(5000);
//	dispatch({ type:ACTION.SET_GO_BUTTON, goButton:PROGRESSBUTTON.READY });

/*
	mqttClient  = mqtt.connect({ host: 'localhost', port: 1883 }) //activemq

	mqttClient.on('connect', function () {
	//  client.subscribe('gato')
	mqttClient.publish('fan', 'fanon')
	console.log('connected');
	});

	setTimeout(function(){
		//   client.publish('gato', 'ledoff');
		mqttClient.end();
		console.log('goodbye');
	},3000);

	await MISC.sleep(5000);
	dispatch({ type:ACTION.SET_GO_BUTTON, goButton:PROGRESSBUTTON.READY });

	//  dispatch({ type:ACTION.SET_STATUS, status:'' });
*/
	return;

} // start
