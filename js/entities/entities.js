
game.PlayerEntity = me.Entity.extend({
   init: function(x, y, settings){
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
   
   this.type = "PlayerEntity";
   this.health = game.data.playerHealth;
   this.body.setVelocity(game.data.playerMoveSpeed, 5, 20);
   this.facing = "right"; // faces player to the right
   this.now = new Date().getTime;
   this.dead = false;
   this.attack = game.data.playerAttack;
   this.lastHit = this.now;
   this.lastAttack = new Date().getTime;
   me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
   this.renderable.addAnimation("idle", [78]);
   this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
   this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72], 80);
   
   this.renderable.setCurrentAnimation("idle");
   },
   
   update: function(delta){
       this.now = new Date().getTime;
       
       if(this.health <=0){
        this.dead = true;
        this.pos.x = 10;
        this.pos.y = 0;
        this.health = game.data.playerHealth;
       }
       if(me.input.isKeyPressed("right")){
           // adds to the position of my x by adding the velocity defined above in
           // setVelocity() and multiplying it by me.timer.tick.
           // me.timer.tick makes the movement look smooth
           this.body.vel.x += this.body.accel.x * me.timer.tick;
           this.facing = "right";
           this.flipX(true);
       }else if(me.input.isKeyPressed("left")){
          this.facing = "left";
          this.body.vel.x -=this.body.accel.x * me.timer.tick;
          this.flipX(false);
       }else{
           this.body.vel.x = 0;
       }
  
       if(me.input.isKeyPressed("attack")){
           if(!this.renderable.isCurrentAnimation("attack")){
               this.renderable.setCurrentAnimation("attack", "idle");
               this.renderable.setAnimationFrame();
           }
       }
       if(me.input.isKeyPressed("jump")&& !this.jumping && !this.falling){
           this.jumping = true;
           this.body.vel.y -= this.body.accel.y * me.timer.tick;
           this.renderable.setAnimationFrame();
       }
  
     
       
     
       else if(this.body.vel.x !== 0) {
       if(!this.renderable.isCurrentAnimation("walk")){
           this.renderable.setCurrentAnimation("walk");
       } 
   }else if(!this.renderable.isCurrentAnimation("attack")){
       this.renderable.setCurrentAnimation("idle");
   }
   
 
       me.collision.check(this, true, this.collideHandler.bind(this), true);
       this.body.update(delta);
   
       
       this._super(me.Entity, "update", [delta]);
       return true;
   },
   
   loseHealth: function(damage){
       this.health = this.health - damage;
   },
   collideHandler: function(response){
       if(response.b.type==='EnemyBaseEntity'){
           var ydif = this.pos.y - response.b.pos.y;
           var xdif = this.pos.x - response.b.pos.x;
           
         
           
           if(ydif<-40 && xdif< 70 && xdif>-35){
               this.body.falling = false;
               this.body.vel.y = -1;
           }
        else if(xdif>-35 && this.facing==='right' && (xdif<0)){
               this.body.vel.x = 0;
               //this.pos.x = this.pos.x -1;
           }else if(xdif<70 && this.facing==='left' && xdif>0){
               this.body.vel.x = 0;
            //   this.pos.x = this.pos.x +1;
           }
           if(this.renderable.isCurrentAnimation("attack") && this.now-this.lastHit >= 400) {
               console.log("tower Hit");
               this.lastHit = this.now;
              if(response.b.loseHealth(game.data.playerAttack)){
                  game.data.gold += 1;
                  console.log("Current gold: " + game.data.gold);
              }
           
           }
   }else if(response.b.type==="EnemyCreep"){
          var xdif = this.pos.y - response.b.pos.x;
          var ydif = this.pos.x - response.b.pos.y;
          
          if(xdif>0){
              if(this.facing==="left"){
                  this.body.vel.x = 0;
              }
          }
       }
   }
});




