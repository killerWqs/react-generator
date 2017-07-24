/**
 * Created by asus on 2017/6/30.
 */
//利用定时器的宿主特性， 数据库的数据有序存储
class DanMu extends Component{
    constructor(props){
        super(props);
    }

    startPush(){

    }

    render() {
        let queue = [];

        return(
            <div className="danmu">
                <div className="dmpathway">
                    <div className="danmu4"/>
                    <div className="danmu3"/>
                    <div className="danmu2"/>
                    <div className="danmu1">
                        <p>"乔景凌是个大傻逼!"</p>
                    </div>
                </div>
                <div className="inputdm">
                    <label>弹幕</label>
                    <div id = "switch"><i className="iconfont icon-switch"/></div>
                    <input className = "setting" type = "button" value = "设置"/>
                    <label htmlFor= "danmu">发送弹幕</label>
                    <input id = "danmu" type = "text"/>
                </div>
            </div>
        )
    }
}