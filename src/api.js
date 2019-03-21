import { POST } from 'Utils/fetch'
import Notify from "Components/notify"

export function createComplaint (payloadObj, successCallback, failureCallback) {
  console.log("data", payloadObj)
  return POST({
      api: 'http://192.168.5.63:3000/livered/createDsoComplaints',
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

export function generateReport (payloadObj, successCallback, failureCallback) {
    console.log("data", payloadObj)
    return POST({
        api: 'http://192.168.5.63:3000/livered/ottpReports',
        handleError: true,
        prependBaseUrl: false,
        data: payloadObj
    })
    .then((json) => {
        //Notify("success", "Complaint created")
        successCallback()
    })
    .catch(err => {
        console.log("Error in creating report", err)
        //err.response.json().then(json => { Notify("danger", json.error) })
        failureCallback()
    })
}
