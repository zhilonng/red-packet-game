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
		scrollView: cc.ScrollView,
		item: cc.Prefab,
		_http: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		this._http = new XMLHttp();
		this.itemList = [];
    	this.init();
    },
	
	getRank() {
  	  var url = indexCom.url + '/mobile.php?s=game/rankList';
  	  var tag = 'rank';
  	  var param1 = 'roomID='+indexCom.roomID; 
	  // var param1 = 'roomID=1721308926592421908';
  	  var param2 = [];
  	  this._http.post(this, url ,tag, param1, param2);
	},
	
	callback(data, tag, param) {
		if (tag === 'rank') {
			var data = eval('(' + data + ')');
			var op = 'add';
			if (data.status === 1) {
				var list = data.list;
				for (var i=0; i<list.length; i++) {
					if (list[i].mvs_id === indexCom.gameinfo['mvs_id']) {
						this.addItem(i,0, list[i]);
						this.addItem(i,i+1, list[i]);
						op = 'normal';
					} else {
						this.addItem(i,i+1, list[i]);
						// if (op === 'add') {
// 							this.addItem(i,i+1, list[i]);
// 						} else if (op === 'normal') {
// 							this.addItem(i,i, list[i]);
// 						}
						
					}
					
				}
			}
		}
	},
	
	init() {
		this.getRank();
	},
	
	addItem(index, position, data) {
		let itemPrefab = cc.instantiate(this.item);
		var avatar = itemPrefab.getChildByName('avatar-container').getChildByName('avatar').getComponent(cc.Sprite);
		this.loadImg(avatar, data.header_url);
		itemPrefab.getChildByName('rank').getComponent(cc.Label).string = index+1;
		if ((index+1) === 1) {
			itemPrefab.getChildByName('rank').color = new cc.color(255,100,94,255);
		} else if ((index+1) === 2) {
			itemPrefab.getChildByName('rank').color = new cc.color(255,165,108,255);
		} else if ((index+1) === 3) {
			itemPrefab.getChildByName('rank').color = new cc.color(255,206,33,255);
		}
		itemPrefab.getChildByName('name').getComponent(cc.Label).string = data.nickname;
		itemPrefab.getChildByName('money').getComponent(cc.Label).string = data.score;
		itemPrefab.y = -50 - position*100;
		this.scrollView.content.addChild(itemPrefab);
	},
	
	loadImg: function(container,url){
		url = url + '?b1=b1.jpg';
		cc.loader.load(url, function (err, texture) {
			var sprite  = new cc.SpriteFrame(texture);
			container.spriteFrame = sprite;
		});
	},

    start () {

    },

    // update (dt) {},
});
