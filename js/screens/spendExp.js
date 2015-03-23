game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
       
	onResetEvent: function(){
              me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // loads and gets the title screen image
              me.input.bindKey(me.input.KEY.F1, "F1");
              me.input.bindKey(me.input.KEY.F2, "F2");
              me.input.bindKey(me.input.KEY.F3, "F3");
              me.input.bindKey(me.input.KEY.F4, "F4");
              me.input.bindKey(me.input.KEY.F5, "F5");
              me.input.bindKey(me.input.KEY.M, "M");
              me.audio.play("fnaf-3-menu-music", true);
              var exploost = ((game.data.exp1 + 1) * 10);
              me.game.world.addChild(new (me.Renderable.extend({
                  init: function() {
                      this._super(me.Renderable, "init", [10, 10, 300, 50]);
                      this.font = new me.Font("Aharoni", 28, "white");
                  },
                  
                  draw: function(renderer){
                      
                      this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP, AND M TO RETURN TO TITLE SCREEN", this.pos.x, this.pos.y); 
                      this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString() + ((game.data.exp + 1)* 10), this.pos.x + 100, this.pos.y + 50);
                      this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION CURRENT LEVEL " + game.data.exp1.toString() + " COST: " + ((game.data.exp1 + 1)* 10), this.pos.x + 200, this.pos.y + 100);
                      this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD " + game.data.exp2.toString() + "COST: " + ((game.data.exp2 + 2)* 10), this.pos.x + 200, this.pos.y + 150);
                      this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE " + game.data.exp3.toString() + "COST: " + ((game.data.exp3 + 3)* 10), this.pos.x + 200, this.pos.y + 200);
                      this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH " + game.data.exp4.toString() + "COST: " + ((game.data.exp4 + 4)* 10), this.pos.x + 200, this.pos.y + 250);
                  }
                  
                 
              })));
                    this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
                       if(action === "F1"){
                           
                       }else if(action === "F2"){
                       }else if(action === "F3"){
                       }else if(action === "F4"){
                       }else if(action === "F5"){
                       me.state.change(me.state.PLAY);
                   }else if(action === "M"){
                                me.state.change(me.state.MENU);
                       }
                   
                    });
                },
                
                
               
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            me.input.unbindKey(me.input.KEY.F1, "F1");
            me.input.unbindKey(me.input.KEY.F2, "F2");
            me.input.unbindKey(me.input.KEY.F3, "F3");
            me.input.unbindKey(me.input.KEY.F4, "F4");
            me.input.unbindKey(me.input.KEY.F5, "F5");
            me.input.unbindKey(me.input.KEY.M, "M");
            me.event.unsubscribe(this.handler);
       
            me.audio.stop("fnaf-3-menu-music");
            
        }
});