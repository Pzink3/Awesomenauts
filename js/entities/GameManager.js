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
     this.updateWhenPaused = true;
     this.buying = false;
   },
   
   update: function(){
       this.now = new Date().getTime();
       if(me.input.isKeyPressed("buy") && this.now-this.lastBuy >=1000){
           this.lastBuy = this.now;
           if(!this.buying){
               this.startBuying;
           }
       }
       return true;
   },
   
   startBuying: function(){
       this.buying = true;
       me.state.pause(me.state.PLAY);
       game.data.pausePos = me.game.viewport.localToWorld(0, 0);
       game.data.buyscreen = new me.Sprite(game.data.pausePos.x, game.data.pausePos.y, me.loader.getImage("gold-screen"));
       game.data.buyscreen.updateWhenPaused = true;
       game.data.buyscreen.setOpacity(0.8);
       me.game.world.addChild(game.data.buyscreen, 34);
       game.data.player.body.setVelocity(0, 0);
       me.input.bindKey(me.input.KEY.F1, "F1", true);
       me.input.bindKey(me.input.KEY.F2, "F2", true);
       me.input.bindKey(me.input.KEY.F3, "F3", true);
       me.input.bindKey(me.input.KEY.F4, "F4", true);
       me.input.bindKey(me.input.KEY.F5, "F5", true);
       me.input.bindKey(me.input.KEY.F6, "F6", true);
       this.setBuyText();
       
   },
   
   setBuyText: function(){
     me.game.world.buytext = (new (me.Renderable.extend({
         init: function(){
             this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
             this.font = new me.Font("Aharoni", 26, "white");
             this.updateWhenPaused = true;
             this.alwaysUpdate = true;
         },
         
         draw: function(renderer){
             this.font.draw(renderer.getContext(), "F1 - F6 to buy, B to exit");
         }
     })));
     me.game.world.addChild(game.data.buytext, 35);
   },
   
   stopBuying: function(){
       this.buying = false;
       me.state.resume(me.state.PLAY);
       game.data.player.body.setVelocity(game.data.player.moveSpeed, 20);
       me.game.world.removeChild(game.data.buyscreen);
       me.input.bindKey(me.input.KEY.F1, "F1", true);
       me.input.bindKey(me.input.KEY.F2, "F2", true);
       me.input.bindKey(me.input.KEY.F3, "F3", true);
       me.input.bindKey(me.input.KEY.F4, "F4", true);
       me.input.bindKey(me.input.KEY.F5, "F5", true);
       me.input.bindKey(me.input.KEY.F6, "F6", true);
       me.game.world.removeChild(game.data.buytext);
   }
   });