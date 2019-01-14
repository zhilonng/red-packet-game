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
		moneyFiveUnSelect: cc.Button,
		moneyFiveSelected: cc.Button,
		moneyTenUnSelect: cc.Button,
		moneyTenSelected: cc.Button,
		moneyTwentyUnSelect: cc.Button,
		moneyTwentySelected: cc.Button,
		moneyFiftyUnSelect: cc.Button,
		moneyFiftySelected: cc.Button,
		moneyHundredUnSelect: cc.Button,
		moneyHundredSelected: cc.Button,
		threeDotsUnSelect: cc.Button,
		threeDotsSelected: cc.Button,
		moneyContainer: cc.Node,
		userMoneyContainer: cc.Node,
		editBox: cc.EditBox,
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

	onLoad() {
		this.moneyFiveSelected.node.active = false;
		this.moneyTenSelected.node.active = false;
		this.moneyTwentySelected.node.active = false;
		this.moneyFiftySelected.node.active = false;
		this.moneyHundredSelected.node.active = false;
		this.threeDotsSelected.node.active = false;
		this.userMoneyContainer.active = false;
	},

    start () {

    },
	
	editBoxTextChanged: function() {
		var money = this.editBox.string;
		if (this.isNumber(money)) {
			com.money = parseInt(money);
			this.editBox.string = money;
		} else {
			com.money = 0;
			this.editBox.string = '';
		}
	},
	
	moneyFiveUnSelectClicked: function() {
		this.clickButton(false, this.moneyFiveUnSelect.node._name)
	},
	
	moneyTenUnSelectClicked: function() {
		this.clickButton(false, this.moneyTenUnSelect.node._name)
	},
	
	moneyTwentyUnSelectClicked: function() {
		this.clickButton(false, this.moneyTwentyUnSelect.node._name)
	},
	
	moneyFiftyUnSelectClicked: function() {
		this.clickButton(false, this.moneyFiftyUnSelect.node._name)
	},
	
	moneyHundredUnSelectClicked: function() {
		this.clickButton(false, this.moneyHundredUnSelect.node._name)
	},
	
	threeDotsUnSelectClicked: function() {
		this.moneyContainer.active = false;
		this.userMoneyContainer.active = true;
		this.threeDotsUnSelect.node.active = false;
		this.threeDotsSelected.node.active = true;
	},
	
	threeDotsSelectedClicked:function() {
		this.moneyContainer.active = true;
		this.userMoneyContainer.active = false;
		this.threeDotsUnSelect.node.active = true;
		this.threeDotsSelected.node.active = false;
	},
	
	clickButton(isSelect=false, money=0) {
		console.log('isSelect:'+isSelect+',money:'+money)
		com.money = parseInt(money);
		switch(money) {
			case '5' :
				console.log('555')
				if(!isSelect) {
					console.log('click:'+this.moneyFiveUnSelect.node._name)
					this.moneyFiveSelected.node.active = true;
					this.moneyFiveUnSelect.node.active = false;
					this.moneyTenUnSelect.node.active = true;
					this.moneyTenSelected.node.active = false;
					this.moneyTwentyUnSelect.node.active = true;
					this.moneyTwentySelected.node.active = false;
					this.moneyFiftyUnSelect.node.active = true;
					this.moneyFiftySelected.node.active = false;
					this.moneyHundredUnSelect.node.active = true;
					this.moneyHundredSelected.node.active = false;
				}
				break;
			case '10' :
				if(!isSelect) {
					console.log('click:'+this.moneyTenUnSelect.node._name)
					this.moneyFiveSelected.node.active = false;
					this.moneyFiveUnSelect.node.active = true;
					this.moneyTenUnSelect.node.active = false;
					this.moneyTenSelected.node.active = true;
					this.moneyTwentyUnSelect.node.active = true;
					this.moneyTwentySelected.node.active = false;
					this.moneyFiftyUnSelect.node.active = true;
					this.moneyFiftySelected.node.active = false;
					this.moneyHundredUnSelect.node.active = true;
					this.moneyHundredSelected.node.active = false;
				}
				break;
			case '20' :
				if(!isSelect) {
					console.log('click:'+this.moneyTwentyUnSelect.node._name)
					this.moneyFiveSelected.node.active = false;
					this.moneyFiveUnSelect.node.active = true;
					this.moneyTenUnSelect.node.active = true;
					this.moneyTenSelected.node.active = false;
					this.moneyTwentyUnSelect.node.active = false;
					this.moneyTwentySelected.node.active = true;
					this.moneyFiftyUnSelect.node.active = true;
					this.moneyFiftySelected.node.active = false;
					this.moneyHundredUnSelect.node.active = true;
					this.moneyHundredSelected.node.active = false;
				}
				break;
			case '50' :
				if(!isSelect) {
					console.log('click:'+this.moneyFiftyUnSelect.node._name)
					this.moneyFiveSelected.node.active = false;
					this.moneyFiveUnSelect.node.active = true;
					this.moneyTenUnSelect.node.active = true;
					this.moneyTenSelected.node.active = false;
					this.moneyTwentyUnSelect.node.active = true;
					this.moneyTwentySelected.node.active = false;
					this.moneyFiftyUnSelect.node.active = false;
					this.moneyFiftySelected.node.active = true;
					this.moneyHundredUnSelect.node.active = true;
					this.moneyHundredSelected.node.active = false;
				}
				break;
			case '100' :
				if(!isSelect) {
					console.log('click:'+this.moneyHundredUnSelect.node._name)
					this.moneyFiveSelected.node.active = false;
					this.moneyFiveUnSelect.node.active = true;
					this.moneyTenUnSelect.node.active = true;
					this.moneyTenSelected.node.active = false;
					this.moneyTwentyUnSelect.node.active = true;
					this.moneyTwentySelected.node.active = false;
					this.moneyFiftyUnSelect.node.active = true;
					this.moneyFiftySelected.node.active = false;
					this.moneyHundredUnSelect.node.active = false;
					this.moneyHundredSelected.node.active = true;
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
