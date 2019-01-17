// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var com = require('common');
import MatchVs from '../utils/matchvs'
cc.Class({
    extends: cc.Component,

    properties: {
		score: cc.Label,
		_mvs: null,
    },

    onLoad () {
		this._mvs = new MatchVs();
		com.canvas = this;
		this.num = 0;
		// this._pool = new cc.NodePool('PoolHandler');
		this.init();
    },
	
	
	init(){
		this.setScreenSize()
		this.setScore()
		this.userPlay()
	},
	
	userPlay() {
		var cpProto = '{"event":"begin_game"}';
		this._mvs.sendEventEx(this, cpProto);
	},
	
	sendOverMsg() {
		var cpProto = '{"event":"over"}';
		this._mvs.sendEventEx(this, cpProto);
	},
	
	addAndSetPacket() {
		com.packetNum++;
		this.score.string = com.packetNum;
	},
	
	addScore(score) {
		var cpProto = '{"event":"score", "score" : "'+score+'"}';
		this._mvs.sendEventEx(this, cpProto);
	},
	
	sendEventResponse(sendEventRsp) {
		if (sendEventRsp.status == 200) {
			console.log("发送消息成功");
		} else {
			console.log("发送消息失败 status"+sendEventRsp.status);
		}
	},
	
	setScore() {
		this.score.string = com.score
	},
	
	setScreenSize() {
		let windowSize=cc.view.getVisibleSize();
		com.screenHeight = windowSize.height;
		com.screenWidth = windowSize.width;
	},

    start () {

    },
});
