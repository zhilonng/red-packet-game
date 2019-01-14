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
		rotationSpeed: 90,
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
		this.node.zIndex = 1;
		
		cc.director.getCollisionManager().enabled =true;
		// this.node.x = this.randomNum(-com.screenWidth/2 + this.node.width/2, com.screenWidth/2 - this.node.width/2);
		this.id = com.enemys.length + 1;
		this.node.x = this.randomNum(this.node.width/2 - com.screenWidth/2, com.screenWidth/2 - this.node.width/2);
		this.node.y = com.screenHeight/2;
		this.node.y = 1334/2;
        this.speed_x = 0;
        this.speed_y = -3;
		com.enemys.push(this);
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

    // 碰撞事件
    onCollisionEnter: function(other, self) {
		com.bg.removeNoNumEnemy(this.node);
    },

    start () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		this.node.y += this.speed_y * 1.5 * com.speed;
		this.node.angle += dt*this.rotationSpeed
        if (this.node.y <= -com.screenHeight/2) {
			com.canvas.sendOverMsg();
			com.isOver = true
			com.overWindow.show();
			com.overWindow.setData(com.packetNum, com.score, 1);
			com.bg.removeNoNumEnemy(this.node);
            return ;
        }
		if (com.isOver) {
			this.node.removeFromParent();
		}
    },
});
