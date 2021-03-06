
import { remote,ipcRenderer } from 'electron';



import * as ACTION from "../../actions/moto/Const.js"
import * as PROGRESSBUTTON from "../../const/moto/ProgressButtonConst.js"
import * as MISC from "../../const/moto/Misc.js"
import mqtt     from 'mqtt';


//import * as hashLeftOuterJoin from "lodash-joins/lib/hash/hashLeftOuterJoin.js"
var _ = require('lodash');
var joins = require('lodash-joins');
var sorty    = require('sorty')
var fs = require('fs');
var mqttClient = null;

export async function subscribe(disp,getSt) {
//  var that = this;
	var dispatch = disp;
	var getState = getSt;

	if(null==mqttClient){
		mqttClient  = mqtt.connect({ host: 'localhost', port: 1883 }) //activemq
		mqttClient.on('connect', function () {
			mqttClient.subscribe('photocell');
			console.log('connected');
		});

		mqttClient.on('message', function (topic, message) {
		  // message is Buffer 
		  console.log(message.toString());
		})
	}


	return;

} // start



export async function fanStart(disp,getSt) {
//  var that = this;
	var dispatch = disp;
	var getState = getSt;

	dispatch({ type:ACTION.SET_GO_BUTTON, goButton:PROGRESSBUTTON.LOADING });
	mqttClient.publish('fan', 'fanon')
	await MISC.sleep(5000);
	dispatch({ type:ACTION.SET_GO_BUTTON, goButton:PROGRESSBUTTON.READY });

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



