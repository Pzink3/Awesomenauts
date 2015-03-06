game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},

	 */
           { name: "background-tiles", type:"image", src: "data/img/background-tiles.png" }, // loads the background tiles.
           { name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png" }, // loads the meta-tiles.
           { name: "player", type:"image", src: "data/img/orcSpear.png" },// loads the orcSpear player.
           { name: "tower", type:"image", src: "data/img/tower_round.svg.png" }, // loads the tower.
           { name: "creep1", type:"image", src: "data/img/brainmonster.png" }, // loads the brain monster creep.
           { name: "title-screen", type:"image", src: "data/img/title.png" }, // loads the title screen image.
           { name: "exp-screen", type:"image", src: "data/img/loadpic.png" }, // loads the load pic.
           { name: "gold-screen", type:"image", src: "data/img/spend.png" }, // loads the spend pic.
         
        

 
   

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
           {name: "level01", type: "tmx", src: "data/map/test.tmx"}, // loads my test level.
	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	
           { name: "the-glory-days", type: "audio", src: "data/bgm/" }, // identifies the song, "The Glory Days" from the bgm folder
           { name: "the-incredits", type: "audio", src: "data/bgm/" }, // identifies the song, "The Incredits" from the bgm folder
           { name: "fnaf-3-menu-music", type: "audio", src: "data/bgm/" },
          
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
           { name: "mouse-click", type: "audio", src: "data/sfx/" },
           { name: "ticking-clock", type: "audio", src: "data/sfx/"},
        ];
