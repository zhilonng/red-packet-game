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
		level1UnSelect: cc.Button,
		level1Selected: cc.Button,
		level2UnSelect: cc.Button,
		level2Selected: cc.Button,
		level3UnSelect: cc.Button,
		level3Selected: cc.Button,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	this.level1UnSelect.node.active = false;
		this.level2Selected.node.active = false;
		this.level3Selected.node.active = false;
    },
	
	level1UnSelectClicked: function() {
		this.clickButton(false, this.level1UnSelect.node._name)
	},
	
	level2UnSelectClicked: function() {
		this.clickButton(false, this.level2UnSelect.node._name)
	},
	
	level3UnSelectClicked: function() {
		this.clickButton(false, this.level3UnSelect.node._name)
	},

    start () {

    },
	
	clickButton(isSelect=false, money=0) {
		com.level = money;
		switch(money) {
			case 'level1' :
				if(!isSelect) {
					this.level1UnSelect.node.active = false;
					this.level1Selected.node.active = true;
					this.level2UnSelect.node.active = true;
					this.level2Selected.node.active = false;
					this.level3UnSelect.node.active = true;
					this.level3Selected.node.active = false;
				}
				break;
			case 'level2' :
				if(!isSelect) {
					this.level1UnSelect.node.active = true;
					this.level1Selected.node.active = false;
					this.level2UnSelect.node.active = false;
					this.level2Selected.node.active = true;
					this.level3UnSelect.node.active = true;
					this.level3Selected.node.active = false;
				}
				break;
			case 'level3' :
				if(!isSelect) {
					this.level1UnSelect.node.active = true;
					this.level1Selected.node.active = false;
					this.level2UnSelect.node.active = true;
					this.level2Selected.node.active = false;
					this.level3UnSelect.node.active = false;
					this.level3Selected.node.active = true;
				}
				break;
		}
	}

    // update (dt) {},
});
