/**
 * Created by asus on 2017/6/20.
 */
import React, { Component } from "react";
import "./iconfont/iconfont.css";
import "./stylesheet/video.less";

let timer;

class Video extends Component {
    render(){
        return(
            <div id = "video">
                <div id = "main">
                    <VideoPlayer/>
                </div>
            </div>
        )
    }
}

class VideoPlayer extends Component{
    constructor(props){
        super(props);

        this.state = {
            rate: 0,
            isPlaying: false,
            durTime: '',
            curTime: 0,
            curVolumn: 20
        }
    }

    getTime(time){
        let hour = parseInt(time/3600);
        let min = parseInt(time/60);
        let sec = parseInt(time%60);
        time = hour +　':' + min + ':' + sec;
        return time;
    };

     //click event 操作dom？？
    //播放
    play = (ev) => {
        if(this.state.isPlaying){
            this.refs.video.pause();
            this.setState({
                isPlaying: false
            });
            ev.target.classList.remove('icon-zanting');
            ev.target.classList.add('icon-bofang');
        }else{
            this.refs.video.play();
            this.setState({
                isPlaying: true
            });
            ev.target.classList.remove('icon-bofang');
            ev.target.classList.add('icon-zanting');
        }
    };

    startPlay = () => {
        if(timer){
            clearInterval(timer);
        }

        if(this.state.isPlaying) {

            timer = setInterval(() => {
                this.setState({
                    curTime: this.refs.video.currentTime
                });
            }, 500);
        }
    };

    displayVolumn = () => {
        this.refs.volumn.classList.toggle('show');
    };

    adjustLine = (style) => {
        style.width = this.state.curTime/this.state.durTime*100 + '%';
        style.height = (this.state.curVolumn/100)*150+ 'px';
    };

    seekTimeline = (ev) => {
        let x = ev.offsetX;
        console.log(x);
        let cur = parseInt((x / 800) * this.state.durTime);
        this.refs.video.currentTime = cur;
        this.setState({
            curTime: cur
        });
    };

    seekVolumnline = (ev) => {
        let x = 150;
        let cur = parseInt((1-x/150) * 100);
        this.refs.video.volume = cur;
        this.setState({
            curVolumn: cur
        });
        console.log(cur)
    };

    //全屏
    fullScreen(){

    }

     render(){
        let cur = this.getTime(this.state.curTime);
        let  dur = this.getTime(this.state.durTime);

        let style = {
            width: 0,
            height: 0,
        };

        this.adjustLine(style);

        return(
            <div className="videoplayer">
                <div className="video">
                    <video ref="video" src = "public/mmd/1.mp4" loop>
                        <p>Your browser dont support html5</p>
                    </video>
                    <div className="loading">
                        <img src="img/loading.gif"/>
                        <p>...loading{this.state.rate}%</p>
                    </div>
                    <i className="icon icon-bilibili"/>
                </div>
                <div className="bottomBar">
                    <div className="poselem">
                        <i className="iconfont icon-bofang" onClick={this.play}/>
                        <div className="time"><span className="cur">{cur}</span>/<span className="total">{dur}</span></div>
                        <div className="timeline" onClick = {this.seekTimeline}>
                            <div className="fill" style={{width: style.width}}>
                                <i className="iconfont icon-yuan"/>
                            </div>
                        </div>
                        <i className="iconfont icon-yinliang" onClick={this.displayVolumn}/>
                        <div ref = "volumn" className="volumn" onClick = {this.adjustVolumn} onMouseLeave={this.displayVolumn}>
                            <div  className="volumnline" onClick={this.seekVolumnline}>
                                <div className="fill" style = {{height: style.height}}>
                                    <i className="iconfont icon-kxyuan"/>
                                </div>
                            </div>
                        </div>
                        <i className="iconfont icon-quanping"/>
                    </div>
                </div>
            </div>
        )
    };

    componentDidUpdate(){
        this.startPlay();
    }

    componentDidMount() {
        this.refs.video.onloadedmetadata = () => {this.setState({rate: 25})};
        this.refs.video.onloadeddata = () => {
            this.setState({
                rate: 50,
                durTime: this.refs.video.duration
            })
        };
        this.refs.video.oncanplaythrough = () => {this.setState({rate: 100})};
    }

    componentWillUnmount(){
        this.refs.video.onloadedmetadata = null;
        this.refs.video.onloadeddata = null;
        this.refs.video.oncanplaythrough = () => null;
    }

    /*shouldComponentUpdate(np, ns){
        console.log('2');
        return this.state.curTime != this.refs.video.currentTime;
    }*/
}

export default Video;



