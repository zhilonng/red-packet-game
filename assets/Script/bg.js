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
cc.Class({
    extends: cc.Component,

    properties: {
		enemys: cc.Prefab,
		noNumEnemys: cc.Prefab,
		Bone: cc.Prefab,
		propTwoBullets: cc.Prefab,
		propThreeBullets: cc.Prefab,
		propBone: cc.Prefab,
		nextPropCreateTime: 0,
		nextPropType: 1, //<6: 双枪，>=6:三枪
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

    onLoad () {
		this.nextPropCreateTime = this.randomNum(1000, 2000)
		this.nextPropBoneCreateTime = this.randomNum(1500, 2800);
		this.nextPropType = this.randomNum(1, 9)
		com.bg = this;
		this.num = 0;
		// this._pool = new cc.NodePool('PoolHandler');
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this.node);
		this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMoveEvent, this.node);
		this._pool = new cc.NodePool('PoolHandler');
    },
	
	resetPropTimeAndType() {
		this.nextPropCreateTime = this.randomNum(1200, 2500)
		this.nextPropType = this.randomNum(1, 9)
	},
	
	resetPropBoneTime() {
		this.nextPropBoneCreateTime = this.randomNum(1500, 2800);
	},
	
	// generateEnemy() {
// 		this.schedule(this._generate_enemy.bind(this), 3);
// 	},
	
	// _generate_enemy() {
// 		com.enemyScore = this.randomNum(1, 12);
// 		var enemy = this._pool.get();
// 		let needChangeScore = enemy ? true : false;
// 		if (!enemy) {
// 			this.num++;
// 			var enemy = cc.instantiate(this.enemys);
// 			enemy.addComponent('PoolHandler');
// 		}
//
// 		enemy.x = this.randomNum(enemy.width/2, com.screenWidth - enemy.width/2);
// 		enemy.y = com.screenHeight;
// 		if (needChangeScore) {
// 			enemy.setPoint(com.enemyScore);
// 		}
//
// 		this.node.parent.addChild(enemy);
// 	},

	_generate_prop_two_bullets() {
		var prop = cc.instantiate(this.propTwoBullets)
		
		prop.x = this.randomNum(prop.width/2, com.screenWidth - prop.width/2);
		prop.y = com.screenHeight;
		this.node.parent.addChild(prop);
	},
	
	_generate_prop_three_bullets() {
		var prop = cc.instantiate(this.propThreeBullets)
		
		prop.x = this.randomNum(prop.width/2, com.screenWidth - prop.width/2);
		prop.y = com.screenHeight;
		this.node.parent.addChild(prop);
	},
	
	_generate_enemy() {
		com.enemyScore = this.randomNum(1, com.maxEnemyNum);
		var enemy = cc.instantiate(this.enemys);
		
		enemy.x = this.randomNum(enemy.width/2, com.screenWidth - enemy.width/2);
		enemy.y = com.screenHeight;
			
		this.node.parent.addChild(enemy);
	},
	
	_generate_no_num_enemy() {
		var n_enemy = this._pool.get();
		if (!n_enemy) {
			n_enemy = cc.instantiate(this.noNumEnemys);
			n_enemy.addComponent('PoolHandler');
		}
        n_enemy.x = this.randomNum(n_enemy.width/2 - com.screenWidth/2, com.screenWidth/2 - n_enemy.width/2);
        n_enemy.y = com.screenHeight/2;
		this.node.parent.addChild(n_enemy);
	},
	
	_generate_prop_bone() {
		var prop = cc.instantiate(this.propBone)
		
		prop.x = this.randomNum(prop.width/2, com.screenWidth - prop.width/2);
		prop.y = com.screenHeight;
		this.node.parent.addChild(prop);
	},
	
	generate_bone() {
		var num = indexCom.level == 'level3'? 3 : 2;
		for (var i=0; i < num; i++) {
			var bone = cc.instantiate(this.Bone)
		
			bone.x = this.randomNum(bone.width/2, com.screenWidth - bone.width/2);
			bone.y = com.screenHeight;
			this.node.parent.addChild(bone);
		}
	},
	
	removeNoNumEnemy(n_enemy) {
		this._pool.put(n_enemy)
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
	
	// removeNode(enemy, id) {
// 		com.enemyId = id;
// 		this._pool.put(enemy);
// 	},
	
	onTouchMoveEvent(t) {
		let x = t.touch._point.x
		if (com.player != null) {
			com.player.removeTo(x - com.screenWidth/2)
		}
	},
	
	onTouchStart(t) {
		let x = t.touch._point.x
		if (com.player != null) {
			com.player.removeTo(x - com.screenWidth/2)
		}
	},

    start () {

    },
	
	onDestroy() {
		this.node.off('touchstart',this.onTouchStart, this);
	},

    update (dt) {
    	com.frame ++ ;
		if (!com.isOver) {
			if (com.frame % this.nextPropCreateTime === 0) {
				if (this.nextPropType < 6) {
					this._generate_prop_two_bullets()
				} else if (this.nextPropType >= 6) {
					this._generate_prop_three_bullets()
				}
			}else if (com.frame % 80 === 0) {
				this._generate_enemy()
			}else if (com.frame % 50 === 0) {
				this._generate_no_num_enemy()
			}
			if (com.frame % this.nextPropBoneCreateTime === 0) {
				this._generate_prop_bone();
			}
		}
		
    },
});
