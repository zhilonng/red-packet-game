// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
import MatchVs from '../utils/matchvs'
var com = require('common');
cc.Class({
    extends: cc.Component,

    properties: {
		point : cc.Label,
		starAnim : cc.Prefab,
		rotationSpeed: 90,
		zIndex: 0
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
		this.setPoint(com.enemyScore);
		this.node.x = this.randomNum(this.node.width/2 - com.screenWidth/2, com.screenWidth/2 - this.node.width/2);
		this.node.y = com.screenHeight/2;
		this.node.y = 1334/2;
        this.speed_x = 0;
        this.speed_y = -3;
		this.real_score = com.enemyScore;
		com.enemys.push(this);
    },
	
	setPoint(point) {
		this.node.score = point
		this.point.string = point;
		this.node.width = 60 + 7 * point;
		this.node.height = 60  + 7 * point;
		let collider = this.getComponent(cc.CircleCollider);
		collider._radius = this.node.width/2;
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
	
	_generate_star() {
		var star = cc.instantiate(this.starAnim);
		
		star.x = this.node.x;
		star.y = this.node.y;
		this.node.parent.addChild(star);
	},

    // 碰撞事件
    onCollisionEnter: function(other, self) {
		if (this.node.score > 1) {
			this.setPoint(this.node.score - 1)
		} else {
			if (this.node._parent === null) {
				return;
			}
			com.canvas.addScore(this.real_score);
			com.canvas.addAndSetPacket();
			this._generate_star();
			this.node.removeFromParent();
		}
    },

    start () {

    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
		this.node.y += this.speed_y * com.speed;
		this.node.angle += dt*this.rotationSpeed
        if (this.node.y <= -com.screenHeight/2) {
			com.canvas.sendOverMsg();
			com.isOver = true
			com.overWindow.show();
			com.overWindow.setData(com.packetNum, com.score, 1);
			this.node.removeFromParent();
            return ;
        }
		if (com.isOver) {
			this.node.removeFromParent();
		}
    },
});
