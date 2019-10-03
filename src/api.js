import { POST, GET } from 'Utils/fetch'
import Notify from 'Components/notification';

//dev
// const ottp = "https://79bd647f.ngrok.io"
// export const dso = "http://192.168.5.84:3002"
// const credit = "https://23fff800.ngrok.io"
// export const consumer = "https://9800b602.ngrok.io"
// const rule = "https://d429cc52.ngrok.io"

// const ottp = "http://192.168.5.84:3000"
// export const dso = "http://192.168.5.84:3002"
// const credit = "http://192.168.5.84:3004"
// export const consumer = "http://192.168.5.84:3003"
// const rule = "http://192.168.5.84:3005"
// const fence = "http://192.168.5.84:3006"

const ottp = "https://ottp-livered.hipbar-dev.com"
export const dso = "https://dsomanagement-livered.hipbar-dev.com"
const credit = "https://credit-livered.hipbar-dev.com"
export const consumer = "https://consumer-livered.hipbar-dev.com"
const rule = "https://ruleengine-livered.hipbar-dev.com"
const fence = "https://loki-livered.hipbar-dev.com"

//prod
// const ottp = "https://ottp-livered.hipbar-dev.com"
// export const dso = "https://dsomanagement-livered.hipbar-dev.com"
// const credit = "https://credit-livered.hipbar-dev.com"
// export const consumer = "https://consumer-livered.hipbar-dev.com"
// const rule = "https://ruleengine-livered.hipbar-dev.com"

export function createComplaint(payloadObj, successCallback, failureCallback) {
	return POST({
		api: `${ottp}/livered/dso/createDsoComplaints`,
		handleError: true,
		prependBaseUrl: false,
		data: payloadObj
	})
		.then((json) => {
			Notify("success", "Complaint created")
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in creating complaint", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function fetchUserLog(payloadObj) {
	return POST({
		api: `${dso}/livered/dso/listDsoUsers`,
		handleError: true,
		prependBaseUrl: false,
		data: payloadObj
	})
	// .then((response) => {
	// 	console.log("Successfully fetched user log")
	// })
	// .catch((error) => {
	// 	console.log("Error in fetching user log", error)
	// })
}

export function generateOttpReport(payloadObj, successCallback, failureCallback) {
	// console.log("data", payloadObj)
	// return POST({
	//     api: 'http://192.168.5.63:3000/livered/ottpReports',
	//     handleError: true,
	//     prependBaseUrl: false,
	//     data: payloadObj
	// })
	fetch(`${ottp}/livered/ottp/ottpReports`, { method: 'post', body: JSON.stringify(payloadObj) })
		.then((response) => {
			var reader = response.body.getReader();
			reader.read().then(function (result) {
				successCallback(result)
			})
		})
		.catch(err => {
			console.log("Error in creating ottp report", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function generateCreditReport(payloadObj, successCallback, failureCallback) {
	console.log("data", payloadObj)
	fetch(`${credit}/livered/credits/creditReports`, { method: 'post', body: JSON.stringify(payloadObj) })
		.then((response) => {
			var reader = response.body.getReader();
			reader.read().then(function (result) {
				successCallback(result)
			})
		})
		.catch(err => {
			console.log("Error in creating credit report", err)
			err.response.json().then(json => { Notify("danger", json.message) })
			failureCallback()
		})
}

export function fetchCreditLog(payload, successCallback) {
	// console.log("data", payloadObj)
	return POST({
		api: `${credit}/livered/credits/getDsoCreditLog`,
		handleError: true,
		prependBaseUrl: false,
		data: payload
	})
		.then((json) => {
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in fetching credit log", err)
			err.response.json().then(json => { Notify("danger", json.message) })
		})
}


export function fetchLocations(payload) {
	// console.log("data", payloadObj)
	return POST({
		api: `${dso}/livered/dso/dsoLocations`,
		handleError: true,
		prependBaseUrl: false,
		data: payload
	})
	// .then((response) => {
	// 	console.log("Successfully fetched locations")
	// })
	// .catch((error) => {
	// 	console.log("Error in fetching locations", error)
	// })
}

export function fetchCityAndStates(payload) {
	return GET({
		api: `${fence}/liveredFence/getCityAndState`,
		handleError: true,
		prependBaseUrl: false,
		//data: payload
	})
	// .then((response) => {
	// 	console.log("Successfully fetched cities and states", response)
	// })
	// .catch((error) => {
	// 	console.log("Error in fetching city and states", error)
	// })
}

export function fetchCompanyProfileDetails(payload, successCallback) {
	// console.log("data", payloadObj)
	return POST({
		api: `${dso}/livered/dso/dsoDetails`,
		handleError: true,
		prependBaseUrl: false,
		data: payload
	})
		.then((json) => {
			//Notify("success", "Complaint created")
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in fetching company profile details", err)
			err.response.json().then(json => { Notify("danger", json.message) })
		})
}


