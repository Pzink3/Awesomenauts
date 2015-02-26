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
        this.health = 10; // sets the health to 10
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




