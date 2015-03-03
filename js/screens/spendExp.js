game.SpendExp = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
       
	onResetEvent: function(){
              me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('exp-screen')), -10); // loads and gets the title screen image
        
              
              me.game.world.addChild(new (me.Renderable.extend({
                  init: function() {
                      this._super(me.Renderable, "init", [270, 240, 300, 50]);
                      this.font = new me.Font("Aharoni", 46, "white");
                  },
                  
                  draw: function(renderer){
                      // me.audio.playTrack("the-glory-days"); // plays the song, "The Glory Days"
                      this.font.draw(renderer.getContext(), "SPEND", this.pos.x, this.pos.y); // draws the words "NEW GAME"
                  
                  }
                  
                 
              })));
                    
                },
                
                
               
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {

          me.audio.stop("the-glory-days"); // stops the song, "The Glory Days"

        }
});