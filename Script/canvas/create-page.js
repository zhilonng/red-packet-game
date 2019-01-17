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
		topLabelNode: cc.Node,
		moneyNode: cc.Node,
		numNode: cc.Node,
		levelNode: cc.Node,
		tagNode: cc.Node,
		buttonTagNode: cc.Node,
		buttonNode: cc.Node,
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		com.create_page = this;
		this.node.active = false;
    },
	
	showNodeAnimation() {
		com.index_page.setActive(false);
		com.me_page.setActive(false);
		this.node.active = true;
		var topLabelAction = cc.moveBy(0.5, cc.v2(-(com.screenWidth/2+this.topLabelNode.width/2), 0));
		var moneyNodeAction = cc.moveBy(0.5, cc.v2((com.screenWidth/2+this.moneyNode.width/2), 0));
		var numNodeAction = cc.moveBy(0.5, cc.v2(-(com.screenWidth/2+this.numNode.width/2), 0));
		var levelNodeAction = cc.moveBy(0.5, cc.v2(-(com.screenWidth/2+this.levelNode.width/2), 0));
		var tagNodeAction = cc.moveBy(0.5, cc.v2((com.screenWidth/2+this.tagNode.width/2), 0));
		var buttonTagNodeAction = cc.moveBy(0.5, cc.v2(-(com.screenWidth/2+this.buttonTagNode.width/2), 0));
		var buttonNodeAction = cc.moveBy(0.5, cc.v2(-(com.screenWidth/2+this.buttonNode.width/2), 0));
		this.topLabelNode.runAction(topLabelAction);
		this.moneyNode.runAction(moneyNodeAction);
		this.numNode.runAction(numNodeAction);
		this.tagNode.runAction(tagNodeAction);
		this.levelNode.runAction(levelNodeAction);
		this.buttonTagNode.runAction(buttonTagNodeAction);
		this.buttonNode.runAction(buttonNodeAction);
	},

    start () {

    },

    // update (dt) {},
});
