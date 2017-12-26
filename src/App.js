import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Document, Page } from 'react-pdf';
import PDFview from './PDFview.js';
import VideoPlayer from './VideoPlayer.js';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: null,
      playing: false,
      volume: 0.8,
      muted: false,
      played: 0,
      loaded: 0,

      duration: 0,
      playbackRate: 1.0,
      pageAmount: 0,
      currentPage: 1,
      videoReady: false,
      pdfReady: false,


    }
    this.getDuration = this.getDuration.bind(this);
    this.getPageAmount = this.getPageAmount.bind(this);
    this.onVideoReady = this.onVideoReady.bind(this);
    this.onPDFReady = this.onPDFReady.bind(this);
    this.getSyncTime = this.getSyncTime.bind(this);
    this.onVideoProgess = this.onVideoProgess.bind(this);
    this.syncPDFReader=this.syncPDFReader.bind(this);

  }

  getDuration(duration) {
    this.setState({ duration })
  }
  getPageAmount(pageAmount) {
    this.setState({ pageAmount })
  }
  onVideoReady() {
    this.setState({ videoReady: true })
  }
  onPDFReady() {
    this.setState({ pdfReady: true })
  }
  onVideoProgess(state) {
    this.setState(state);
    this.syncPDFReader();
  }
  syncPDFReader() {
    var currentPage=Math.floor(this.state.played*this.state.pageAmount);
    if (currentPage==0) currentPage=1;
    this.setState({currentPage});
  }
  getSyncTime() {
    console.log("loaded");
  }
  render() {
    if ((this.state.pdfReady) && (this.state.videoReady)) { this.getSyncTime(); }
    return (

      <div className="App">
        <div className="Media-container">
          <PDFview getPageAmount={this.getPageAmount} onPDFReady={this.onPDFReady} pageNumber={this.state.currentPage}/>
          <VideoPlayer getDuration={this.getDuration} onVideoReady={this.onVideoReady} onVideoProgress={this.onVideoProgess} />
        </div>
        <div>duration={this.state.duration}</div>
        <div>played={this.state.played}</div>
        <div>pageAmount={this.state.pageAmount}</div>
      </div>
    );
  }
}

export default App;
