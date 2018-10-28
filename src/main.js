/**
 * This is the demonstration project, it is installed when runing the command 
 * create-creenv --mode demo
 * 
 * Hello. Welcome to the creative environment This project showcases the functionnalities of creenv and can be used as a good
 * starting point for learning creenv. However, it is still recommended that you take at look at the Learning Table, a central
 * document where all the basic informations and links to more detailed ones about creenv can be found. 
 * 
 * <https://github.com/bcrespy/creenv/blob/master/learning-table.md>
 * 
 * By reading the code and the readme.md, you should be able to understand how creenv works and how you can work with creenv 
 * to ease the development process and focus only on your creative ideas :)
 */

// the core of creenv
import Creenv from "@creenv/core";

// ui elements
import HUD from "@creenv/hud";
import GUI from "@creenv/gui";
import Stats from "@creenv/stats";

// config + user controls 
import config from "./config";
import controls from "./user-controls";

/**
 * For the sake of the example, the rendering logic will take part in the render file
 * You should aways split a bit your code, it will make the process of identifying mistakes and improving your app easier :)
 */
import Renderer from "./renderer";

// see at the very end of the file to see this module in action
import Capture from "@creenv/capture";



/**
 * Your main class, then entry point of your application, must inherit the Core of creenv. It will ease the setting up process
 * and also allows the other modules to interract with creenv and your render to enable special features such as exporting 
 * your creations with @creenv/capture 
 */
class MyProject extends Creenv {
  /**
   * The init method will automatically be called by the bootstrap method (see at the end of this file). This is where you can 
   * fetch files, load heavy data... etc. You can either split your application into multiple files or do all your stuff in
   * here. For the sake of the example, set up is performed here whereas the render process takes place in an other file.
   */
  init() {
    // REQUIRED - calls the parent method 
    super.init();

    // you can specify a custom framerate (frames/sec) here 
    super.framerate(60);

    /**
     * setting up the interface. you can get more informations on how the HUD works within the Learning table, link at the top
     * of the document.
     */
    this.stats = new Stats();
    this.guiControls = new GUI(controls, GUI.POSITION.TOP_RIGHT);
    this.hud = new HUD();
    this.hud.add(this.stats);
    this.hud.add(this.guiControls);

    // we initialize our renderer
    this.renderer = new Renderer();
    this.renderer.init();
  }

  /**
   * This function will be called at each frame, automatically, given the framerate. This is how creenv behaves after the 
   * bootstrap method is called 
   */
  render() {
    this.stats.begin();

    /**
     * you can do whatever you want for your rendering process. here, we'll just call the renderer render() method and pass it
     * the elpased time since last frame deltaT and the elapsed time since the beginning. you can find a list of all the 
     * accessible variables within creenv by going to the Learning table.
     */
    this.renderer.render(this.deltaT, this.elapsedTime);

    this.stats.end();
  }
}


/**
 * To start your application, instanciate your project and call its bootstrap() method. The bootstrap method is a final method 
 * that cannot be overwrittent, which handles the correct behavior of the beginning of the rendering process.
 */
let project = new MyProject();
project.bootstrap(); 


/**
 * this is the only required line to be able to export your work as a video file. 
 * /!\ however, you will need to comment the  .bootstrap() method call just below to prevent the regular behaviour of the 
 * rendering loop. 
 * 
 * this is all explained in the Capture section within the Learning table
 */

// let capture = new Capture(project);