game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
       
	onResetEvent: function(){
              me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10); // loads and gets the title screen image
              
              me.input.bindKey(me.input.KEY.ENTER, "start"); // binds the enter key to start the game
              
              me.game.world.addChild(new (me.Renderable.extend({
                  init: function() {
                      this._super(me.Renderable, "init", [510, 30, me.game.viewport.width, me.game.viewport.height]);
                      this.font = new me.Font("Aharoni", 46, "white"); // sets aharoni as the selected drawing font
                  },
                  
                  draw: function(renderer){
                      me.audio.playTrack("the-glory-days"); // plays the song, "The Glory Days"
                      this.font.draw(renderer.getContext(), "AWESOMENAUTS", 450, 130); // draws the title of the game
                      this.font.draw(renderer.getContext(), "Press ENTER to start!", 250, 530); // draws the message that states to press enter to start the game
                  }
              })));
                    
                    this.handler = me.event.subscribe(me.event.KEYDOWN, function(action, keyCode, edge){
                        if(action === "start"){
   
                            me.state.change(me.state.PLAY); // switches the MENU state to PLAY
                        }
                    });
                    
                },
                
                
               
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
          me.input.unbindKey(me.input.KEY.ENTER); // unbinds the enter key
          me.audio.stop("the-glory-days"); // stops the song, "The Glory Days"
          me.event.unsubscribe(this.handler); // unsubscribes the handler
        }
});
