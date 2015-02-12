game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
       
	onResetEvent: function(){
              me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10);
              
              me.input.bindKey(me.input.KEY.ENTER, "start");
              
              me.game.world.addChild(new (me.Renderable.extend({
                  init: function() {
                      this._super(me.Renderable, "init", [510, 30, me.game.viewport.width, me.game.viewport.height]);
                      this.font = new me.Font("Aharoni", 46, "white");
                  },
                  
                  draw: function(renderer){
                      me.audio.playTrack("the-glory-days");
                      this.font.draw(renderer.getContext(), "AWESOMENAUTS", 450, 130);
                      this.font.draw(renderer.getContext(), "Press ENTER To Start!", 250, 530);
                  }
              })));
                    
                    this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, keyCode, edge){
                        if(action === "start"){
                            
                            me.state.change(me.state.PLAY);
                        };
                    });
                    
                },
                
                
               
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function(){
          me.input.unbindKey(me.input.KEY.ENTER);
          me.audio.stop("the-glory-days");
          me.event.unsubscribe(this.handler);
        }
});
