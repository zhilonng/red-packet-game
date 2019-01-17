var com = require('index-common');
var matchCom = require('match-common');
var gameCom = require('common');
import MatchVs from '../utils/matchvs'
import XMLHttp from '../utils/XMLHttp'
import CommonUtil from '../utils/CommonUtil'
cc.Class({
    extends: cc.Component,

    properties: {
        buttonBegin: {
			default: [],
			type: cc.Button,
        },
		buttonRule: cc.Button,
		buttonCloseRule: cc.Button,
		buttonCreateGame: cc.Button,
		buttonStar: cc.Button,
		buttonStarSlected: cc.Button,
		buttonMe: cc.Button,
		buttonMeSelected: cc.Button,
		loading: cc.Node,
		_mvs: null,
		_http: null,
		_page:0,// 0:主页；1:我的
		_creating: false, //是否正在创建游戏
		_common : null,
		_success: false,
    },
	
	onLoad() {
		com.indexButton = this;
		this._mvs = new MatchVs();
		this._http = new XMLHttp();
		this._common = new CommonUtil();
		this.buttonStar.node.active = false;
		this.buttonStarSlected.node.active = true;
		this.buttonMe.node.active = true;
		this.buttonMeSelected.node.active = false;

	},

    buttonBeginClicked: function() {
		// this.showLoading(' 努力加载中... ');
		com.create_page.showNodeAnimation();
		// this.getCreaterRoomID();
    },
	
	loadingClicked: function() {
		
	},
	
	showLoading(text) {
		if (!this.loading.active)
			this.loading.active = true;
		this.loading.getChildByName('Label').getComponent(cc.Label).string = text;
	},
	
	hideLoading() {
		this.loading.active = false;
	},
	
	buttonRuleClicked: function() {
		com.ruleWindow.show();
	},
	
	buttonCloseRuleClicked: function() {
		com.ruleWindow.hide();
	},
	
	buttonCreateGameClicked: function() {
		// 判断是否可创建游戏
		if (!this.couldBegin()) {
			alert('请选择金额与红包数量...');
			return
		}
		this.showLoading('正在为您努力创建游戏...');
		this._creating = false;
		// 防止再次创建
		if (this._creating === true)
			return;
		
		this._creating = true;
		
		this.createUserRoom();
		// if (com.isWxMini) {
// 			this.generateMiniOrder();
// 		} else {
// 			this.getorder();
// 		}
		
	},
	
	payAndcreateGame() {
		if (com.isWxMini) {
			this.generateMiniOrder();
		} else {
			this.getorder();
		}
	},

	getCreaterRoomID() {
		var url = 'https://alphavsopen.matchvs.com/wc5/getGameData.do?';
		var param1 = 'gameID=214272&userID=1899534&keyList=[{"key":"createrRoomID"}]&sign=c5ea199d2e0bed9da789a3dcac77ab04';
		var tag = 'get_creater_room_id';
		var param2 = [];
		this._http.post(this, url, tag, param1, param2);
	},
	
	createUserRoom() {
		let roomName = 'creater';
		let maxPlayer = 2;
		let mode = 0;
		let canWatch = 1;
		let visibility = 1;
		let roomProperty = '白天模式';
		this._mvs.createRoom(this, roomName, maxPlayer, mode, canWatch, visibility, roomProperty)
	},
	
	createRoom() {
		this.showLoading('请求创建房间...')
		this._common.caculateValueAndMaxEnemyNum();
		if (com.debug) {
			com.gameinfo['mvs_id'] = '1899534';
		}
		var cpProto = '{"event":"creater_room", "creater_room_id":"'+com.createrRoomId+'", "owner_id" : "'+com.gameinfo['mvs_id']+'", "redPackNum" : "'+com.redPackNum+'", "money":"'+com.money+'", "value": "' +gameCom.value+ '"}';
		this._mvs.sendEventEx(this, cpProto);
	},
	
    sendEventResponse(sendEventRsp) {
        if (sendEventRsp.status == 200) {
            console.log("发送消息成功");
        } else {
			alert('通信异常，错误状态:' + sendEventRsp.status);
            console.log("发送消息失败 status"+sendEventRsp.status);
        }
    },
	
	sendReadyInfo() {
		this.showLoading('请求生成游戏...')
		this._common.caculateValueAndMaxEnemyNum();
		if (com.debug) {
			com.gameinfo['mvs_id'] = '1899534';
		}
		var cpProto = '{"event":"is_ready_to_create_room"}';
		this._mvs.sendEventEx(this, cpProto);
	},
	
	couldBegin() {
		if (com.redPackNum === 0 || com.money === 0) {
			return false;
		}
		return true;
	},
	
	leaveRoomResponse(leaveRoomRsp) {
	    if (leaveRoomRsp.status == 200) {
	        console.log("离开房间成功");
	    } else {
	        console.log("离开房间失败"+leaveRoomRsp.status);
	    }
	},
	
	joinRoomResponse(status, userInfoList, roomInfo) {
		if (status === 200) {
			this.hideLoading();
			console.log("进入房间成功");
			console.log("房间用户列表：", userInfoList);
			console.log("房间信息：", roomInfo);
			if (com.step === 'creater') {
				
			}
		} else {
			console.log("进入房间失败"+status);
		}
	},
	
    createRoomResponse(CreateRoomRsp) {
		this._creating = false;
		if (CreateRoomRsp.status == 200) {
			com.createrRoomId = CreateRoomRsp.roomID
			this.sendReadyInfo();
			// cc.director.loadScene('match');
		} else {
			this.showLoading('创建游戏失败，错误id：1')
		}
    },
	
	buttonStarClicked: function() {
		if (this._page === 1) {
			console.log('change to index')
			this._page = 0;
			this.buttonStar.node.active = false;
			this.buttonStarSlected.node.active = true;
			this.buttonMe.node.active = true;
			this.buttonMeSelected.node.active = false;
			
			com.me_page.hide();
			com.index_page.showGame();
			
		}
	},
	
	buttonMeClicked: function() {
		if (this._page === 0) {
			console.log('change to me')
			this._page = 1;
			this.buttonStar.node.active = true;
			this.buttonStarSlected.node.active = false;
			this.buttonMe.node.active = false;
			this.buttonMeSelected.node.active = true;
			
			com.me_page.show();
			com.index_page.hideGame();
		}
	},
	
	/**
	* 支付getorder
	**/
    getorder() {
  	  var url = com.url + '/mobile.php?s=pay/pay';
  	  var tag = 'pay';
  	  var param1 = 'total_fee='+com.money+'&user_id='+com.userid+'&redPacketNum='+com.redPackNum + '&value=' + gameCom.value + '&level=' + com.level;
	  
	  var param2 = [];
  	  this._http.post(this, url ,tag, param1, param2);
    },
	
	generateMiniOrder() {
		var url = com.url + '/mobile.php?s=pay/payMini';
    	var tag = 'payMini';
    	var param1 = 'total_fee='+com.money+'&user_id='+com.userid+'&redPacketNum='+com.redPackNum + '&value=' + gameCom.value + '&level=' + com.level;
		var param2 = [];
    	this._http.post(this, url ,tag, param1, param2);
	},
	
	callback(data, tag, param) {
		if (tag === 'pay') {
			var data = eval('(' + data + ')');
            if(data.code!=0){
                alert(data.message);
            }
			com.orderid = data.orderid;
			com.realOrderId = data.realOrderid;
			if (com.debug) {
				this.paysuccess()
			} else {
	            if (typeof WeixinJSBridge == "undefined") {
	                if (document.addEventListener) {
	                    document.addEventListener('WeixinJSBridgeReady', this.onBridgeReady, false);
	                } else if (document.attachEvent) {
	                    document.attachEvent('WeixinJSBridgeReady', this.onBridgeReady);
	                    document.attachEvent('onWeixinJSBridgeReady', this.onBridgeReady);
	                }
	            } else {
	                this.onBridgeReady(data);
	            }
			}
            
		}else if (tag === 'payMini') {
			var data = eval('(' + data + ')');
            if(data.code!=0){
                alert(data.message);
            }
			com.orderid = data.orderid;
			com.realOrderId = data.realOrderid;
	
			// 发送订单给小程序，并进入轮训；
			this.naviToMini();
			this.sendTimerToCheckOrder();
		} else if (tag === 'get_creater_room_id') {
			var data = eval('(' + data + ')');
			com.createrRoomId = data.data.dataList[0].value;
			if (com.createrRoomId != null) {
				com.step = 'creater';
				this._mvs.joinRoom(this, com.createrRoomId, 'creater');
			}
		} else if (tag === 'orderid') {
			console.log(data);
		} else if (tag === 'payover') {
			console.log('payover')
			console.log(data)
			var data = eval('(' + data + ')');
			if (data.code === 0) {
				alert(data.message);
			}
		} else if (tag === 'orderStatus') {
			var data = eval('(' + data + ')');
			if (data.code === 0 && data.order_status === 1) {
				if ( !this._success ) {
					this.createRoom();
					this._success = true;
				}
					
				this.unscheduleOrderStatus();
			} else if (data.code === 0 && data.order_status === -1) {
				if ( !this._success ) {
					alert('支付失败');
				}
				this.unscheduleOrderStatus();
			}
		}
	},
	
	naviToMini() {
		if (wx !== 'undefined') {
			let path = '/pages/pay/pay?orderid=' + com.orderid;
			wx.miniProgram.navigateTo({
				url : path
			}); 
		}
	},
	
	checkOrderStatus() {
		var url = com.url + '/mobile.php?s=pay/orderStatus';
    	var tag = 'orderStatus';
    	var param1 = 'orderid='+com.orderid;
		var param2 = [];
    	this._http.post(this, url ,tag, param1, param2);
	},
	
	unscheduleOrderStatus() {
		this.unschedule(this.checkOrderStatus);
	},
	
	sendTimerToCheckOrder() {
		this._success = false;
		this.schedule(this.checkOrderStatus, 1);
	},

   onBridgeReady(sdata) {
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', sdata,
            function (res) {
				// this.checkOrderStatus();
                if(res.err_msg == "get_brand_wcpay_request:ok" ){
                    com.indexButton.paysuccess();
                }     // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。
            }
        );
    },

    paysuccess() {
		this.createRoom();
		var url = com.url + '/mobile.php?s=pay/r_payover';
		var tag = 'payover';
		var param1 = 'orderid='+com.realOrderId;
		var param2 = [];
		this._http.post(this, url ,tag, param1, param2);
    },
});