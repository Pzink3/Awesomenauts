game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		game.data.score = 0; // resets the score to 0

                
                me.levelDirector.loadLevel("level01"); // calls the level director to load level
                me.audio.play("startup"); // plays the startup sound effect
         //       me.audio.playTrack("the-incredits"); // plays the song, "The Incredits"
                
                this.resetPlayer(0, 420); // resets player
                
                
                
                var gameTimerManager = me.pool.pull("GameTimerManager", 0, 0, {}); // pulls the game timer manager
                me.game.world.addChild(gameTimerManager, 0); // adds the game timer manager
                
                var heroDeathManager = me.pool.pull("HeroDeathManager", 0, 0, {}); // pulls the hero death manager
                me.game.world.addChild(heroDeathManager, 0); // adds the hero death manager
       
                var experienceManager = me.pool.pull("ExperienceManager", 0, 0, {}); // pulls the experience manager
                me.game.world.addChild(experienceManager, 0); // adds the hero death manager
                 
                var spendGold = me.pool.pull("SpendGold", 0, 0, {}); // pulls the spend gold class
                me.game.world.addChild(spendGold, 0); // adds the hero death manager
                
               
                
                
                me.input.bindKey(me.input.KEY.B, "buy"); // binds the b key to begin buying
                me.input.bindKey(me.input.KEY.Q, "skill1"); // binds the q key to purchase skill 1
                me.input.bindKey(me.input.KEY.W, "skill2"); // binds the w key to purchase skill 2
                me.input.bindKey(me.input.KEY.E, "skill3"); // binds the e key to purchase skill 3
                me.input.bindKey(me.input.KEY.RIGHT, "right"); // binds the right key to make the player go right
                me.input.bindKey(me.input.KEY.LEFT, "left"); // binds the left key to make the player go left
                me.input.bindKey(me.input.KEY.SPACE, "jump"); // binds the space key to make the player jump
                me.input.bindKey(me.input.KEY.UP, "jump"); // binds the up key to also make the player jump
                me.input.bindKey(me.input.KEY.A, "attack"); // binds the a key to make the player attack
                
		// add our HUD to the game world
		this.HUD = new game.HUD.Container(); // adds a new HUD container
		me.game.world.addChild(this.HUD); // adds the HUD child
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD); // removes the hud
	},
        
        resetPlayer: function(x, y) {
            game.data.player = me.pool.pull("player", x, y, {}); // pulls the player when it is reset
            me.game.world.addChild(game.data.player, 5); // adds the player when reset
        }
});
