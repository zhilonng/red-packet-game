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
import XMLHttp from '../utils/XMLHttp'
cc.Class({
    extends: cc.Component,

    properties: {
		scrollView : cc.ScrollView,
		title: cc.Prefab, 
		item: cc.Prefab,
		modeIcons: {
			default: [],
			type:cc.SpriteFrame
		},
		loading: cc.Node,
		_http: null,
		_simple: [],
		_normal: [],
		_hard: [],
    },
	
	onLoad() {
		this.loading.active = true;
		this.loading.getChildByName('Label').getComponent(cc.Label).string = '加载中...';
		this._http = new XMLHttp();
		this.getGameList();
	},
	
	draw() {
		var position = 0;
		if (this._hard) {
			this.addTitle(2, -74);
			for (var i=0; i < this._hard.length; i++) {
				var p = -188-(i*140);
				this.addItem(this._hard[i].total_fee, this._hard[i].red_packet_num, this._hard[i].create_time, this._hard[i].join_num, p);
				if (i === this._hard.length-1) {
					position = p - 70;
				}
			}
		}
		if (this._normal) {
			this.addTitle(1, -74+position);
			for (var i=0; i < this._normal.length; i++) {
				var p = -188+position-(i*140);
				this.addItem(this._normal[i].total_fee, this._normal[i].red_packet_num, this._normal[i].create_time, this._normal[i].join_num, p);
				if (i === this._normal.length-1) {
					position = p - 70;
				}
			}
		}
		if (this._simple) {
			this.addTitle(0, -74+position);
			for (var i=0; i < this._simple.length; i++) {
				var p = -188+position-(i*140);
				this.addItem(this._simple[i].total_fee, this._simple[i].red_packet_num, this._simple[i].create_time, this._simple[i].join_num, p);
				if (i === this._simple.length-1) {
					position = p - 70;
				}
			}
		}
		this.scrollView.content._contentSize.height = -(position - 140);
		
		this.loading.active = false;
	},
	
	addItem(total_fee, redPactNum, create_time, join_num, y) {
		let itemPrefab = cc.instantiate(this.item);
		itemPrefab.getChildByName('title').getComponent(cc.RichText).string = this.itemTitleFormat(total_fee, redPactNum);
		itemPrefab.getChildByName('num').getComponent(cc.Label).string = '共'+join_num+'人参与';
		itemPrefab.getChildByName('time').getComponent(cc.Label).string = create_time;
		itemPrefab.y = y;
		this.scrollView.content.addChild(itemPrefab);
	},
	
	addTitle(mode, y) {
		let titlePrefab = cc.instantiate(this.title);
		titlePrefab.getChildByName('mode').getComponent(cc.Sprite).spriteFrame = this.modeIcons[mode];
		titlePrefab.y = y;
		this.scrollView.content.addChild(titlePrefab);
	},

    start () {

    },
	
	itemTitleFormat(money, num) {
		return '<color=#F24D4D>' + money + '</color><color=#000000>元</color><color=#F24D4D>' + num + '</color><color=#000000>个红包</color>';
	},
	
	getGameList() {
    	  var url = indexCom.url + '/mobile.php?s=game/getGameList';
    	  var tag = 'gamelist';
    	  // var param1 = 'roomID='+indexCom.roomID;
		  if (indexCom.debug) {
			  var param1 = 'userid=2';
		  } else {
			  var param1 = 'userid=' + indexCom.userid;
		  }
		  
    	  var param2 = [];
    	  this._http.post(this, url ,tag, param1, param2);
	},
	
	formatTime(timeStamp) {
		var date = new Date();
		date.setTime(timeStamp * 1000);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
	},
	
	callback(data, tag, param) {
		if (tag === 'gamelist') {
			var data = eval('(' + data + ')');
			if (data.status === 1) {
				let list = data.list;
				for (var i=0; i<list.length; i++) {
					switch (list[i].level) {
						case 'level1' :
							this._simple.push(list[i]);
							break;
						case 'level2' :
							this._normal.push(list[i]);
							break;
						case 'level3' :
							this._hard.push(list[i]);
							break;
					}
				}
				this.draw();
			}
		}
	},

    // update (dt) {},
});
