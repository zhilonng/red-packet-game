var com = require('index-common');
var match = require('match-common');
var mvs = require('matchvs.all')
var gameCom = require('common');
import XMLHttp from './XMLHttp'
let instance
export default class MatchVs {
  constructor() {
	  if ( instance ) {
	  	return instance
	  }
	  instance = this;
	  this._mvs_id = null;
	  this._mvs_token = null;
	  this._http = new XMLHttp();
	  this.engine = null;
	  this.rsp = null;
	  this.gameID = '214272';
	  this.appkey = 'aec33d5753874441bb50408ac8bebf76';
	  this.secret = '81a6ec5fc73a47449ef0e3ece029fc65';
	  this.DeviceID = 'abcdef';
	  this.gatewayID = 0;
	  this.gameVersion = 1;
	  this.isReconnecting = false;
  }
  
  login(obj, mvs_id=null, mvs_token=null) {
	  this._mvs_id = mvs_id;
	  this._mvs_token = mvs_token;
	  this.engine = new mvs.MatchvsEngine();
	  console.log('engine init')
	  this.rsp = new mvs.MatchvsResponse();
	  console.log('rsp init')
	  this.rsp.initResponse = this.initResponse.bind(this);
	  this.rsp.registerUserResponse = this.registerUserResponse.bind(this);
	  this.rsp.loginResponse = obj.loginResponse.bind(obj);
	  this.rsp.logoutResponse = this.logoutResponse.bind(this);
	  this.rsp.gameServerNotify = this.gameServerNotify.bind(this);
	  this.rsp.sendEventResponse = this.sendEventResponse.bind(this);
	  this.rsp.errorResponse = this.errorResponse.bind(this);
	  this.rsp.reconnectResponse = this.reconnectResponse.bind(this);
	  this.engine.init(this.rsp,'Matchvs','release',this.gameID);
  }
  
  initResponse(status) {
	  if (status === 200) {
		  console.log('初始化成功:'+status)
		  if (this._mvs_id) {
			  this.Login(this._mvs_id, this._mvs_token);
		  } else {
			  this.engine.registerUser();
		  }
	  } else {
		  console.log('初始化失败，错误码：'+status);
	  }
  }
  
  errorResponse(error) {
	  console.log('错误信息：' + error);
	  switch(error) {
	  	case 1001:
			alert(error);
			this.tryReconnect();
			break;
		case 201:
			this.engine.joinRoom(com.roomID, '断线重连');
			break;
	  }
  }
  
  tryReconnect() {
	  if (this.isReconnecting) {
		  return;
	  }
	  this.isReconnecting = true;
	  this.engine.reconnect();
  }
  
  reconnectResponse(status,roomUserInfoList,roomInfo) {
	  alert('reconnect:' + status)
	  this.isReconnecting = false;
	  if(status == 200) {
		  alert('重连成功')
	  } else {
		  this.tryReconnect();
		  console.log("重连失败"+status);
	  }
  }
  
  registerUserResponse(userInfo) {
	  if (userInfo.status ===0) {
		  console.log('注册成功，开始登录，登录ID是：'+userInfo.id+'token是'+userInfo.token);
		  // 登录
		  this.Login(userInfo.id,userInfo.token);
		  // 设置全局
		  com.gameinfo['mvs_id'] = userInfo.id;
		  com.gameinfo['mvs_token'] = userInfo.token;
		  // 数据库操作
		  var url = com.url + '/mobile.php?s=index/setMVSInfo';
		  var param = 'userid='+com.userid+'&mvsid='+userInfo.id+'&mvstoken='+userInfo.token;
		  var tag = 'register';
		  this._http.post(this, url, tag, param);
	  } else {
		  console.log('注册失败错误状态码为：'+userInfo.status);
	  }
  }
  
  loginResponse(loginRsp) {
	  console.log(loginRsp)
	  if (loginRsp.status === 200) {
		  console.log('恭喜你登录成功，来到Matchvs的世界，你已经成功的迈出了第一步，Hello World');
	  } else {
		  console.log('登录失败');
	  }
  }
  
  Login(userID,token) {
	  this.engine.login(userID,token,this.gameID,this.gameVersion,this.appkey,this.secret,this.DeviceID,this.gatewayID)
  }
  
  loginResponse(loginRsp) {
	  if (loginRsp.status === 200) {
		  console.log('恭喜你登录成功，来到Matchvs的世界，你已经成功的迈出了第一步，Hello World');
	  } else {
		  console.log('登录失败');
	  }
  }
  
  logout(obj) {
	  this.engine.logout('')
  }
  
  logoutResponse(status) {
	  console.log(status)
  }
  
  createRoomGS(obj, roomName, maxPlayer, mode, canWatch, visibility, roomProperty) {
	  var data = {};
	  data['event'] = 'createRoom';
	  data['user_id'] = com.gameinfo['mvs_id'];
	  data['roomName'] = roomName;
	  data['maxPlayer'] = maxPlayer;
	  data['mode'] = mode;
	  data['canWatch'] = canWatch;
	  data['visibility'] = visibility;
	  data['roomProperty'] = roomProperty;
	  console.log(data.toString());
	  var data = this.engine.sendEvent('hello');
	  console.log("发送信息 result"+ data.result);
  }
  
  sendEventEx(obj, cpProto) {
	  this.rsp.sendEventResponse = obj.sendEventResponse.bind(obj);
	  var result = this.engine.sendEventEx(1, cpProto, 0, []);
	  console.log("sendEventEx result"+result);
  }
  
  createRoom(obj, roomName, maxPlayer, mode, canWatch, visibility, roomProperty) {
	  this.rsp.createRoomResponse = obj.createRoomResponse.bind(obj);
	  var createRoom = new mvs.MsCreateRoomInfo();
	  createRoom.roomName = '欢乐多宝';
	  createRoom.maxPlayer = maxPlayer;
	  createRoom.mode = mode;
	  createRoom.canWatch = canWatch;
	  createRoom.visibility = visibility;
	  createRoom.roomProperty = roomProperty;
	  console.log(createRoom);
	  var result = this.engine.createRoom(createRoom, '', {});
	  console.log("createRoom result"+result);
  }
  
  joinRoom(obj, roomID, userProfile) {
	  if (com.isPlayer && match.isInRoom && roomID == match.enterRoomID) {
		  alert('已经在房间里');
		  return;
	  }
	  this.rsp.joinRoomResponse = obj.joinRoomResponse.bind(obj);
	  console.log('user try enter room :' + roomID);
	  var result = this.engine.joinRoom(roomID, userProfile);
	  console.log("加入指定房间 result"+result);
  }
  
  leaveRoom(obj) {
	  console.log('leave room')
	  this.rsp.leaveRoomResponse = obj.leaveRoomResponse.bind(obj);
	  var result = this.engine.leaveRoom('');
	  console.log('离开房间result:' +result);
  }
  
  sendEventResponse(sendEventRsp) {
      if (sendEventRsp.status == 200) {
          console.log("发送消息成功");
      } else {
          console.log("发送消息失败 status"+sendEventRsp.status);
      }
  }
  
  gameServerNotify(eventInfo) {
	  let info = eval('(' + eventInfo.cpProto + ')');
	  console.log(info)
	  switch( info.event ) {
	  	case 'count_down_time' :
			if (match.match_page != null) {
				match.countDown = info['time']
				match.match_page.countDown();
			}
			break;
		case 'user_score' :
			gameCom.score = info['score'];
			break;
		case 'game_over' :
			var cur = cc.director.getRunningScene();
			if (cur._name === 'match') {
				com.wxCommon.openRankList();
			}
			
			gameCom.isOver = true
			gameCom.overWindow.show();
			gameCom.overWindow.setData(gameCom.packetNum, gameCom.score, 1);
			break;
		case 'user_creater_room_success' :
			com.roomID = info.roomID;
			com.step = "player";
			this.leaveRoom(this);
			break;
		case 'server_is_ready' :
			console.log('server_is_ready');
			com.indexButton.payAndcreateGame();
			break;
	  }
      
  }
  
  setRoomID() {
	  var url = com.url + '/mobile.php?s=pay/setRoomID';
	  var tag = 'roomid';
	  var url_href = window.location.href;
	  var param1 = 'orderid='+com.orderid+'&roomID='+com.roomID;
	  var param2 = [];
	  this._http.post(this, url ,tag, param1, param2);
  }
  
  joinRoomResponse(status, userInfoList, roomInfo) {
	  if (status === 200) {
		  if (com.debug) {
			  console.log("进入房间成功");
			  console.log("房间用户列表：", userInfoList);
			  console.log("房间信息：", roomInfo);
		  }
		  if (com.step === 'player') {
			  this.setRoomID()
		  }
	  } else {
		  alert("进入游戏房间失败"+status);
	  }
  }
  
  leaveRoomResponse(leaveRoomRsp) {
      if (leaveRoomRsp.status == 200) {
		  match.isInRoom = false;
		  this.joinRoom(this, com.roomID, 'palyer');
      } else {
		  alert("离开房间失败"+leaveRoomRsp.status);
      }
  }
  
  // createRoom(name, maxPlayer, mode, canWatch, visibility, rommProperty) {
// 	this.rsp.createRoomResponse = this.createRoomResponse.bind(this);
//   	var createRoom = new mvs.MsCreateRoomInfo();
// 	createRoom.name = 'roomName';
// 	createRoom.maxPlayer = 30;
// 	createRoom.mode = 0;
// 	createRoom.canWatch = 1;
// 	createRoom.visibility = 1;
// 	createRoom.roomProperty = '白天模式';
// 	var result = engine.createRoom(createRoom,"Matchvs");
// 	console.log("createRoom result"+result);
//   }
  
  callback(data, tag, param) {
  	  if (tag === 'register') {
  		  console.log('mvs register:' + data);
  		  return;
  	  } else if (tag === 'userinfo') {
  	  } else if (tag === 'roomid') {
		  com.indexButton.hideLoading();
		  cc.director.loadScene('match');
	  }
    } 
}
