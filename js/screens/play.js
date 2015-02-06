game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0;

                
                me.levelDirector.loadLevel("level01"); // calls the level director to load level
                me.audio.playTrack("the-glory-days");
                
                this.resetPlayer(0, 420);
                
                var player = me.pool.pull("player", 0, 420, {}); // pulls the player
                me.game.world.addChild(player, 5); // adds the player
                
                var gamemanager = me.pool.pull("GameManager", 0, 0, {}); // pulls the game manager
                me.game.world.addChild(gamemanager, 0); // adds the game manager
                me.input.bindKey(me.input.KEY.RIGHT, "right"); // binds the right key to make the player go right
                me.input.bindKey(me.input.KEY.LEFT, "left"); // binds the left key to make the player go left
                me.input.bindKey(me.input.KEY.SPACE, "jump"); // binds the space key to make the player jump
                me.input.bindKey(me.input.KEY.UP, "jump"); // binds the up key to also make the player jump
                me.input.bindKey(me.input.KEY.A, "attack"); // binds the a key to make the player attack
		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD); // adds HUD
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD); // removes the hud
	},
        
        resetPlayer: function(x, y) {
            game.data.player = me.pool.pull("player", x, y, {}); // pulls the player when reset
            me.game.world.addChild(game.data.player, 5); // adds the player when reset
        }
});
