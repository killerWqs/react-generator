/**
 * Created by asus on 2017/6/30.
 */
class VideoList extends Component{
    constructor(props){
        super(props);

        this.defaultProps = {
            loading: true,
        };

        this.initState = {
            activeIndex: 0
        }
    }

    static propTypes = {
        loading: PropTypes.bool.isRequired,

    };

    static contextTypes = {
        items: PropTypes.object.isRequired,
        introduction: PropTypes.object
    };

    static count(ulleft, listleft){
        if(activeIndex = 0){
            ulleft = 0;
            listleft = 0;
        }else if(activeIndex = 1){
            ulleft = '66.6px';
            listleft = "-100%";
        }else{
            ulleft = '133.2px';
            listleft = "-200%";
        }
    }

    static switchTab = (ev) => {
        let activeIndex = ev.target.getAttribute('key');

        if(activeIndex !== this.props.acvtiveIndex){
            this.setState({
                acvtiveIndex: activeIndex
            })
        }
    };

    render(){
        let videoitems = this.context.items.videoitems.map((item) => {
            return <VideoItem item = {item}/>
        });

        let danmuitems = this.context.items.danmuitems.map((item) => {
            return <DanmuItem item = {item}/>
        });

        let intro = this.context.items.introducion;
        intro = (
            <img src = {intro.imgSrc}/>
        );

        let ulleft, listleft;
        this.count(ulleft, listleft);


        return (
            <div id = "videoList">
                <div className = "topBar">
                    <ul>
                        <li key = "0" onClick={this.switchTag}>推荐</li>
                        <li key = "1" onClick={this.switchTag}>视频</li>
                        <li key = "2" onClick={this.switchTag}>弹幕</li>
                        <div className="underline" style = {{left: ulleft}}/>
                    </ul>
                </div>
                <div className = "videoList-items" style = {{left: listleft}}>
                    <div className="playing">

                    </div>
                    <div className="videoitems">
                        {videoitems}
                    </div>
                    <div className="danmuitems">
                        {danmuitems}
                    </div>
                    <div className = "animation"/>
                </div>
            </div>
        )
    }
}

const VideoItem = () => {
    if(!item.src){
        item.src = "./o.jpg";
    }

    return (
        <Link to={item.source}>
            <div id="videoList-item">
                <img src={item.src} id="img"/>
                <div className="info">
                    <div className="des">{item.des}</div>
                    <div className="duration">{item.duration}</div>
                </div>
            </div>
        </Link>
    );
};


const DanmuItem = (item) =>(
    <div className="danmu"><p>{item.content}</p><div className="time">{item.time}</div></div>
);

export default VideoList;

