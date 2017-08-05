/**
 * Created by asus on 2017/6/30.
 */
//利用定时器的宿主特性， 数据库的数据有序存储
//这种功能组件根本不适合用react来写， jquery最好
import PropType from 'prop-type';
import React, { Component } from 'react';
import './stylesheet/danmu.less';

let timer;

/*const Button = styled.button`
  border-radius: 3px;
  padding: 0.25em 1em;
  margin: 0 1em;
  background: transparent;
  color: palevioletred;
  border: 2px solid palevioletred;
`*/

class Danmu extends Component{
    constructor(props){
        super(props);
        this.state = {
            open: true,
            opacity: 1,
            submission: ''
        }
    }

    static PropTypes = {
        items: PropType.array,
        cueTime: PropType.number
    };

    handleSubmit = (submission) => {
        this.setState({
            submission: submission
        })
    };

    handleReset = () => {

    };

    render() {
        let queue = [];

        return(
            <div className="danmu">
                <DanmuPlayer items = {this.props.items} curTime = {this.props.curTime} setting = {this.state}/>
                <InputDanmu handleSubmit = {this.handleSubmit}/>
            </div>
        )
    }
}

//no morn than four danmu per second
class DanmuPlayer extends Component{
    constructor(props){
        super(props);
        this.state = {
            queue1: [],
            queue2: [],
            queue3: [],
            queue4: [],
            items: this.props.items,
            key: 0,
            ready: false,
            moving: "",
            //submission: '',
            lqLength: 0
        }
    }

    handleItems = (np) => {
        let items = [],t;
        let curTime = this.props.curTime;
        console.log(this.state.items);
        for(let i = 0; i < this.state.items.length; i++) {
            items[i] = this.state.items[i];
        }
        for(let i = 0; i < items.length; i++){
            if(items[i].time !== np.curTime){
                t = i;
                break;
            }
        }

        let queue = items.splice(0,t);

        this.setState({
            items: items,
            queue: queue,
            lqLength: queue.length
        });

        return queue;

    };

    startPush = (queue) => {
        //timer = setInterval(function(){
            //let items = this.state.items;
            console.log('executed');
            let length = queue.length;
            let that = this;
            let {queue1, queue2, queue3, queue4, key} = this.state;
            queue = queue.map(function (item) {
                key++;
                return(<p className={that.state.moving} key = {key}>{item.content}</p> )
            });
            if(queue[0]) queue1 = queue1.concat(queue[0]);
            if(queue[1]) queue2 = queue2.concat(queue[1]);
            if(queue[2]) queue3 = queue3.concat(queue[2]);
            if(queue[3]) queue4 = queue4.concat(queue[3]);

            this.setState({
                queue1: queue1,
                queue2: queue2,
                queue3: queue3,
                queue4: queue4,
                ready: true,
                key: key
            });
        //}, 1000)
    };

    startMoving = () => {
        let that = this;
        let { queue, key, lqLength, queue1, queue2, queue3, queue4 } = this.state;
        key = key - lqLength;
        queue = queue.map(function (item) {
            key++;
            return(<p className={that.state.moving} key = {key}>{item.content}</p> )
        });
        if(queue[0]) queue1 = queue[0];
        if(queue[1]) queue2 = queue[1];
        if(queue[2]) queue3 = queue[2];
        if(queue[3]) queue4 = queue[3];

        this.setState({
            queue1: queue1,
            queue2: queue2,
            queue3: queue3,
            queue4: queue4,
            moving: '',
            key: key
        });
    };

    startPlay = (queue) => {
        console.log('executed2');
            this.setState({
                moving: 'moving',
                ready: false
            })
    };

    render(){
        //setstate 不能在render中设置 只能使用定时器了
        return(
            <div className="dmpathway" style = {{
                display: this.props.setting.open,
                opacity: this.props.setting.opacity
            }}>
                <div className="path path4">{this.state.queue4}</div>
                <div className="path path3">{this.state.queue3}</div>
                <div className="path path2">{this.state.queue2}</div>
                <div className="path path1">{this.state.queue1}</div>
            </div>
        )
    }

     componentWillReceiveProps(np){
        let queue = [];
        queue = this.handleItems(np);
        console.log(queue);
        if(this.props.setting.open && queue[0]){
                this.startPush(queue);
        }
     }

     //分两次更新啊 两次紧紧相连
    componentDidUpdate(){
         if(this.state.ready) {
             this.startPlay();
         }
        if(this.state.moving){
            this.startMoving();
        }
    }

    shouldComponentUpdate(np, ns) {
        return true;
        //items needn't to jusitfy because of the reality of this.setState
    }
}


class InputDanmu extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        }
    }
    Change = (ev) => {
        this.setState({
            value: ev.target.value
        })
    };
    Submit = (ev) => {
        this.props.handleSubmit(this.state.value);
        ev.preventDefault();
    };

    render(){
        return(
            <form className="inputdm" method="POST" onSubmit={this.Submit}>
                <p>弹幕</p>
                <div className= "switch"><i className="iconfont icon-yuan"/></div>
                <input className = "setting" type = "button" value = "设置"/>
                <input className = "submission" type = "text" placeholder="请输入弹幕内容(不超过20个字)" onChange={this.Change} value={this.state.value}/>
                <div className="biaoqing"><i className = "icon icon-biaoqing"/></div>
                <input className="submit" type = "submit" value="发送弹幕"/>

                <i className="icon icon-fenxiang"/>
                <p>分享</p>
                <img src = ""/>
                <i className="icon icon-dianzan"/>
                <p>{this.props.number}</p>
            </form>
        )
    }
}

export default Danmu;
