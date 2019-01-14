// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var com = require('index-common');
cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		console.log('11')
		com.ruleWindow = this;
		this.node.active = false;
    },

    start () {

    },
	
	show() {
		this.node.active = true;
		var action = cc.fadeIn(1.0);
		this.node.runAction(action);
	},
	
	hide() {
		this.node.active = false;
		var action = cc.fadeOut(1.0);
		this.node.runAction(action);
	}

    // update (dt) {},
});
