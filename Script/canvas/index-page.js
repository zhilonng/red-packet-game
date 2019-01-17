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
		adverNode: cc.Node,
		adverLabel: cc.Label,
		avatarSprite: cc.Sprite,
		nameLabel: cc.Label,
		gameNode: cc.Node,
		bottom: cc.Node,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		com.index_page = this;
		
    	this.init();
		this.setScreenSize();
		this._phone_arr = ['139', '138', '137', '136', '135', '134', '178', '170', '188', '187', '183', '182', '159', '158', '157', '152', '150', '147', '186', '185', '156', '155', '130', '131', '132', '189', '180', '153'];
		this.adverLabel.string = '用户'+this._phone_arr[this.randomNum(0,27)]+'****'+this.randomNum(1000,9999)+'已获得¥'+this.randomNum(20,99)+'红包';
	},
	
	setAvatarFrame(frame) {
		this.avatarSprite.spriteFrame=frame;
	},
	
	setName(name) {
		this.nameLabel.string = '嗨！'+name+'\n换一种发红包的方式，与好友分享快乐！'
	},
	
	setAvatar(url) {
		var imgUrl = url + '?aa=aa.jpg';
		cc.loader.load(imgUrl,function (err, texture) {
		         var frame=new cc.SpriteFrame(texture);
				 com.index_page.setAvatarFrame(frame);
				 com.me_page.setAvatarFrame(frame);
		         // this.avatarNode.spriteFrame=frame;
		    });
	},
	
	setActive(active) {
		this.node.active = active;
	},
	
	init() {
		var moveTop = cc.moveBy(0.5, cc.v2(this.top.x, -150));
		this.top.runAction(moveTop);
		
		if (window.__wxjs_environment == 'miniprogram') {
			this.bottom.y += 62;
		}
	},

    start () {

    },
	
	randomNum(minNum , maxNum) {
		switch(arguments.length){ 
		        case 1: 
		            return parseInt(Math.random()*minNum+1,10); 
		        break; 
		        case 2: 
		            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10); 
		        break; 
		            default: 
		                return 0; 
		            break; 
		    }
	},
	
	showGame() {
		this.gameNode.active = true;
	},
	
	hideGame() {
		this.gameNode.active = false;
	},
	
	setScreenSize() {
		let windowSize=cc.view.getVisibleSize();
		com.screenHeight = windowSize.height;
		com.screenWidth = windowSize.width;
	},

    update (dt) {
    	com.frame ++ ;
		if (com.frame % 600 === 0) {
			var moveUp = cc.moveBy(0.2, cc.v2(this.adverLabel.x, 15));
			var moveDown = cc.moveBy(0, cc.v2(this.adverLabel.x, -30));
			var move = cc.moveBy(0.2, cc.v2(this.adverLabel.x, 15));
			this.adverNode.runAction(moveUp);
			this.adverNode.runAction(moveDown);
			this.adverNode.runAction(move);
			this.adverLabel.string = '用户'+this._phone_arr[this.randomNum(0,27)]+'****'+this.randomNum(1000,9999)+'已获得¥'+this.randomNum(20,99)+'红包';
		}
    },
});
