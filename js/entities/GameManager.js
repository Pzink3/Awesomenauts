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
        if(Math.round(this.now/1000)%20 ===0 && (this.now - this.lastCreep >= 1000)){
           game.data.gold += (game.data.exp1+1); // increase gold
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
       console.log(game.data.exp);
        this.gameover = true;
        me.save.exp = game.data.exp;
        me.save.exp2 = 4;
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
               this.startBuying();
           }else{
               this.stopBuying();
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
       me.input.bindKey(me.input.KEY.F1, "F1", true); // truly binds the f1 key
       me.input.bindKey(me.input.KEY.F2, "F2", true); // truly binds the f2 key
       me.input.bindKey(me.input.KEY.F3, "F3", true); // truly binds the f3 key
       me.input.bindKey(me.input.KEY.F4, "F4", true); // truly binds the f4 key
       me.input.bindKey(me.input.KEY.F5, "F5", true); // truly binds the f5 key
       me.input.bindKey(me.input.KEY.F6, "F6", true); // truly binds the f6 key
       this.setBuyText();     
   },
   setBuyText: function(){
     game.data.buytext = (new (me.Renderable.extend({
         init: function(){
             this._super(me.Renderable, 'init', [game.data.pausePos.x, game.data.pausePos.y, 300, 50]);
             this.font = new me.Font("Aharoni", 26, "white");
             this.updateWhenPaused = true;
             this.alwaysUpdate = true;
         },       
         draw: function(renderer){
             this.font.draw(renderer.getContext(), "F1 - F6 to buy, B to exit, Current Gold: " + game.data.gold, this.pos.x, this.pos.y);
             this.font.draw(renderer.getContext(), "Skill 1: Increase Damage, Current Level: " + game.data.skill1 + "Cost: " + ((game.data.skill1+1)*10), this.pos.x, this.pos.y + 40);
             this.font.draw(renderer.getContext(), "Skill 2: Run Faster! Current Level: " + game.data.skill2 + "Cost: " + ((game.data.skill2+1)*10), this.pos.x, this.pos.y + 80);
             this.font.draw(renderer.getContext(), "Skill 3: Increase Health. Current Level: " + game.data.skill3 + "Cost: " + ((game.data.skill3+1)*10), this.pos.x, this.pos.y + 120);
             this.font.draw(renderer.getContext(), "Q Ability: Speed Burst. Current Level: ", game.data.ability1 + "Cost: " + ((game.data.ability1+1)*10), this.pos.x, this.pos.y + 160);
             this.font.draw(renderer.getContext(), "W Ability: Eat Your Creep For Health: " + game.data.ability2 + "Cost: " + ((game.data.ability2+1)*10), this.pos.x, this.pos.y + 200);
             this.font.draw(renderer.getContext(), "E Ability: Throw Your Spear: " + game.data.ability3 + "Cost: " + ((game.data.ability3+1)*10), this.pos.x, this.pos.y + 240);
         }
     })));
     me.game.world.addChild(game.data.buytext, 35);
   },
   stopBuying: function(){
       this.buying = false;
       me.state.resume(me.state.PLAY);
       game.data.player.body.setVelocity(game.data.playerMoveSpeed, 20);
       me.game.world.removeChild(game.data.buyscreen);
       me.input.unbindKey(me.input.KEY.F1, "F1", true); // truly unbinds the f1 key
       me.input.unbindKey(me.input.KEY.F2, "F2", true); // truly unbinds the f2 key
       me.input.unbindKey(me.input.KEY.F3, "F3", true); // truly unbinds the f3 key
       me.input.unbindKey(me.input.KEY.F4, "F4", true); // truly unbinds the f4 key
       me.input.unbindKey(me.input.KEY.F5, "F5", true); // truly unbinds the f5 key
       me.input.unbindKey(me.input.KEY.F6, "F6", true); // truly unbinds the f6 key
       me.game.world.removeChild(game.data.buytext); // removes the game.data.buytext child
   },
   checkBuyKeys: function(){
       if(me.input.isKeyPressed("F1")){
           if(this.checkCost(1)){
               this.makePurchase(1);
           }
       }else if(me.input.isKeyPressed("F2")){
            if(this.checkCost(2)){
               this.makePurchase(2);
           }
           }else if(me.input.isKeyPressed("F3")){
                if(this.checkCost(3)){
               this.makePurchase(3);
           }
               }else if(me.input.isKeyPressed("F4")){
                    if(this.checkCost(4)){
               this.makePurchase(4);
           }
                   }else if(me.input.isKeyPressed("F5")){
                        if(this.checkCost(5)){
               this.makePurchase(5);
           }
       }
   },
   checkCost: function(skill){
       if(skill===1 && (game.data.gold >= ((game.data.skill1+1)*10))){
           return true;
       }else if(skill===2 && (game.data.gold >= ((game.data.skill2+2)*10))){
           return true;
           }else if(skill===3 && (game.data.gold >= ((game.data.skill3+1)*10))){
           return true;
           }else if(skill===4 && (game.data.gold >= ((game.data.ability1+1)*10))){
           return true;
           }else if(skill===5 && (game.data.gold >= ((game.data.ability2+1)*10))){
           return true;
           }else if(skill===6 && (game.data.gold >= ((game.data.ability3+1)*10))){
           return true;
       }else{
           return false;
       }
   },
   makePurchase: function(skill){
       if(skill ===1){
       game.data.gold -= ((game.data.skill1 +1)* 10);
       game.data.skill1 += 1;
       game.data.player.attack += 1;
   }else if(skill ===2){
       game.data.gold -= ((game.data.skill2 +2)* 10);
       game.data.skill2 += 2;
          }else if(skill ===3){
              game.data.gold -= ((game.data.skill3 +1)* 10);
              game.data.skill3 += 3;
                 }else if(skill ===4){
                     game.data.gold -= ((game.data.ability1 +1)* 10);
                     game.data.ability1 += 1;
                        }else if(skill ===5){
                            game.data.gold -= ((game.data.ability2 +1)* 10);
                            game.data.ability2 += 2;
                               }else if(skill ===6){
                             game.data.gold -= ((game.data.ability3 +1)* 10);
                             game.data.ability3 += 3;
   }
   }
   });