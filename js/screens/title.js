game.TitleScreen = me.ScreenObject.extend({
	/**	
	 *  action to perform on state change
	 */
	onResetEvent: function(){
            me.game.world.addChild(new me.Sprite(0, 0, me.loader.getImage('title-screen')), -10);
            
            me.input.bindKey(me.input.KEY.ENTER, 'start');
            
            me.game.world.addChild(new  (me.Renderable.extend({
                init: function(){
                    this._super(me.Renderable, 'init', [810, 30, me.game.viewport.width, me.game.height]);
                    this.font = new me.Font("Impact", 46, "red");
                    
                    
                },
                
                
                draw: function(){
                    this.font.draw(renderer.getContext(), "The Incredible Awesomenaut", 450, 130);
                    this.font.draw(renderer.getContext(), "Press ENTER to start!", 250, 530);
                }
            })));
            
            this.handler = me.event.subscribe(me.event.KEYDOWN, function (action, KeyCode, edge){
               if(action === "start"){
                   me.state.change(me.state.PLAY);
               } 
            });
        },
	
	/**	
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function(){
            me.input.unbindKey(me.input.KEY.ENTER);
            me.event.unsubscribe(this.handler);
        }
});
