game.GameTimerManager = Object.extend({
    init: function(x, y, settings){ // initializes the game manager's functions
        this.now = new Date().getTime();
        this.lastCreep = new Date().getTime();
        this.paused = false; // tells the manager to not pause the game
        this.alwaysUpdate = true; // tells the game manager to always update.
    },
    
    update: function(){
        this.now = new Date().getTime();        
        this.goldTimerCheck();
        this.creepTimerCheck();
        
        
        
        
        
        return true;
    },
    
    goldTimerCheck: function(){
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
           game.data.gold +=1; // increase gold
           console.log("Current gold: " + game.data.gold);
            
        }
    },
    creepTimerCheck: function(){
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {}); // pulls the enemy creep
            me.game.world.addChild(creepe, 5); // adds the creepe variable
            
        }
    }
    
});

game.HeroDeathManager = Object.extend({
   init: function(x, y, settings){
   this.alwaysUpdate = true;    
   },
   update: function(){
        if(game.data.player.dead){
            me.game.world.removeChild(game.data.player); // removes the player child
            me.state.current().resetPlayer(10, 0); // resets the game manager's player
        }
        return true;
   }
});

game.ExperienceManager = Object.extend({
    init: function(x, y, settings){
        this.alwaysUpdate = true;
        this.gameover = false;
        me.save.exp = game.data.exp;
    },   
    update: function(){
        if(game.data.win === true && !this.gameover){
            this.gameOver(true);
    }else if(game.data.win === false && !this.gameover){
        me.save.exp = game.data.exp;
        this.gameOver(false);
    }
    return true;
    },
    
    gameOver: function(win){
        if(win){
                game.data.exp += 10; 
        }else{
                game.data.exp += 1;
        }
       
        this.gameover = true;
        me.save.exp = game.data.exp;

    }
});

game.SpendGold = Object.extend({
   init: function(x, y, settings){
     this.now = new Date().getTime();
     this.lastBuy = new Date().getTime();
     this.paused = false;
     this.alwaysUpdate = true;
   },
   
   update: function(){
       return true;
   }
});