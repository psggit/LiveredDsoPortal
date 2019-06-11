import { POST, GET } from 'Utils/fetch'

// const ottp = "https://fca0bbea.ngrok.io"
// export const dso = "https://007072aa.ngrok.io"
// const credit = "https://df53a98c.ngrok.io"
// const rule = "https://6774026d.ngrok.io"

const ottp = "https://195008c1.ngrok.io"
const dso = "https://4839cb1e.ngrok.io"
const credit = "https://d8d0fc08.ngrok.io"
export const consumer = "https://c87e428a.ngrok.io"

export function createComplaint(payloadObj, successCallback, failureCallback) {
	console.log("data", payloadObj)
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
	console.log("data", payloadObj)
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


