// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var com = require('match-common');
cc.Class({
    extends: cc.Component,

    properties: {
		beginGame: cc.Button,
		mengban: cc.Button,
		countDownButton: cc.Node,
		countDownLabel: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:
	
	beginGameClicked() {
		if (com.couldBegin) {
			cc.director.loadScene('game');
		}
	},
	
	closeMeng() {
		this.mengban.node.active = false;	
	},

    onLoad () {
		
    },
    // update (dt) {},
});
