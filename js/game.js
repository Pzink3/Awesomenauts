
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0, 
                enemyBaseHealth: 1, // sets the enemy base's health to 10 lives
                playerBaseHealth: 1, // sets the playyer base's health to 10 lives
                enemyCreepHealth: 10, // sets the enemy creep's health to 10 lives
                playerHealth: 10, // sets the player's health to 10 lives
                enemyCreepAttack: 1, // sets the enemy creep to make one attack
                playerAttack: 1, // sets the player to make one attack
    //            orcBaseDamage: 10,
    //            orcBaseHealth: 100,
    //            orcBaseSpeed: 3,
    //            orcBaseDefense: 0,
                playerAttackTimer: 1000, // sets the player's attack timer to 1000
                creepAttackTimer: 1000, // sets the creep's attack timer to 1000
                playerMoveSpeed: 5, // sets the player's speed to 5
                creepMoveSpeed: 5, // sets the creep's speed to 5
                gameTimerManager: "",
                heroDeathManager: "",
                player: "",
                exp: 0,
                ability1: 0,
                ability2: 0,
                ability3: 0,
                skill1: 0,
                skill2: 0,
                skill3: 0,
                gold: 0,
                exp1: 0,
                exp2: 0,
                exp3: 0,
                exp4: 0,
                win: "",
                pausePos: "",
                buyScreen: "",
                buytext: "",
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}
        
        me.save.add({exp: 0, exp1: 0, exp3: 0, exp4: 0});
        
        me.state.SPENDEXP = 112;
        
	// Initialize the audio.
	me.audio.init("mp3,ogg"); // intializes the mp3 and ogg files
      
         
	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this); // loads the binding callback


	// Load the resources.
	me.loader.preload(game.resources); // loads all of the resources

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING); // displays the loading screen
},

	// Run on game resources loaded.
	"loaded" : function () {
                me.pool.register("player", game.PlayerEntity, true); // runs the player entity
                me.pool.register("PlayerBase", game.PlayerBaseEntity); // runs the player base
                me.pool.register("EnemyBase", game.EnemyBaseEntity); // runs the enemy base
                me.pool.register("EnemyCreep", game.EnemyCreep, true); // runs the enemy creep
                me.pool.register("GameTimerManager", game.GameTimerManager); // runs the game timer manager
                me.pool.register("HeroDeathManager", game.HeroDeathManager); // runs the hero death manager
                me.pool.register("ExperienceManager", game.ExperienceManager); // runs the experience manager
                me.pool.register("SpendGold", game.SpendGold); // runs the spend gold class
		me.state.set(me.state.MENU, new game.TitleScreen); // sets the menu state
		me.state.set(me.state.PLAY, new game.PlayScreen); // sets play state
                me.state.set(me.state.SPENDEXP, new game.SpendExp); // sets the spendexp state

		// Start the game.
		me.state.change(me.state.MENU); // starts the game with the menu
               
	}
};
