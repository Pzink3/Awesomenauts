
game.PlayerEntity = me.Entity.extend({
   init: function(x, y, settings){ // initializes the player entity's functions
       this.setSuper(x, y);
       this.setPlayerTimers();    
       this.setAttributes();
       
   this.type = "PlayerEntity";
   this.setFlags();
   

   
   me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

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
     this.facing = "right"; // faces player to the right
     this.dead = false;
     this.attacking = false;
   },
   
   addAnimation: function(){
   this.renderable.addAnimation("idle", [78]); // adds the idle animation
   this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80); // adds the walking animation
   this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80); // adds the attacking animation
   this.renderable.setCurrentAnimation("idle"); // sets the idle as the current animation
   },
   
   setAttributes: function(){
 this.health = game.data.playerHealth; // sets the player's health attribute
 this.body.setVelocity(game.data.playerMoveSpeed, 20); // sets the player's velocity
 this.attack = game.data.playerAttack; // sets the player's attacking attribute
   },
   
   setPlayerTimers: function(){
       this.now = new Date().getTime;
       this.lastHit = this.now;
       this.lastSpear = this.now;
       this.lastAttack = new Date().getTime; // haven't used this
   },
   
     
   update: function(delta){
       this.now = new Date().getTime;   
        this.dead = this.checkIfDead();
        this.checkKeysPressesAndMove();
        this.checkAbilityKeys();
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
      
      if(me.input.isKeyPressed("escape")){
       this.menu();
      }
   },
   
   menu: function(){
       me.state.change(me.state.MENU);
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
          this.body.vel.x -= this.body.accel.x * me.timer.tick;
          this.flipX(false);
  },
  
  jump: function(){
      
     this.jumping = true;
           this.body.vel.y -= this.body.accel.y * me.timer.tick;  
           me.audio.play("jump");
           
  },
  
  checkAbilityKeys: function(){
      if(me.input.isKeyPressed("skill1")){
          // this.speedBurst();
      }else if(me.input.isKeyPressed("skill2")){
        //  this.eatCreep();
      
      }
  },
  setAnimation: function(){
    if(this.attacking){
           if(!this.renderable.isCurrentAnimation("attack")){
               me.audio.play("lightsaber-clash"); // plays the lightsaber clash sound effect
               this.renderable.setCurrentAnimation("attack", "idle"); // sets the attack and idle animations
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
           var xdif = this.pos.x -response.b.pos.x;
           
         
           
           if(ydif<-40 && xdif< 70 && xdif>-35){
               this.body.falling = false;
               this.body.vel.y = -1;
           }
        else if(xdif>-35 && this.facing==='right' && (xdif<0)){
               this.body.vel.x = 0;
               this.pos.x = this.pos.x -1;

           }else if(xdif<70 && this.facing==='left' && xdif>0){
               this.body.vel.x = 0;
               this.pos.x = this.pos.x +1;

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
                  me.audio.play("hit");
                  game.data.gold += 1; // increases gold
                
                  console.log("Current gold: " + game.data.gold); // logs in the gold console
                  }
                response.b.loseHealth(game.data.playerAttack); // loses a player's life when attacked
   }
});










