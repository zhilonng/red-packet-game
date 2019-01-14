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
var gameCom = require('common');
var matchCom = require('match-common');
import WeiXin from '../utils/wx'
import MatchVs from '../utils/matchvs'
import CommonUtil from '../utils/CommonUtil'
import XMLHttp from '../utils/XMLHttp'
cc.Class({
    extends: cc.Component,

    properties: {
		loading: cc.Node,
		rank: cc.Prefab,
		_mvs: null,
		_wx: null,
		_common: null,
		_http: null,
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
		com.wxCommon = this;
		this._mvs = new MatchVs();
		this._wx = new WeiXin(this);
		this._common = new CommonUtil();
		this._http = new XMLHttp();
		

		com.isWxMini = window.__wxjs_environment == 'miniprogram';
		if (com.isWxMini) com.session = this._wx.getParam('session')
		var cur = cc.director.getRunningScene();
		if (cur._name === 'home') {
			// 判断是否玩家
			var roomID = this._wx.checkIsPlayer();
			if (roomID) {
				com.isPlayer = true;
				com.roomID = roomID;
				com.orderid = this._wx.getOrderId();
				cc.director.loadScene('match');
				return;
			}
		}
		if (com.isPlayer || cur._name === 'home') {
			if (cur._name === 'match') {
				var toast = Toast.makeText(' 正在初始化游戏数据... ', Toast.LENGTH_LONG);
				toast.setGravity(Toast.CENTER, 0, 0);
			}
			if (!com.debug && !com.isWxMini) {
				this._wx.setWxShareTitle('今年春节，我凭实力来抢红包!', '换一种方式过大年，这里有凭实力抢的红包哦～', 'https://game.cj102.com/game/');
				this._wx.getUserInfo();
			} else if (com.isWxMini) {
				this._wx.getUserInfoMini();
			} else {
				this.loginMVS('1899534', 'RIDQUJEXTHGFAMCTRXAEXXFKIGMLPIKB')
			}
		}
    },
	
	openRankList() {
		let rank = cc.instantiate(this.rank);
		this.node.parent.addChild(rank);
	},
	
	loginMVS(id, token) {
		this._mvs.login(this, id, token);
	},
	
	registerMVS() {
		this._mvs.login(this);
	},
	
    loginResponse(loginRsp) {
  	  if (loginRsp.status === 200) {
  		  console.log('恭喜你登录成功，来到Matchvs的世界，你已经成功的迈出了第一步，Hello World');
		  console.log('isPlayer:' + com.isPlayer + 'roomID:' + com.roomID);
		  var cur = cc.director.getRunningScene();
		  if (cur._name === 'home') {
			  this.loading.active = false;
		  }
		  if (com.isPlayer && com.roomID != -1) {
			  this.getGameInfo();
		  }
  	  } else {
		  alert('登录失败');
  	  }
    },
	
	getGameInfo() {
    	  var url = com.url + '/mobile.php?s=pay/getNewestRoom';
    	  var tag = 'info';
    	  var param1 = 'id='+com.orderid+'&roomID='+com.roomID;
    	  var param2 = [];
    	  this._http.post(this, url ,tag, param1, param2);
	},
	
	callback(data, tag, param) {
		if (tag === 'info') {
			var data = eval('(' + data + ')');
			if (data.status === 1) {
				com.roomID = data.info._newest_room_id;
				com.redPackNum = data.info.red_packet_num;
				com.money = data.info.total_fee;
				gameCom.level = data.info.level;
				
				if (com.userid === data.info.user_id) {
					matchCom.isOwner = true;
					
					if (matchCom.match_page != null) {
						matchCom.match_page.setFangZhuActive();
					}
				}
				
				if (matchCom.match_page != null) {
					matchCom.match_page.init();
				}
				this._common.setGameInfo(data.info.red_packet_num, data.info.real_fee, data.info.level)
				this._common.caculateValueAndMaxEnemyNum();
				this._mvs.joinRoom(this, com.roomID, '');
			}
		}
	},
	
	joinRoomResponse(status, userInfoList, roomInfo) {
	    if (status === 200) {
	        console.log("进入房间成功");
	        console.log("房间用户列表：", userInfoList);
	        console.log("房间信息：", roomInfo);
	    } else {
			alert("进入房间失败, 游戏已结束,错误id："+status);
			this.openRankList();
	    }
	},
	
	createRoom() {
		// 创建房间
		var roomName = '欢乐夺宝';
		var maxPlayer = 100;
		var mode = 0;
		var canWatch = 0;
		var visibility = 0;
		var roomProperty = '{"redPackNum":"'+com.redPackNum+'", "money":"'+com.money+'", "value": "' +gameCom.value+ '"}';
		this._mvs.createRoom(this, roomName, maxPlayer, mode, canWatch, visibility, roomProperty.toString());
	},
	
    createRoomResponse(CreateRoomRsp) {
		this._creating = false;
		if (CreateRoomRsp.status == 200) {
			com.roomID = CreateRoomRsp.roomID;
			// cc.director.loadScene('match');
		} else {
			var toast = Toast.makeText(' 创建游戏失败，请联系客服... ', Toast.LENGTH_SHORT);
			toast.setGravity(Toast.CENTER, 0, 0);
			toast.show();
		}
    },
	
    createRoomResponse(CreateRoomRsp) {
		this._creating = false;
		if (CreateRoomRsp.status == 200) {
			com.roomID = CreateRoomRsp.roomID;
			this.pay();
			// cc.director.loadScene('match');
		} else {
			var toast = Toast.makeText(' 创建游戏失败，请联系客服... ', Toast.LENGTH_SHORT);
			toast.setGravity(Toast.CENTER, 0, 0);
			toast.show();
		}
    },

    start () {
    },

    // update (dt) {},
});
