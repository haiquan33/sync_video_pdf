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
      <div className="PDFReader">
        <Document
          file={this.props.url}
          onLoadSuccess={this.onDocumentLoad}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <p>Page {pageNumber} of {numPages}</p>
        <div style={{display:"flex",
                      width:"100%",
                      justifyContent:'center'}}>
            <div style={
               styles.controlBtn
              }
              onClick={this.props.setPDFPagePrevious} 
              >Previous</div>
            <div style={
               styles.controlBtn
              } 
              onClick={this.props.setPDFPageNext}
              >Next</div>
        </div>
      
      </div>
    );
  }
}

const styles={
  controlBtn:{
    display:'flex',
    background:'#2d8dd6',
    color:'white',
    height:'80px',
    width:'50%',
    alignItems: 'center',
    justifyContent:'center',
    margin:'1px',
  }
}

export default PDFview;
