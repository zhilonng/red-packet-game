cc.Class({
    extends: cc.Component,

    properties: {
        toHome: cc.Button,
		openRank: cc.Button,
		rank: cc.Prefab,
    },
	
	toHomeClicked() {
		cc.director.loadScene('home');
	},
	
	openRankList() {
		let rank = cc.instantiate(this.rank);
		this.node.parent.addChild(rank);
	},
});