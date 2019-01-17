var com = require('common');
const LEFT = 0;
const MIDDLE = 1;
const RIGHT = 2;
cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //    default: null,      // The default value will be used only when the component attaching
        //                           to a node for the first time
        //    url: cc.Texture2D,  // optional, default is typeof default
        //    serializable: true, // optional, default is true
        //    visible: true,      // optional, default is true
        //    displayName: 'Foo', // optional
        //    readonly: false,    // optional, default is false
        // }, 
        // ...
    },

    // use this for initialization
    onLoad: function () {
		cc.director.getCollisionManager().enabled =true;
		this.id = com.bullets.length + 1;
		com.bullets.push(this);
        this.speed_x = 0;
        this.speed_y = 800;
		this.node.direction = com.shootDirection;
		this.audio = this.node.getComponent(cc.AudioSource);
    },
	
	setDirection: function(direction=1) {
		this.direction = direction;
	},

    start: function() {
        
    },
    // 碰撞事件
    onCollisionEnter: function(other, self) {
		this.node.removeFromParent();
		// this.audio.play();
        // com.player.removeNode(this.node);
    },

    // called every frame, uncomment this function to activate update callback
    update: function (dt) {
        var sx = this.speed_x * dt;
        var sy = this.speed_y * dt * 1.5 * com.speed;;
		
        this.node.y += sy;
		switch(this.node.direction) {
			case LEFT :
				this.node.x = this.node.x + sx - 1;
				break;
			case RIGHT :
				this.node.x = this.node.x + sx + 1;
				break; 
			case MIDDLE :
				this.node.x += sx;
				break;
		}
        if (this.node.y >= com.screenHeight/2 || this.node.x >= com.screenWidth/2 || this.node.x <= -com.screenWidth/2-1) {
            com.player.removeNode(this.node);
            return ;
        }
    },
});
