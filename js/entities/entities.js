
game.PlayerEntity = me.Entity.extend({
   init: function(x, y, settings){ // initializes the player entity's functions
       this.setSuper();
       this.setPlayerTimers();    
       this.setAttributes();
       
   this.type = "PlayerEntity";
   this.setFlags();
   

   
   me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
   this.renderable.addAnimation("idle", [78]);
   this.renderable.setCurrentAnimation("idle");
   this.addAnimation(); // adds the player entity's animation
   },
   
   setSuper: function (x, y){
      this._super(me.Entity, 'init', [x, y, {
               image: "player",
               width: 64,
               height: 64,
               spritewidth: "64",
               spriteheight: "64",
               getShape: function(){
                   return(new me.Rect(0, 0, 64, 64)).toPolygon();
               }
       }]); 
   },
   
    setVariables: function(){
          this.facing = "right"; // faces player to the right
          this.type = "PlayerEntity";
          this.dead = false;
   },
   
   setFlags: function(){
     this.facing = "right";
     this.dead = false;
     this.attacking = false;
   },
   
   addAnimation: function(){
   this.renderable.addAnimation("idle", [78]);
   this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
   this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
   },
   
   setAttributes: function(){
 this.health = game.data.playerHealth;
 this.body.setVelocity(game.data.playerMoveSpeed, 20);
 this.attack = game.data.playerAttack;
   },
   
   setPlayerTimers: function(){
       this.now = new Date().getTime;
       this.lastHit = this.now;
       this.lastAttack = new Date().getTime; // haven't used this
   },
   
     
   update: function(delta){
       this.now = new Date().getTime;   
        this.dead = this.checkIfDead();
        this.checkKeysPressesAndMove();
       this.setAnimation();   
       me.collision.check(this, true, this.collideHandler.bind(this), true);
       this.body.update(delta); // updates delta     
       this._super(me.Entity, "update", [delta]); // updates the delta
       return true;
   },
   
   checkIfDead: function(){
     if(this.health <= 0){    
           return true;
          
       }
       return false;
   },
   
   checkKeysPressesAndMove: function(){
        if(me.input.isKeyPressed("right")){
         this.moveRight();
       }else if(me.input.isKeyPressed("left")){
        this.moveLeft();
       }else{
           this.body.vel.x = 0;
       }
  
       if(me.input.isKeyPressed("jump")&& !this.jumping && !this.falling){
          this.jump();
       }
      this.attacking = me.input.isKeyPressed("attack");
   },
  
  moveRight: function(){
        // adds to the position of my x by adding the velocity defined above in
           // setVelocity() and multiplying it by me.timer.tick.
           // me.timer.tick makes the movement look smooth
           this.body.vel.x += this.body.accel.x * me.timer.tick;
           this.facing = "right";
           this.flipX(true);
  },
  
  moveLeft: function(){
        this.facing = "left";
          this.body.vel.x -=this.body.accel.x * me.timer.tick;
          this.flipX(false);
  },
  
  jump: function(){
     this.jumping = true;
           this.body.vel.y -= this.body.accel.y * me.timer.tick;  
           
  },
  
  setAnimation: function(){
    if(this.attacking){
           if(!this.renderable.isCurrentAnimation("attack")){
               this.renderable.setCurrentAnimation("attack", "idle");
               this.renderable.setAnimationFrame();
           }
       }
       else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
           if(!this.renderable.isCurrentAnimation("walk")){
           this.renderable.setCurrentAnimation("walk");
       }
       }else if(!this.renderable.isCurrentAnimation("attack")){
           this.renderable.setCurrentAnimation("idle");
       }  
  },
  
   loseHealth: function(damage){
       this.health = this.health - damage;
   },
   
   
   

   collideHandler: function(response){
       if(response.b.type==='EnemyBaseEntity'){
           this.collideWithEnemyBase(response);
           var ydif = this.pos.y - response.b.pos.y;
           var xdif = this.pos.x - response.b.pos.x;
           
         
           
           if(ydif<-40 && xdif< 70 && xdif>-35){
               this.falling = false;
               this.body.vel.y = -1;
           }
        else if(xdif>-35 && this.facing==='right' && (xdif<0)){
               this.body.vel.x = 0;

           }else if(xdif<70 && this.facing==='left' && xdif>0){
               this.body.vel.x = 0;

           }
           if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= game.data.playerAttackTimer) {
               console.log("tower Hit");
               this.lastHit = this.now;
              if(response.b.loseHealth(game.data.playerAttack)){
                  game.data.gold += 1; // increases gold
                  console.log("Current gold: " + game.data.gold); // logs in the gold console
              }
              response.b.loseHealth(game.data.playerAttack);
           }
          
       
               
   }else if(response.b.type==="EnemyCreep"){
       this.collideWithEnemyCreep(response);
       }
   },
   collideWithEnemyBase: function(response){
       
   },
   collideWithEnemyCreep: function(response){
       
          var xdif = this.pos.y - response.b.pos.x;
          var ydif = this.pos.x - response.b.pos.y;
          
          this.stopMovement(xdif);
          if(this.checkAttack(xdif, ydif)){
              this.hitCreep(response); 
          };
           
   },
   stopMovement: function(xdif){
       if(xdif>0){
              if(this.facing==="left"){
                  this.body.vel.x = 0;
              }
          }else{
              if(this.facing==='right'){
                  this.body.vel.x = 0;
              }
          }
   },
   
   checkAttack: function(xdif, ydif){
        if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000
              && (Math.abs(ydif) <=40) && (xdif>0) && this.facing==='left' || (xdif<0) && this.facing==='right'){
                this.lastHit = this.now;
                return true;
            }
            return false;
   },
   
   hitCreep: function(response){
       if(response.b.loseHealth(game.data.playerAttack)){
           // adds one gold for a creep kill
                  game.data.gold += 1; // increases gold
                  console.log("Current gold: " + game.data.gold); // logs in the gold console
                  }
                response.b.loseHealth(game.data.playerAttack);
   }
});





game.PlayerBaseEntity = me.Entity.extend({
    init : function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
            image: "tower",
            width: 100,
            height: 100,
            spritewidth: "100",
            spriteheight: "100",
            getShape: function(){
                return (new me.Rect(0, 0, 100, 70).toPolygon)();
            }
            }]);
        this.broken = false; // tells the player base entity to not break
        this.health = game.data.playerBaseHealth; // sets the health to 10
        this.alwaysUpdate = true; // tells the player base entity to always update
        this.body.onCollision = this.onCollision.bind(this);      
        this.type = "PlayerBase"; // sets the name as PlayerBase
    
    this.renderable.addAnimation("idle", [0]);
    this.renderable.addAnimation("broken", [1]);
    this.renderable.setCurrentAnimation("idle");
    },
        
          loseHealth: function(damage){
        this.health = this.health - damage; // subtracts the damage
    },
    
    onCollision: function(){
        
    },
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
        }
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    
    }
  
});




game.EnemyBaseEntity = me.Entity.extend({
    init : function(x, y, settings) {
        this._super(me.Entity, 'init', [x, y, {
            image: "tower",
            width: 100,
            height: 100,
            spritewidth: "100",
            spriteheight: "100",
            getShape: function(){
                return (new me.Rect(0, 0, 100, 70).toPolygon)();
            }
            }]);
        this.broken = false; // tells the enemy base to not break
        this.health = 10; // gives the enemy base entity 10 lives.
        this.alwaysUpdate = true;
        this.body.onCollision = this.onCollision.bind(this);
        
        this.type = "EnemyBase"; // sets the name as EnemyBase
       
    
    this.renderable.addAnimation("idle", [0]); // adds the ememy's idle animation
    this.renderable.addAnimation("broken", [1]); // adds the enemy's broken animation
    this.renderable.setCurrentAnimation("idle"); // sets the enemy's idle animation
},
        
    
    update:function(delta){
        if(this.health<=0){
            this.broken = true;
            this.renderable.setCurrentAnimation("broken");
        };
        this.body.update(delta);
        
        this._super(me.Entity, "update", [delta]);
        return true;
    },
    
    onCollision: function(){
        
    }
});
game.EnemyCreep = me.Entity.extend({
    init: function(x, y, settings){
        this._super(me.Entity, 'init', [x, y, {
            image: "creep1",
            width: 32,
            height: 64,
            spritewidth: "32",
            spriteheight: "64",
            getShape: function(){
                return (new me.Rect(0, 0, 32, 64)).toPolygon();
            }
        }]);
    this.health = game.data.enemyCreepHealth; // gives the enemy creep only 10 lives.
    this.alwaysUpdate = true;
    //this.attacking lets us know if the enemy is currently attacking
    this.attacking = false; // tells the enemy creep to not attack
    //keeps track of when my creep last attacked anything
    this.lastAttacking = new Date().getTime();
    // keeps track of the last time my creep hit anything
    this.lastHit = new Date().getTime();
    this.now = new Date().getTime();
    this.body.setVelocity(3, 20); // sets the enemy's speed
    
    this.type = "EnemyCreep"; // sets the name to EnemyCreep
    
    this.renderable.addAnimation("walk", [3, 4, 5], 80);
    this.renderable.setCurrentAnimation("walk");
    },
    
    loseHealth: function(damage) {
      this.health = this.health - damage;
    },
    update: function(delta){     
        console.log(this.health);
        if(this.health <= 0){
            me.game.world.removeChild(this);
        }
       this.now = new Date().getTime();
        
       this.body.vel.x -=  this.body.accel.x * me.timer.tick;
       
       me.collision.check(this, true, this.collideHandler.bind(this), true);
        
        
       this.body.update(delta); // updates the delta
   
      
       
       this._super(me.Entity, "update", [delta]);      
       return true;
    },
    
    collideHandler: function(response){
        if(response.b.type==='PlayerBase'){
            this.attacking = true;
            this.body.vel.x = 0;
            this.pos.x = this.pos.x + 1;
            if((this.now))
            var ydif = this.pos.y - response.b.pos.y;
            var xdif = this.pos.x - response.b.pos.x;
          
          if(ydif<-40 && xdif< 70 && xdif>-35) {
              this.body.falling = false;
              this.body.vel.y = -1;
          }
          else if(xdif>-35 && this.facing==='right' && (xdif<0)){
              this.body.vel.x = 0;
              this.pos.x = this.pos.x +1;
          }
           else if(xdif>-35 && this.facing==='left' && (xdif>0)){
              this.body.vel.x = 0;
              this.pos.x = this.pos.x +1;
          }
          if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000){
              console.log("tower Hit");
              this.lastHit = this.now;
              response.b.loseHealth();
          }
          
      }else if(response.b.type==='EnemyCreep'){
          var xdif = this.pos.x - response.b.pos.x;
          var ydif = this.pos.y - response.b.pos.y;
          
          if (xdif>0){
              this.pos.x = this.pos.x + 1;
              if(this.facing==='left'){
                  this.body.vel.x = 0;
              }
          }else{
              this.pos.x = this.pos.x - 1;
              if(this.facing==='right'){
                  this.vel.x = 0;
              }
          }
          if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 1000
              && (Math.abs(ydif) <=40) && (xdif>0) && this.facing==='left' || (xdif<0) && this.facing==='right'){
                this.lastHit = this.now;
                response.b.loseHealth(1);
              
          }
      }
          }
});
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
           game.data.gold +=1; // increases gold
           console.log("Current gold: " + game.data.gold); // plugs in the gold data
            
        }
        if(Math.round(this.now/1000)%10 ===0 && (this.now - this.lastCreep >= 1000)){
            this.lastCreep = this.now;
            var creepe = me.pool.pull("EnemyCreep", 1000, 0, {}); // pulls the enemy creep
            me.game.world.addChild(creepe, 5); // adds the creepe child
            
        }
        return true;
    }
    
});

