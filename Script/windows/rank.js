// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
		avatar: cc.Prefab,
		_width: 0,
		_height: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		com.rankLayout = this;
    	this._width = this.node.width;
		this._height = this.node.height;
		this.postions = [];
		this.i = 0;
    },
	
	setAvatars(list) {
		this.positions = this.avatarPositions(list.length);
		this.setAvatar(list, list.length-1);
	},
	
	setAvatar(list, index) {
		if (index === -1) return;
		var imgUrl = list[index].header_url + '?a'+index+'=a'+index+'.jpg';
		cc.loader.load(imgUrl,function (err, texture) {
			console.log('load texture');
			var frame=new cc.SpriteFrame(texture);
			com.rankLayout.setAvatarPrefab(frame);
			com.rankLayout.setAvatar(list, index-1);
		});
	},
	
	// setAvatars(list) {
// 		this.positions = this.avatarPositions(list.length);
// 		for(var i=0; i<list.length; i++) {
// 			var imgUrl = list[i].header_url + '?aa=aa.jpg';
// 			cc.loader.load(imgUrl,function (err, texture) {
// 				console.log('load texture');
// 				var frame=new cc.SpriteFrame(texture);
// 				com.rankLayout.setAvatarPrefab(frame);
// 			});
// 			// console.log('create avatarPrefab');
// // 			var avatarPrefab = cc.instantiate(this.avatar);
// // 			avatarPrefab.x = positions[i];
// // 			avatarPrefab.y = 0;
// // 			avatarPrefab.width = 80;
// // 			avatarPrefab.height = 80;
// // 			this.node.addChild(avatarPrefab);
// // 			this.setAvatar(list[i].header_url, avatarPrefab);
// 		}
// 	},
	
	setAvatarPrefab(frame) {
		var avatarPrefab = cc.instantiate(this.avatar);
		avatarPrefab.x = this.positions[this.i];
		avatarPrefab.y = 0;
		avatarPrefab.width = 80;
		avatarPrefab.height = 80;
		this.node.addChild(avatarPrefab);
		avatarPrefab.getComponent(cc.Sprite).spriteFrame = frame;
		this.i ++ ;
	},
	
	// setAvatar(url, prefab) {
// 		var imgUrl = url + '?aa=aa.jpg';
// 		cc.loader.load(imgUrl,function (err, texture) {
// 			console.log('load texture');
// 			var frame=new cc.SpriteFrame(texture);
// 			prefab.getComponent(cc.Sprite).spriteFrame = frame;
// 		});
// 	},
	
	avatarPositions(num) {
		var total_width = num*80 + (num-1)*30;
		var positions = [];
		for (var i=num; i>0; i--) {
			positions.push((-(total_width/2) + (i-1)*110 + 40));
		}
		return positions;
	},

    start () {
    },

    // update (dt) {},
});
