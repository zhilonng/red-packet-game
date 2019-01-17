// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
		contact: cc.Button,
		myGame: cc.Button,
		myGamePage: cc.Node,
		withdraw: cc.Button,
		withdrawPage: cc.Node,
		closeMyGame: cc.Button,
		closeWithDraw: cc.Button
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	this.myGamePage.active = false;
		this.withdrawPage.active = false;
    },
	
	contactClicked() {
		wx.previewImage({  
			urls: ['http://img.cj102.com/32.pic.jpg']
		})  
	},
	
	withdrawClicked() {
		this.withdrawPage.active = true;
	},
	
	myGameClicked() {
		this.myGamePage.active = true;
	},
	
	closeMyGameClicked() {
		this.myGamePage.active = false;
	},
	
	closeWithDrawPage() {
		this.withdrawPage.active = false;
	},

    start () {

    },

    // update (dt) {},
});
