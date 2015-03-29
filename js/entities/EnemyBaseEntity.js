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
        
        this.type = "EnemyBaseEntity"; // sets the name as EnemyBase
       
    
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
