// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var indexCom = require('index-common');
var com = require('match-common');
import WeiXin from '../utils/wx';
cc.Class({
    extends: cc.Component,

    properties: {
		avatarSprite: cc.Sprite,
		beginButton: cc.Node,
		countLabel: cc.Label,
		countNode: cc.Node,
		redPackNum: cc.Label,
		money: cc.Label,
		fangzhu: cc.Node,
		_wx: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this._wx = new WeiXin();
		
		if (!indexCom.isPlayer) {
			if (!indexCom.debug && !indexCom.isWxMini) {
				var title = indexCom.userinfo['nickname'] + ': ' + '发了' + indexCom.money + '元红包，大家一起来消灭它们吧！';
				var desc = '换一种方式过大年，这里有凭实力抢的红包哦～';
				this._wx.setShareInMatch(title, desc, 'https://game.cj102.com/game?roomID=' + indexCom.roomID + '&id=' + indexCom.orderid);
			}
		}

		com.match_page = this;
    	this.init();
    },
	
	init() {
		this.redPackNum.string = indexCom.redPackNum + '个';
		this.money.string = indexCom.money + '元';
		this.setAvatar(indexCom.userinfo['header_url']);
		
		if (com.isOwner) {
			this.fangzhu.active = true;
		} else {
			this.fangzhu.active = false;
		}
	},
	
	setFangZhuActive() {
		this.fangzhu.active = true;
	},
	
	setAvatarFrame(frame) {
		this.avatarSprite.spriteFrame=frame;
	},
	
	setAvatar(url) {
		var imgUrl = url + '?aa=aa.jpg';
		cc.loader.load(imgUrl,function (err, texture) {
		         var frame=new cc.SpriteFrame(texture);
				 com.match_page.setAvatarFrame(frame);
		    });
	},
	
	countDown() {
		if (com.countDown === 30) {
			this.countLabel.string = com.countDown;
		} else if(com.countDown > 0){
			this.countLabel.string = com.countDown;
		} else if (com.countDown === 0) {
			this.beginButton.active = true;
			this.countNode.active = false;
			com.couldBegin = true;
		}
	},

    start () {

    },

    // update (dt) {},
});
