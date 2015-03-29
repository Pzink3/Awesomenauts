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
        if(response.b.type==='PlayerBaseEntity'){
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

