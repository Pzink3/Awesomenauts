game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
       
	onResetEvent: function(){
              me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // loads and gets the title screen image
              me.input.bindKey(me.input.KEY.F1, "F1"); // binds the f1 key
              me.input.bindKey(me.input.KEY.F2, "F2"); // binds the f2 key
              me.input.bindKey(me.input.KEY.F3, "F3"); // binds the f3 key
              me.input.bindKey(me.input.KEY.F4, "F4"); // binds the f4 key
              me.input.bindKey(me.input.KEY.F5, "F5"); // binds the f5 key
              me.input.bindKey(me.input.KEY.M, "M"); // binds the m key
   
              var exp1cost = ((game.data.exp1 + 1) * 10);
              var exp2cost = ((game.data.exp2 + 2) * 10);
              var exp3cost = ((game.data.exp3 + 3) * 10);
              var exp4cost = ((game.data.exp4 + 4) * 10);
              me.game.world.addChild(new (me.Renderable.extend({
                  init: function() {
                      this._super(me.Renderable, "init", [10, 10, 300, 50]);
                      this.font = new me.Font("Arial", 28, "white"); //  sets arial as the main font in white
                  },
                  
                  draw: function(renderer){
                      
                      this.font.draw(renderer.getContext(), "PRESS F1-F4 TO BUY, F5 TO SKIP, AND M TO RETURN TO TITLE SCREEN", this.pos.x, this.pos.y); 
                      this.font.draw(renderer.getContext(), "CURRENT EXP: " + game.data.exp.toString(), this.pos.x + 100, this.pos.y + 50);
                      this.font.draw(renderer.getContext(), "F1: INCREASE GOLD PRODUCTION CURRENT LEVEL " + game.data.exp1.toString() + " COST: " + exp1cost, this.pos.x, this.pos.y + 100);
                      this.font.draw(renderer.getContext(), "F2: ADD STARTING GOLD " + "COST: " + ((game.data.exp2 + 2)* 10), this.pos.x, this.pos.y + 150);
                      this.font.draw(renderer.getContext(), "F3: INCREASE ATTACK DAMAGE "  + "COST: " + ((game.data.exp3 + 3)* 10), this.pos.x, this.pos.y + 200);
                      this.font.draw(renderer.getContext(), "F4: INCREASE STARTING HEALTH " + "COST: " + ((game.data.exp4 + 4)* 10), this.pos.x, this.pos.y + 250);
                  }
                  
                 
              })));
                    this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
                       if(action === "F1"){
                           if(game.data.exp >= exp1cost) {
                               game.data.exp1 += 1;
                               game.data.exp -= exp1cost;
                               me.state.change(me.state.PLAY); // changes the state to play
                               me.audio.play("cling"); // plays the cling sound effect
                               me.audio.play("startup"); // plays the startup sound effect
                           }else{
                               console.log("ERROR: NOT ENOUGH EXPERIENCE");
                                me.audio.play("turn"); // plays the turn sound effect
                           }
                       }else if(action === "F2"){
                           if(game.data.exp >= exp2cost) {
                               game.data.exp2 += 2;
                               game.data.exp -= exp2cost;
                               me.state.change(me.state.PLAY);
                               me.audio.play("cling"); // plays the cling sound effect
                               me.audio.play("startup"); // plays the startup sound effect
                           }else{
                               console.log("ERROR: NOT ENOUGH EXPERIENCE");
                                me.audio.play("turn"); // plays the turn sound effect
                           }
                       }else if(action === "F3"){
                            if(game.data.exp >= exp3cost) {
                               game.data.exp3 += 3;
                               game.data.exp -= exp3cost;
                               me.state.change(me.state.PLAY);
                               me.audio.play("cling"); // plays the cling sound effect
                               me.audio.play("startup"); // plays the startup sound effect
                           }else{
                               console.log("ERROR: NOT ENOUGH EXPERIENCE");
                                me.audio.play("turn"); // plays the turn sound effect
                           }
                       }else if(action === "F4"){
                            if(game.data.exp >= exp4cost) {
                               game.data.exp4 += 4;
                               game.data.exp -= exp4cost;
                               me.state.change(me.state.PLAY);
                               me.audio.play("cling"); // plays the cling sound effect
                               me.audio.play("startup"); // plays the startup sound effect
                           }else{
                               console.log("ERROR: NOT ENOUGH EXPERIENCE");
                               me.audio.play("turn"); // plays the turn sound effect
                           }
                       }else if(action === "F5"){
                           
                       me.state.change(me.state.PLAY);
                       me.audio.play("cling"); // plays the cling sound effect
                   }else if(action === "M"){
                                me.state.change(me.state.MENU); // changes the state to menu
                                me.audio.play("cling"); // plays the cling sound effect
                       }
                   
                    });
                },
                
                
               
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
            me.input.unbindKey(me.input.KEY.F1, "F1"); // unbinds the f1 key
            me.input.unbindKey(me.input.KEY.F2, "F2"); // unbinds the f2 key
            me.input.unbindKey(me.input.KEY.F3, "F3"); // unbinds the f3 key
            me.input.unbindKey(me.input.KEY.F4, "F4"); // unbinds the f4 key
            me.input.unbindKey(me.input.KEY.F5, "F5"); // unbinds the f5 key
            me.input.unbindKey(me.input.KEY.M, "M"); // unbinds the m key
            me.event.unsubscribe(this.handler); // unsubscribes the this.handler class
  
            
        }
});