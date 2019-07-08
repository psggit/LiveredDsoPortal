import { POST, GET } from 'Utils/fetch'

//dev
const ottp = "https://79bd647f.ngrok.io"
export const dso = "http://192.168.5.84:3002"
const credit = "https://23fff800.ngrok.io"
export const consumer = "https://9800b602.ngrok.io"
const rule = "https://d429cc52.ngrok.io"

//prod
// const ottp = "https://ottp.livered-dev.com"
// export const dso = "https://dsomanagement.livered-dev.com"
// const credit = "https://credit.livered-dev.com"
// export const consumer = "https://consumer.livered-dev.com"
// const rule = "https://ruleengine.livered-dev.com"

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
			err.response.json().then(json => { Notify("danger", json.error) })
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
			//err.response.json().then(json => { Notify("danger", json.error) })
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
			//Notify("success", "Complaint created")
			successCallback(json)
		})
		.catch(err => {
			console.log("Error in fetching credit log", err)
			//err.response.json().then(json => { Notify("danger", json.error) })
			//failureCallback()
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
}

export function fetchCityAndStates(payload) {
	return GET({
		api: `${ottp}/livered/ottp/getCityAndStates`,
		handleError: true,
		prependBaseUrl: false,
		//data: payload
	})
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
			//err.response.json().then(json => { Notify("danger", json.error) })
			//failureCallback()
		})
}


