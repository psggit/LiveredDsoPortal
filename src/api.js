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
    // return POST({
    //     api: 'http://192.168.5.63:3000/livered/ottpReports',
    //     handleError: true,
    //     prependBaseUrl: false,
    //     data: payloadObj
    // })
    fetch(`http://192.168.5.63:3000/livered/ottpReports`, {method: 'post', body: JSON.stringify(payloadObj)})
    .then((response) => {
        var reader = response.body.getReader();
        reader.read().then(function(result) {
            successCallback(result)
        })
    })
    .catch(err => {
        console.log("Error in creating report", err)
        //err.response.json().then(json => { Notify("danger", json.error) })
        failureCallback()
    })
}
