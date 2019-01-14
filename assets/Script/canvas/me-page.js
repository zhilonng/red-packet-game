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
		top: cc.Node,
		item1: cc.Node,
		item2: cc.Node,
		item3: cc.Node,
		item4: cc.Node,
		item5: cc.Node,
		avatarSprite: cc.Sprite,
		nameLabel: cc.Label,
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
		com.me_page = this;
    	this.node.active = false;
    },

    start () {

    },
	
	setName(name) {
		this.nameLabel.string = name;
	},
	
	setAvatarFrame(frame) {
		this.avatarSprite.spriteFrame=frame;
	},
	
	setActive(active) {
		this.node.active = active;
	},
	
	show() {
		this.node.active = true;
		var item1Action = cc.moveBy(0.3, cc.v2(com.screenWidth, 0));
		var item2Action = cc.moveBy(0.4, cc.v2(com.screenWidth, 0));
		var item3Action = cc.moveBy(0.5, cc.v2(com.screenWidth, 0));
		var item4Action = cc.moveBy(0.6, cc.v2(com.screenWidth, 0));
		var item5Action = cc.moveBy(0.7, cc.v2(com.screenWidth, 0));
		this.item1.runAction(item1Action);
		this.item2.runAction(item2Action);
		this.item3.runAction(item3Action);
		this.item4.runAction(item4Action);
		this.item5.runAction(item5Action);
	},
	
	hide() {
		var item1Action = cc.moveBy(0.3, cc.v2(-com.screenWidth, 0));
		var item2Action = cc.moveBy(0.4, cc.v2(-com.screenWidth, 0));
		var item3Action = cc.moveBy(0.5, cc.v2(-com.screenWidth, 0));
		var item4Action = cc.moveBy(0.6, cc.v2(-com.screenWidth, 0));
		var item5Action = cc.moveBy(0.7, cc.v2(-com.screenWidth, 0));
		this.item1.runAction(item1Action);
		this.item2.runAction(item2Action);
		this.item3.runAction(item3Action);
		this.item4.runAction(item4Action);
		this.item5.runAction(item5Action);
		this.node.active = false;
	}

    // update (dt) {},
});
