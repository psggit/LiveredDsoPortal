import React from "react"
import PageHeader from "Components/pageheader"
import Button from "Components/button"
import Icon from "Components/icon"
import Wrapper from "Components/contentWrapper"
import "./add-credits.scss"

class AddCredits extends React.Component {
  constructor() {
    super()

    this.state = {
      activeTab: 'add-credits',
      //isImageUploaded: false,
      isImageUploading: false,
      isImageSelected: false,
      data: ''
    }

    this.setActiveTab = this.setActiveTab.bind(this)
    this.handleUploadChange = this.handleUploadChange.bind(this)
    this.submitUploadedImage = this.submitUploadedImage.bind(this)
    this.resetUploadImage = this.resetUploadImage.bind(this)
  }

  /**
   * Used to highlight the active tab
   * @param {String} activeTabName - Indicates the active tab name
   */
  setActiveTab(activeTabName) {
    this.setState({ activeTab: activeTabName })
  }

  /**
   * Upload and set state if file size is less than 50MB
   */
  handleUploadChange(e) {
    this.resetUploadImage()
    var FileSize = e.target.files[0].size / 1024 / 1024; // in MB
    if (FileSize <= 50) {
      const file = e.target.files[0]
      console.log("on change")
      this.setState({
        data: file,
        isImageSelected: true
      })
      this.submitUploadedImage()
    } else {
      console.log("File size exceeded")
    }
  }

  /**
   * Resets the image selection and uploading state
   */
  resetUploadImage() {
    this.setState({ 
      //isImageUploaded: false, 
      isImageSelected: false, 
      isImageUploading: false
    })
  }

  
  submitUploadedImage() {
    const formData = new FormData()
    formData.append('file', this.state.data)
    this.setState({ isImageUploading: true, isImageSelected: false })
  }

  render() {
    const {activeTab} = this.state
    return (
      <div id="AddCredits">
        <PageHeader pageName="Credit Management" />
        <Wrapper>
          <div>
            <div style={{display: 'flex', marginTop: '4px'}}>
              <ul className="nav">
                <li 
                  onClick={() => this.setActiveTab("credit-log")} 
                  className={`${activeTab === "credit-log" ? 'active' : ''}`}
                >
                  <a href="/home/credit-log">Credit Log</a>
                </li>
                <li
                  onClick={() => this.setActiveTab("add-credits")}
                  className={`${activeTab === "add-credits" ? 'active' : ''}`}
                >
                  <a href="/home/add-credits">Add Credits</a>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <div className="bank-account-container">
              <h5>Select Bank Account</h5>
              <div className="bank-details">
                <h5>ICICI BANK</h5>
                <p>LiveRed Pvt. Ltd </p>
                <p>AcNo: 00456744245 </p>
                <p>IIFC: ICICI0000041 </p>
                <p>ICICI BANK LTD, 25 GANDHI </p>
                <p>NAGAR, CHENNAI, TAMIL </p>
                <p>NADU 600 056 </p>
              </div>
            </div>
            <div className="upload-section">
              <h2>Let us know about your payment</h2>
            
              <div className="form-input">
                <label>
                  Upload Document <span>*</span>
                </label>
                <div class="input-group">
                  <input type="text" className="form-control" value={this.state.data.name} readonly />
                  <div className="input-group-btn">
                    <span className="fileUpload">
                      <span className="upload-icon" id="upload">
                        <Icon name="rightArrow" />
                      </span>
                      <input type="file" className="upload up" id="up" onChange={this.handleUploadChange} />
                    </span>
                  </div>
                </div>
                <p className="note">Max size 50KB. Supported formats jpg, png, gif, pdf, doc.</p>
              </div>

              <div className="form-input">
                <label>
                  Message
                </label>
                <textarea 
                  placeholder="Write a reason/note" 
                  name="message"
                  onChange={this.handleTextareaChange}
                />
              </div>

              <Button primary>Submit</Button>
            </div>
          </div>
        </Wrapper>
      </div>
    )
  }
}

export default AddCredits