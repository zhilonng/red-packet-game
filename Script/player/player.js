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
const ONE_BULLET = 1;
const TWO_BULLETS = 2;
const THREE_BULLETS = 3;
cc.Class({
    extends: cc.Component,

    properties: {
		userId: 20,
		userName: 'zhilonng',
        bullet_prefab: {
            type: cc.Prefab,
            default: null,
        },
		moreBulletTime : 0,
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
		cc.director.getCollisionManager().enabled =true;
        //获得触摸移动事件
		com.player = this;
		this._pool = new cc.NodePool('PoolHandler');
    },
	
	// shoot_bullet(numPerTime = 1) {
// 		switch(numPerTime) {
// 			case ONE_BULLET :
// 				this.schedule(this._shoot_three_bullet.bind(this), 0.3);
// 				break;
// 		}
// 	},

    // 碰撞事件
    onCollisionEnter: function(other, self) {
		console.log('game over');
		com.canvas.sendOverMsg();
		com.isOver = true
		com.overWindow.show();
		com.overWindow.setData(com.packetNum, com.score, 1);
    },
	
	_shoot_one_bullet1() {
		com.shootType = 1
		com.shootDirection = 1
		this._shoot_one_bullet(0, 1)
	},
	
	_shoot_one_bullet(offset = 0, direction = 1) {
		var bullet = this._pool.get();
		if (!bullet) {
			bullet = cc.instantiate(this.bullet_prefab);
			bullet.addComponent('PoolHandler');
		}
		bullet.direction = direction;
        bullet.x = this.node.x + offset;
        bullet.y = this.node.y + 80;
		this.node.parent.addChild(bullet);
	},
	
	_shoot_three_bullet() {
		com.shootType = 3
		com.shootDirection = 0
		this._shoot_one_bullet(-50, 0)
		com.shootDirection = 1
		this._shoot_one_bullet()
		com.shootDirection = 2
		this._shoot_one_bullet(50, 2)
	},
	
	_shoot_second_bullet() {
		com.shootType = 2
		com.shootDirection = 1
		this._shoot_one_bullet(-35, 1);
		com.shootDirection = 1
		this._shoot_one_bullet(35, 1);
	},
	
    removeTo(x) {
        this.node.x = x;
    },
	
	removeNode(bullet) {
		this._pool.put(bullet)
	},
	
	setShootType(typeCode, exitTime) {
		com.shootType = typeCode
		this.moreBulletTime = exitTime
		com.bg.resetPropTimeAndType()
	},

    start () {

    },
	
	onDestroy() {
		this.node.off('touchmove',this.onTouchMoveEvent,this);
	},

    update (dt) {
		if (!com.isOver) {
			if (com.frame % 6 === 0)
				switch(com.shootType) {
					case ONE_BULLET :
						this._shoot_one_bullet1()
						break
					case TWO_BULLETS :
						this._shoot_second_bullet()
						break
					case THREE_BULLETS :
						this._shoot_three_bullet()
						break
					}
			if (com.frame % 60 === 0) {
				if (this.moreBulletTime > 0)
					this.moreBulletTime --;
				if (this.moreBulletTime == 0)
					com.shootType = 1;
			}
		}
    },
});
