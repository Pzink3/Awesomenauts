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
              
              me.game.world.addChild(new (me.Renderable.extend({
                  init: function() {
                      this._super(me.Renderable, "init", [10, 10, 300, 50]);
                      this.font = new me.Font("Aharoni", 46, "white");
                  },
                  
                  draw: function(renderer){
                      
                      this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, AND F5 TO SKIP", this.pos.x, this.pos.y); // draws the words "NEW GAME"
                      this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                      this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION CURRENT LEVEL " + game.data.exp.toString() + " PRICE: " + ((game.data.exp1 + 1) * 10), this.pos.x + 200, this.pos.y + 100);
                      this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 150);
                      this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 200);
                      this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH " + game.data.exp.toString(), this.pos.x + 200, this.pos.y + 250);
                  }
                  
                 
              })));
                    this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keycode, edge){
                       if(action === "F1"){
                           
                       }else if(action === "F2"){
                            }else if(action === "F3"){
                                 }else if(action === "F4"){
                                      }else if(action === "F5"){
                                          me.state.change(me.state.PLAY);
                       }
                    });
                },
                
                
               
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            me.input.bindKey(me.input.KEY.F1, "F1");
            me.input.bindKey(me.input.KEY.F1, "F2");
            me.input.bindKey(me.input.KEY.F1, "F3");
            me.input.bindKey(me.input.KEY.F1, "F4");
            me.input.bindKey(me.input.KEY.F1, "F5");
            me.event.unsubscribe(this.handler);

          me.audio.stop("the-glory-days"); // stops the song, "The Glory Days"

        }
});