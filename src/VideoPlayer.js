import React, { Component } from 'react';
import ReactPlayer from 'react-player'
import playIco from './playIco.png';
import pauseIco from './pauseIco.png'
class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {

            playing: false,
            volume: 0.8,
            muted: false,
            played: 0,
            loaded: 0,
            duration: 0,
            playbackRate: 1.0,
            loop: false
        }
        this.playPause = this.playPause.bind(this);
        this.onDuration = this.onDuration.bind(this);
        this.onSeekChange = this.onSeekChange.bind(this);
        this.onSeekMouseDown = this.onSeekMouseDown.bind(this);
        this.onSeekMouseUp = this.onSeekMouseUp.bind(this);
        this.SyncToPDFReader = this.SyncToPDFReader.bind(this);
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
        if ((!this.state.seeking) && (!this.props.PDFPageChanged)) {
            this.setState(state)

        }
        this.props.onVideoProgress(state);
    }

    onSeekMouseDown = e => {
        this.setState({ seeking: true })
    }
    onSeekChange = e => {
        this.setState({ played: parseFloat(e.target.value) })
    }
    onSeekMouseUp = e => {
        this.setState({ seeking: false })
        this.player.seekTo(parseFloat(e.target.value))
    }

    SyncToPDFReader(time) {
        var playedSeconds = time * this.state.duration;
        this.player.seekTo(parseFloat(time));
        this.setState({ played: time, playedSeconds }, () => {
            this.props.onSyncVideoDone();
            console.log("AfterChangedVideo", this.state);

        }
        );

    }

    ref = player => {
        this.player = player
    }
    render() {
        if (this.props.PDFPageChanged) { this.SyncToPDFReader(this.props.changeVideoTime) }
        const playPauseBtn = this.state.playing ? pauseIco : playIco;
        return (
            <div className="VideoPlayer">
                <ReactPlayer
                    ref={this.ref}
                    width='100%'
                    height='100%'
                    playing={this.state.playing}
                    onReady={this.props.onVideoReady}
                    onDuration={this.onDuration}
                    onProgress={this.onProgress}
                    url={this.props.url} 
                    controls/>
               
                {/* <div style={{display:'flex',flexDirection:'row' }}>
                    <div onClick={this.playPause}><img style={{ width: '20px', height: '20px' }} src={playPauseBtn} /></div>
                    <input
                        type='range' min={0} max={1} step='any'
                        value={this.state.played}
                        onMouseDown={this.onSeekMouseDown}
                        onChange={this.onSeekChange}
                        onMouseUp={this.onSeekMouseUp}
                        style={{ flexGrow:1}}
                    />
                </div> */}
            </div>
        );
    }
}

export default VideoPlayer;
