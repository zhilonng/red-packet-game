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
    	this._speed = 100;
		this._acc_speed = 20;
		this._target_x = -com.screenWidth/2 + 300;
		this._target_y = com.screenHeight/2 - 50;
		var point0 = {};
		var point2 = {};
		point0['x'] = this._target_x;
		point0['y'] = this._target_y;
		var point1 = this.caculateCrt(this.node.x, this.node.y, this._target_x, this._target_y, 30);
		point2['x'] = this.node.x;
		point2['y'] = this.node.y;
		this.move(point0, point1, point2);
		// this.b = this.caculateB(point0, point1, point2)
// 		this.a = this.caculateA(point0, point1, this.b)
// 		this.c = this.caculateC(point0, this.a, this.b)
// 		this.mode = this.node.x - this._target_x ? 'reduce' : 'add';
// 		this.modeY = this._target_y - this.node.y ? 'add' : 'reduce';
// 		this.x_mode = Math.abs((this._target_y - this.node.y)/(this._target_x - this.node.x)) > 1? 'off' : 'on';
    },
	
	move(point0, point1, point2) {
		var bezier = [cc.v2(point2['x'], point2['y']), cc.v2(point1['x'], point1['y']), cc.v2(point0['x'], point0['y'])];
		var bezierTo = cc.bezierTo(2, bezier);
		this.node.runAction(bezierTo);
	},
	
	caculateCrt(x1, y1, x2, y2, offset) {
		let crt = {};
		let a = (x1-x2)/(y2-y1)
		var centerX = (x1 + x2) / 2;
		var centerY = (y1 + y2) / 2;
		let b = centerY - a * centerX;
		crt['x'] = centerX + offset;
		crt['y'] = a*crt['x'] + b;
		return crt;
	},
	
	caculateB(point0, point1, point2) {
		let a = parseFloat(point2['x']*point2['x'] - point1['x']*point1['x']);
		let b = parseFloat(point0['x']*point0['x'] - point1['x']*point1['x']);
		return (a*(point0['y']-point1['y']) - b*(point2['y']-point1['y']))/(a*(point0['x']-point1['x'])-b*(point2['x']-point1['x']));
	},
	
	caculateA(point0, point1, b) {
		return ((point0['y'] - point1['y']) - (point0['x'] - point1['x'])*b)/(point0['x']*point0['x'] - point1['x']*point1['x']);
	},
	
	caculateC(point0, a, b) {
		return point0['y'] - point0['x']*point0['x']*a - point0['x']*b;
	},
	
	getY(x, a, b, c) {
		return	x*x*a+x*b+c;
	},
	
	getX(y, a, b, c) {
		return Math.sqrt(y/a - (4*a*c-b*b)/(4*a*a)) - b/(2*a)
	},

    start () {

    },

    update (dt) {
		// this._speed += this._acc_speed
// 		if (this.x_mode === 'on') {
// 			if (this.mode === 'reduce')
// 				this.node.x -= this._speed*dt;
// 			if (this.mode === 'add')
// 				this.node.x += this._speed*dt;
			this.node.opacity -= 2;
// 			this.node.y = this.getY(this.node.x , this.a, this.b, this.c)
// 			if (this.mode ==='reduce' && this.node.x <= this._target_x)
// 				this.node.removeFromParent();
// 			if (this.mode == 'add' && this.node.x >= this._target_x)
// 				this.node.removeFromParent();
// 		} else if (this.x_mode === 'off') {
// 			if (this.modeY === 'reduce')
// 				this.node.y -= this._speed*dt;
// 			if (this.modeY === 'add')
// 				this.node.y += this._speed*dt;
// 			this.node.opacity = 255;
// 			this.node.x = this.getX(this.node.y, this.a, this.b, this.c)
// 			if (this.modeY ==='reduce' && this.node.y <= this._target_y)
// 				this.node.removeFromParent();
// 			if (this.modeY == 'add' && this.node.y >= this._target_y)
// 				this.node.removeFromParent();
// 		}
    },
});
