var com = require('index-common');
var matchCom = require('match-common');
import XMLHttp from './XMLHttp'
let instance;
export default class WeiXin {
  constructor(obj = null) {
	  this._wx_instance = obj
	  if ( instance ) {
	  	return instance
	  }
	  instance = this;
	  this.appid = 'wx61ac593f812b98db';
	  this._wx = false;
	  this.jssdk = null;
	  this._http = new XMLHttp();
  }
  
  getUserOpenId() {
	  wx.login({
		  success: function (res) {
			  var wcode = res.code;
			  console.info("you code"+wcode);
			  // 使用 code 请求你的 获取openID的服务
		  },
		  fail: function (res) {
			  console.log("get code failed:",res);
		  },
	  });
  }
  
  enterWxAuthor(){
	  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid='+ this.appid +'&redirect_uri='+ window.location.href +'&response_type=code&scope=snsapi_userinfo#wechat_redirect';
  }
  
  setWxShareTitle(title, describe, shareUrl) {
	  var url = com.url + '/mobile.php?s=index/getConfig';
	  var tag = 'config';
	  var url_href = window.location.href;
	  url_href = url_href.replace(/\&/g, 'changjing');
	  var param1 = 'platid=1&code='+this.getParam('code')+'&url_href='+url_href;
	  console.log(param1);
	  var param2 = [];
	  param2['title'] = title;
	  param2['describe'] = describe;
	  param2['shareUrl'] = shareUrl;
	  this._http.post(this, url ,tag, param1, param2);
  }
  
  importJsSdk() {
	  return null;
  }
  
  setShare(config, title, describe, shareUrl) {
	  /*---------JSSDK初始化-----------*/
	  var data = {
		  appId:config['appId'],
		  timestamp:config['timestamp'],
		  nonceStr:config['nonceStr'],
		  signature:config['signature'],
	  }
	  
	  wx.config({
		  appId: data.appId,
		  timestamp: data.timestamp,
		  nonceStr: data.nonceStr,
		  signature: data.signature,
		  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ','onMenuShareWeibo', 'onMenuShareQZone', 'chooseImage', 'uploadImage']
	  });
      wx.ready(function () {
		  window.shareData = {
			  title: title, // 分享标题
			  desc: describe, // 分享描述
			  link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
			  imgUrl: 'http://img.cj102.com/hb_zfx.png', // 分享图标
			  // type: '', // 分享类型,music、video或link，不填默认为link
			  // dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			  success: function (msg) {
			  },
			  cancel: function (msg) {
				  // alert('no')
				  // 用户取消分享后执行的回调函数
			  }
		  };
		  wx.onMenuShareAppMessage(shareData);
		  wx.onMenuShareTimeline(shareData);
      })
  }
  
  setShareInMatch(title, describe, shareUrl) {
	  window.shareData.title = title;
	  window.shareData.desc = describe;
	  window.shareData.link = shareUrl
  }
  
  getUserInfo() {
	  var code = this.getParam('code')
	  if (code) {
		  var url = com.url + '/mobile.php?s=index/registerUser/code/' + code+'/platid/1';
		  var tag = 'userinfo';
		  this._http.get(this, url, tag, null);
	  } else{
		  var roomID = this.getParam('roomID');
		  var id = this.getParam('id');
		  var url = com.url + '/game'
		  if (roomID) {
			  url = url + '?roomID=' + roomID + '&id=' + id;
		  }
		  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx61ac593f812b98db&redirect_uri='+ url + '&response_type=code&scope=snsapi_userinfo#wechat_redirect';
	  }
  }
  
  getUserInfoMini() {
	  if (com.session) {
		  var url = com.url + '/mobile.php?s=mini/getUserInfoMini/session/' + com.session;
		  var tag = 'userinfo';
		  this._http.get(this, url, tag, null);
	  }
  }
  
  
  
  getParam(paramName) {
	  var t={
		  getQueryString:function(name){
			  var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
			  var r = window.location.search.substr(1).match(reg);
			  if(r!=null)
				  return  decodeURI(r[2]);
	              return null;
			  }
		  }
      return t.getQueryString(paramName)
		 
	  // var paramValue = "", isFound = !1;
// 	  if (this.location.search.indexOf("?") == 0 && this.location.search.indexOf("=") > 1) {
// 		  var arrSource = unescape(this.location.search).substring(1, this.location.search.length).split("&"), i = 0;
// 		  while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++
// 	  }
// 	  return paramValue == "" && (paramValue = null), paramValue
  }
  
  checkIsPlayer() {
	  // 判断是否玩家
	  var roomID = this.getParam('roomID');
	  return roomID;
  }
  
  getOrderId() {
	  var id = this.getParam('id');
	  return id;
  }
  
  callback(data, tag, param) {
	  if (tag === 'config') {
		  console.log('config:' + data);
		  var config = eval('(' + data + ')');
		  this.setShare(config, param['title'], param['describe'], param['shareUrl'])
		  return;
	  } else if (tag === 'userinfo') {
		  var info = eval('(' + data + ')');
		  if (info['status'] === 1 || info['status'] === 2) {
			  // 共有字段
			  com.userid = info['userid'];
			  com.userinfo = info['userinfo'];
			  var cur = cc.director.getRunningScene();
			  if (com.index_page != null && cur._name === 'home') {
				  com.index_page.setAvatar(com.userinfo['header_url']);
				  com.index_page.setName(com.userinfo['nickname']);
			  } else {
				  matchCom.match_page.setAvatar(com.userinfo['header_url']);
			  }
			  if (com.me_page != null && cur._name === 'home') {
				  com.me_page.setName(com.userinfo['nickname']);
			  }
		  }
		  if (info['status'] === 1) {
			  com.wxCommon.registerMVS();
		  } else if (info['status'] === 2){
			  com.gameinfo['mvs_id'] = info['mvs_id'];
			  com.gameinfo['mvs_token'] = info['mvs_token'];
			  com.wxCommon.loginMVS(info['mvs_id'], info['mvs_token']);
		  } else {
			  window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx61ac593f812b98db&redirect_uri='+ com.url + '/game&response_type=code&scope=snsapi_userinfo#wechat_redirect';
		  }
		  return;
	  }
  }
}