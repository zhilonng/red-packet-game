cc.Class({
    extends: cc.Component,

    properties: {
        toHome: cc.Button,
    },
	
	toHomeClicked() {
		cc.director.loadScene('home');
	},
});