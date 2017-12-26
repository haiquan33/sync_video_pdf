import React, { Component } from 'react';
import ReactPlayer from 'react-player'

class VideoPlayer extends Component {

    constructor(props){
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
            loop: false
          }
          this.playPause=this.playPause.bind(this);
          this.onDuration=this.onDuration.bind(this);
    }
    onDuration = (duration) => {
        console.log('onDuration', duration)
        this.setState({ duration })
        this.props.getDuration(duration);

      }

    playPause = () => {
        this.setState({ playing: !this.state.playing })
      }
    onProgress = state => {
        console.log('onProgress', state)
        // We only want to update time slider if we are not currently seeking
        if (!this.state.seeking) {
          this.setState(state)

        }
        this.props.onVideoProgress(state);
      }
    ref = player => {
        this.player = player
      }
    render() {
       
        return (
            <div className="Videoplayer">
                <ReactPlayer
                    ref={this.ref}
                    playing={this.state.playing}
                    onReady={this.props.onVideoReady}
                    onDuration={this.onDuration}
                    onProgress={this.onProgress}
                    url='https://cdn.courseact.com/video/2017/12/26/748083c2-dee5-4a17-8713-65c96a92b2a1.mp4'  />
                <div>Played={this.state.played*this.state.duration}</div>
                <button onClick={this.playPause}>{this.state.playing ? 'Pause' : 'Play'}</button>
            
               
            </div>
        );
    }
}

export default VideoPlayer;
