var com = require('index-common');
var matchCom = require('match-common');
var gameCom = require('common');

let instance
export default class CommonUtil {
  constructor() {
	  if ( instance ) {
	  	return instance
	  }
	  instance = this;
  }
  
  setGameInfo(redPackNum, money, level) {
	  com.redPackNum = redPackNum;
	  com.money = money;
	  com.level = level;
  }
  
  
  caculateValueAndMaxEnemyNum() {
	  var value = 0;
	  var maxEnemyNum = 0;
	  var speed = 1;
	  if (parseFloat(com.money / (7.5*com.redPackNum)) >= 0.01) {
		  value = parseFloat(com.money / (7.5*com.redPackNum)).toFixed(2);
		  maxEnemyNum = 15;
	  } else if (parseFloat(com.money / (6*com.redPackNum)) >= 0.01) {
		  value = parseFloat(com.money / (6*com.redPackNum)).toFixed(2);
		  maxEnemyNum = 12;
	  } else if (parseFloat(com.money / (5*com.redPackNum)) >= 0.01) {
		  value = parseFloat(com.money / (5*com.redPackNum)).toFixed(2);
		  maxEnemyNum = 10;
	  } else if (parseFloat(com.money / (4*com.redPackNum)) >= 0.01) {
		  value = parseFloat(com.money / (4*com.redPackNum)).toFixed(2);
		  maxEnemyNum = 8;
	  } else if (parseFloat(com.money / (3*com.redPackNum)) >= 0.01) {
		  value = parseFloat(com.money / (3*com.redPackNum)).toFixed(2);
		  maxEnemyNum = 6;
	  } else if (parseFloat(com.money / (2*com.redPackNum)) >= 0.01) {
		  value = parseFloat(com.money / (2*com.redPackNum)).toFixed(2);
		  maxEnemyNum = 4;
	  } else if (parseFloat(com.money / (1*com.redPackNum)) >= 0.01) {
		  value = parseFloat(com.money / (1*com.redPackNum)).toFixed(2);
		  maxEnemyNum = 2;
	  } else if (parseFloat(com.money / (0.5*com.redPackNum)) >= 0.01) {
		  value = parseFloat(com.money / (0.5*com.redPackNum)).toFixed(2);
		  maxEnemyNum = 1;
	  }
	  switch (com.level) {
	  	case 'level1' :
			speed = 1;
			break;
		case 'level2' :
			speed = 1.2;
			break;
		case 'level3' :
			speed = 1.5;
			break;
	   }
	   
	   gameCom.value = value;
	   gameCom.maxEnemyNum = maxEnemyNum;
	   gameCom.speed = speed;
   }
}
