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
import XMLHttp from '../utils/XMLHttp';
let instance;
cc.Class({
    extends: cc.Component,

    properties: {
		balance: cc.Label,
		editBox: cc.EditBox,
		withdraw: cc.Button,
		loading: cc.Node,
		_http: null,
		_balance: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		instance = this;
    	this._http = new XMLHttp();
		this.init();
    },
	
	init() {
		this.getBalance();
	},
	
	getBalance() {
		var url = indexCom.url + '/mobile.php?s=game/getBalance';
		var tag = 'balance';
		// var param1 = 'roomID='+indexCom.roomID;
		if (indexCom.debug) {
			var param1 = 'userid=2';
		} else {
			var param1 = 'userid=' + indexCom.userid;
		}
		var param2 = [];
		this._http.post(this, url ,tag, param1, param2);
	},
	
	callback(data, tag, param) {
		if (tag === 'balance') {
			var data = eval('(' + data + ')');
			if (indexCom.debug) {
				console.log(data);
			}
			if (data.status === 1) {
				this._balance = data.balance;
				this.balance.string = data.balance + '元';
			}
		} else if (tag === 'withdraw') {
			var data = eval('(' + data + ')');
			if (indexCom.debug) {
				console.log(data);
			}
			if (data.status === 1) {
				this.showLoading('已提交提现申请～');
				this.init();
			} else {
				this.showLoading(data.msg);
			}

		}
	},
	
	withdrawClicked() {
		var money = this.editBox.string;
		if (this.isNumber(money)) {
			if (money < 1 || money > this._balance || money > 5000) {
				this.showLoading('超出限制金额...');
				return;
			}
			this.post_withdraw(money);
		} else {
			this.showLoading('请输入数字...');
		}
	},
	
	post_withdraw(money) {
		var url = indexCom.url + '/mobile.php?s=game/withdraw';
		var tag = 'withdraw';
		// var param1 = 'roomID='+indexCom.roomID;
		if (indexCom.debug) {
			var param1 = 'userid=2&withdraw_money='+money;
		} else {
			var param1 = 'userid=' + indexCom.userid+'&withdraw_money='+money;
		}
		var param2 = [];
		this._http.post(this, url ,tag, param1, param2);
	},
	
	showLoading(text) {
		this.loading.active = true;
		this.loading.getChildByName('Label').getComponent(cc.Label).string = text;
		setTimeout(this.hideLoading, 3000);
	},
	
	hideLoading() {
		instance.loading.active = false;
	},
	
	isNumber(val) {
		var reg = /^[0-9]+.?[0-9]*$/;
		if (reg.test(val)) {
			return true;
		}
		return false;
	},

    start () {

    },

    // update (dt) {},
});
