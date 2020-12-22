

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');


}


document.body.onload = function load()
{
    mainDisplay = new display("main");   //main display
    document.getElementById("box").appendChild(mainDisplay.el);

    digitsContainer = new display("digitsContainer");   //timer digits display
    document.getElementById("main").appendChild(digitsContainer.el);

    digitsContainer.el.innerHTML = "01" + ":" + "55";

   /* startBtn = new fbutton("btn");
    document.getElementById("box").appendChild(startBtn.el);
    */
}


class display
{   
    constructor(arg_id)
    {
        this.el = document.createElement("DIV");
        this.el.classList.add("display");
        this.el.id = arg_id;   
    }
    
}

class fbutton
{   
    constructor(arg_id)
    {
        this.el = document.createElement("BUTTON");
        this.el.innerHTML = "botun";
        this.el.classList.add("fbutton");
        this.el.id = arg_id;      
    }   
}



