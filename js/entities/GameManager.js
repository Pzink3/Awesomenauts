game.GameManager = Object.extend({
    init: function(x, y, settings){ // initializes the game manager's functions
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false; // tells the manager to not pause the game
        this.alwaysUpdate = true; // tells the game manager to always update.
    },
    
    update: function(){
        this.now = new Date().getTime();
        
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player); // removes the player child
            me.state.current().resetPlayer(10, 0); // resets the game manager's player
        }
        
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
           game.data.gold +=1; // increase gold
           console.log("Current gold: " + game.data.gold);
            
        }
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {}); // pulls the enemy creep
            me.game.world.addChild(creepe, 5); // adds the creepe variable
            
        }
        return true;
    }
    
});

