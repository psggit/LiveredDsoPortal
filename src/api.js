import { POST } from 'Utils/fetch'
import Notify from "Components/notify"

export function createComplaint (payloadObj, successCallback, failureCallback) {
  console.log("data", payloadObj)
  return POST({
      api: 'http://192.168.5.63:3000/livered/ottpReports',
      handleError: true,
      prependBaseUrl: false,
      data: ({
        "data_type":"PastOttps",
        "state":"TN",
        "city_id":"1",
        "time_range":"7days",
        "file_name":"abc"
      })
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
