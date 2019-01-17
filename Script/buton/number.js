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
		OneHundredUnSelect: cc.Button,
		OneHundredSelected: cc.Button,
		OneHundredFiftyUnSelect: cc.Button,
		OneHundredFiftySelected: cc.Button,
		TwoHundredUnSelect: cc.Button,
		TwoHundredSelected: cc.Button,
		TwoHundredFiftyUnSelect: cc.Button,
		TwoHundredFiftySelected: cc.Button,
		threeDotsUnSelect: cc.Button,
		threeDotsSelected: cc.Button,
		numberContainer: cc.Node,
		userNumberContainer: cc.Node,
		editBox: cc.EditBox,
    },
	
	editBoxTextChanged: function() {
		var number = this.editBox.string;
		if (this.isNumber(number)) {
			com.redPackNum = parseInt(number);
			this.editBox.string = number;
		} else {
			com.number = 0;
			this.editBox.string = '';
		}
	},

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    	this.OneHundredSelected.node.active = false;
    	this.OneHundredFiftySelected.node.active = false;
    	this.TwoHundredSelected.node.active = false;
    	this.TwoHundredFiftySelected.node.active = false;
    	this.threeDotsSelected.node.active = false;
		this.userNumberContainer.active = false;
    },
	
	threeDotsUnSelectClicked: function() {
		this.numberContainer.active = false;
		this.userNumberContainer.active = true;
		this.threeDotsUnSelect.node.active = false;
		this.threeDotsSelected.node.active = true;
	},
	
	threeDotsSelectedClicked: function() {
		this.numberContainer.active = true;
		this.userNumberContainer.active = false;
		this.threeDotsUnSelect.node.active = true;
		this.threeDotsSelected.node.active = false;
	},
	
	OneHundredUnSelectClicked: function() {
		this.clickButton(false, this.OneHundredUnSelect.node._name)
	},
	
	OneHundredFiftyUnSelectClicked: function() {
		this.clickButton(false, this.OneHundredFiftyUnSelect.node._name)
	},
	
	TwoHundredUnSelectClicked: function() {
		this.clickButton(false, this.TwoHundredUnSelect.node._name)
	},
	
	TwoHundredFiftyUnSelectClicked: function() {
		this.clickButton(false, this.TwoHundredFiftyUnSelect.node._name)
	},

    start () {

    },
	
	clickButton(isSelect=false, money=0) {
		console.log('isSelect:'+isSelect+',money:'+money)
		com.redPackNum = parseInt(money);
		switch(money) {
			case '100' :
				if(!isSelect) {
					this.OneHundredSelected.node.active = true;
					this.OneHundredUnSelect.node.active = false;
					this.OneHundredFiftyUnSelect.node.active = true;
					this.OneHundredFiftySelected.node.active = false;
					this.TwoHundredUnSelect.node.active = true;
					this.TwoHundredSelected.node.active = false;
					this.TwoHundredFiftyUnSelect.node.active = true;
					this.TwoHundredFiftySelected.node.active = false;
				}
				break;
			case '150' :
				if(!isSelect) {
					this.OneHundredSelected.node.active = false;
					this.OneHundredUnSelect.node.active = true;
					this.OneHundredFiftyUnSelect.node.active = false;
					this.OneHundredFiftySelected.node.active = true;
					this.TwoHundredUnSelect.node.active = true;
					this.TwoHundredSelected.node.active = false;
					this.TwoHundredFiftyUnSelect.node.active = true;
					this.TwoHundredFiftySelected.node.active = false;
				}
				break;
			case '200' :
				if(!isSelect) {
					this.OneHundredSelected.node.active = false;
					this.OneHundredUnSelect.node.active = true;
					this.OneHundredFiftyUnSelect.node.active = true;
					this.OneHundredFiftySelected.node.active = false;
					this.TwoHundredUnSelect.node.active = false;
					this.TwoHundredSelected.node.active = true;
					this.TwoHundredFiftyUnSelect.node.active = true;
					this.TwoHundredFiftySelected.node.active = false;
				}
				break;
			case '250' :
				if(!isSelect) {
					this.OneHundredSelected.node.active = false;
					this.OneHundredUnSelect.node.active = true;
					this.OneHundredFiftyUnSelect.node.active = true;
					this.OneHundredFiftySelected.node.active = false;
					this.TwoHundredUnSelect.node.active = true;
					this.TwoHundredSelected.node.active = false;
					this.TwoHundredFiftyUnSelect.node.active = false;
					this.TwoHundredFiftySelected.node.active = true;
				}
				break;
		}
	},
	
	isNumber(val) {
		var reg = /^[0-9]+.?[0-9]*$/;
		if (reg.test(val)) {
			return true;
		}
		return false;
	}

    // update (dt) {},
});
