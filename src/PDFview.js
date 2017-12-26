import React, { Component } from 'react';

import { Document, Page } from 'react-pdf';

class PDFview extends Component {
  constructor(props){
    super(props);
      this.state = {
      numPages: null,
     
    }

  }
 
 
  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
    this.props.getPageAmount(numPages);
    this.props.onPDFReady();
  }
 
  render() {
    const { numPages } = this.state;
    const pageNumber=this.props.pageNumber;
    return (
      <div>
        <Document
          file="https://cdn.courseact.com/application/2017/12/26/6ebc2d57-e812-49c8-ac54-695fd19ab43e.pdf"
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
      </div>
    );
  }
}

export default PDFview;
