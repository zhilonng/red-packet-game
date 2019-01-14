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
var indexCom = require('index-common');
import XMLHttp from '../utils/XMLHttp'
cc.Class({
    extends: cc.Component,

    properties: {
		packet_num : cc.Label,
		money : cc.Label,
		rank : cc.Label,
		_avatar_list : [],
		_http: null,
		btn_create_game: cc.Button
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
		this._http = new XMLHttp();
		
		this.node.active = false;
		com.overWindow = this;
		
		if (com.isOver) {
			this.show();
			this.setData(com.packetNum, com.score, 1);
		}
    },

    start () {

    },
	
	getRank() {
  	  var url = indexCom.url + '/mobile.php?s=game/rank';
  	  var tag = 'rank';
  	  var param1 = 'roomID='+indexCom.roomID+'&score='+com.score;
	  // var param1 = 'roomID=1721308926592421908&score=1';
  	  var param2 = [];
  	  this._http.post(this, url ,tag, param1, param2);
	},
	
	callback(data, tag, param) {
		console.log('rank');
		if (tag === 'rank') {
			var data = eval('(' + data + ')');
			if (data.status === 1) {
				this.setRank(data.rank);
				com.rankLayout.setAvatars(data.list);
			}
		}
	},
	
	setRank(rank=0) {
		this.rank.string = rank;
	},

	setData(paket_num=0, money=0, rank=0) {
		this.packet_num.string = paket_num + '个';
		this.money.string = money + '元';
	},

	show() {
		this.getRank();
		this.node.active = true;
		var action = cc.fadeIn(1.0);
		this.node.runAction(action);
	},

	hide() {
		this.node.active = false;
		var action = cc.fadeOut(1.0);
		this.node.runAction(action);
	}

    // update (dt) {},
});
