game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
       
	onResetEvent: function(){
             
              me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // loads and gets the title screen image
              game.data.option1 = new (me.Renderable.extend({
                  init: function() {
                      this._super(me.Renderable, "init", [270, 240, 300, 50]);
                      this.font = new me.Font("Arial", 46, "white"); // sets arial as the selected drawing font
                      me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                  },
                  
                  draw: function(renderer){
                     
                      this.font.draw(renderer.getContext(), "NEW GAME", this.pos.x, this.pos.y); // draws the words "NEW GAME"
                     
                  },
                  
                  update: function(dt){
                      return true;
                  },
                  
                  newGame: function(){
                      me.input.releasePointerEvent('pointerdown', this);
                      me.input.releasePointerEvent('pointerdown', this);
                      me.save.remove('exp'); // removes the exp
                      me.save.remove('exp1'); // removes the exp1
                      me.save.remove('exp2'); // removes the exp2
                      me.save.remove('exp3'); // removes the exp3
                      me.save.remove('exp4'); // removes the exp4
                      me.save.add({exp: 0, exp1: 0, exp2: 0, exp3: 0, exp4: 0}); // saves all of the exps
                      me.audio.play("cling"); // plays the cling sound effect
                      me.state.change(me.state.PLAY); // changes the MENU state to PLAY
                  }
              }));
                
               me.game.world.addChild(game.data.option1); 
               game.data.option2 = new (me.Renderable.extend({
                  init: function() {
                      this._super(me.Renderable, "init", [380, 340, 250, 50]);
                      this.font = new me.Font("Arial", 46, "white"); // sets arial as the selected drawing font
                      me.input.registerPointerEvent('pointerdown', this, this.newGame.bind(this), true);
                  },
                  
                  draw: function(renderer){
                  
                      this.font.draw(renderer.getContext(), "CONTINUE", this.pos.x, this.pos.y); // draws the word "CONTINUE"
                     
                  },
                  
                  update: function(dt){
                      return true;
                  },
                  
                  newGame: function(){
                      game.data.exp = me.save.exp; // saves the exp
                      game.data.exp1 = me.save.exp1; // saves the exp1
                      game.data.exp2 = me.save.exp2; // saves the exp2
                      game.data.exp3 = me.save.exp3; // saves the exp3
                      game.data.exp4 = me.save.exp4; // saves the exp4
                      me.input.releasePointerEvent('pointerdown', this);
                      me.input.releasePointerEvent('pointerdown', this);
                      me.audio.play("cling"); // plays the cling sound effect
                      me.state.change(me.state.SPENDEXP); // switches the MENU state to SPENDEXP
                  }
              }));
                  me.game.world.addChild(game.data.option2);  
                },
                
                
               
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
//          me.audio.play("mouse-click");  


        }
});
