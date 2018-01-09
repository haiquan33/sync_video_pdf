import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Document, Page } from 'react-pdf';
import PDFview from './PDFview.js';
import VideoPlayer from './VideoPlayer.js';
import Header from './Header.js';
import moment from 'moment';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdfUrl: "https://cdn.courseact.com/application/2017/12/26/6ebc2d57-e812-49c8-ac54-695fd19ab43e.pdf",
      videoUrl:"https://cdn.courseact.com/video/2017/12/26/748083c2-dee5-4a17-8713-65c96a92b2a1.mp4",
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
      PDFPageChanged:false,
      changeVideoTime:0,
      TimeStampList:[{"id":"new","time":"00:00:10","slide":"1","des":"asd"},
                     {"id":"H1V7WufEG","time":"00:00:20","slide":"2","des":"sad"},
                     {"id":"r13m-OzVz","time":"00:00:30","slide":"3","des":"asrwer"}]

    }
    this.getDuration = this.getDuration.bind(this);
    this.getPageAmount = this.getPageAmount.bind(this);
    this.onVideoReady = this.onVideoReady.bind(this);
    this.onPDFReady = this.onPDFReady.bind(this);
    this.getSyncTime = this.getSyncTime.bind(this);
    this.onVideoProgess = this.onVideoProgess.bind(this);
    this.syncPDFReader=this.syncPDFReader.bind(this);
    this.syncVideoPlayer=this.syncVideoPlayer.bind(this);
    this.onSyncVideoDone=this.onSyncVideoDone.bind(this);
    this.setPDFPageNext=this.setPDFPageNext.bind(this);

    this.setPDFPagePrevious=this.setPDFPagePrevious.bind(this);
    this.GetPagenumberfromTime=this.GetPagenumberfromTime.bind(this);
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
    console.log(state);
    this.setState(state);
    if (!this.state.PDFPageChanged)
    this.syncPDFReader();
  }


  setPDFPageNext(){
    if (this.state.currentPage+1<=this.state.pageAmount)
      this.setState({currentPage:this.state.currentPage+1},()=>{
        this.syncVideoPlayer();
      });
   
  }
  setPDFPagePrevious(){
    if (this.state.currentPage-1>0)
      this.setState({currentPage:this.state.currentPage-1},()=>{
        this.syncVideoPlayer();
      });
   
  }

  //get video current time and return the page number base on timestamplist
  GetPagenumberfromTime(){
    let cur=this.state.duration*this.state.played;
    let min=this.state.duration;
    let currentPage=1;

    //get the right slide to sync
    for (let stamp of this.state.TimeStampList){
     
      let sec=Math.floor(moment.duration(stamp.time).asSeconds());
     
      //if this timestamp is before the current time
      if (cur-sec>0){
        //find the most closest timestamp to this current time
        console.log("currentpage",sec);
          if (cur-sec<min){
              min=cur-sec;
              currentPage=Number(stamp.slide);
              
              
          }
      }
    }
   // console.log("currentpage",currentPage);
    //this.setState({currentPage});
    return currentPage;
  }
  syncPDFReader() {
  //  var currentPage=Math.floor(this.state.played*this.state.pageAmount);
   var currentPage=this.GetPagenumberfromTime();
   console.log("current page",currentPage);
   // var currentPage=GetPagenumberfromTime();//this.state.played;
    if (currentPage==0) currentPage=1;
    this.setState({currentPage});
  }
  syncVideoPlayer(){
      var changeVideoTime=this.state.currentPage/this.state.pageAmount;
      this.setState({PDFPageChanged:true,changeVideoTime,played:changeVideoTime})
  }
  getSyncTime() {
   
  }

  onSyncVideoDone(){
   var playedSeconds=this.state.played*this.state.duration;
    this.setState({PDFPageChanged:false,playedSeconds},()=> console.log("After Changed",this.state))
  }
  render() {
    if ((this.state.pdfReady) && (this.state.videoReady)) { this.getSyncTime(); }
    return (

      <div className="App">
     
        <Header />
        <div className="Media-container">
          
           <VideoPlayer onSyncVideoDone={this.onSyncVideoDone} PDFPageChanged={this.state.PDFPageChanged} changeVideoTime={this.state.changeVideoTime} url={this.state.videoUrl} getDuration={this.getDuration} onVideoReady={this.onVideoReady} onVideoProgress={this.onVideoProgess} />
           <PDFview url={this.state.pdfUrl} getPageAmount={this.getPageAmount} onPDFReady={this.onPDFReady} pageNumber={this.state.currentPage} setPDFPageNext={this.setPDFPageNext} setPDFPagePrevious={this.setPDFPagePrevious}/>
        </div>
        
      </div>
    );
  }
}

export default App;
