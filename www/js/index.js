

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');


}

var countdown_int;
var seconds_total = 5;

var minutes = Math.floor(seconds_total / 60);
var seconds= seconds_total % 60;




document.body.onload = function load()
{
    displayContainer = new container("displayContainer");   //time display container
    document.getElementById("box").appendChild(displayContainer.el);

    digitsContainer = new container("digitsContainer");   //timer digits container
    document.getElementById("displayContainer").appendChild(digitsContainer.el);
 
    buttonContainer = new container("buttonContainer");   //button container
    document.getElementById("box").appendChild(buttonContainer.el);

    inputContainer = new container("inputContainer");   //button container
    document.getElementById("box").appendChild(inputContainer.el);
    
    startBtn = new fbutton("start_btn");
    document.getElementById("buttonContainer").appendChild(startBtn.el);

    startBtn = new fbutton("stop_btn");
    document.getElementById("buttonContainer").appendChild(startBtn.el);
    
}

class input_field
{   
    constructor(arg_id)
    {
        this.el = document.createElement("INPUT");
        this.el.classList.add("input_field");
        this.el.id = arg_id;   
    }
    
}


class container
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
       
        this.el.classList.add("fbutton");
        this.el.id = arg_id;     
         digitsContainer.el.innerHTML = minutes + ":" + seconds;

    if(arg_id == "start_btn"){  //START BUTTON

         this.el.innerHTML = "START";
        
        $(this.el).click(function(){
         countdown_int = setInterval(countDown, 1000);

        });
    }

    if(arg_id == "stop_btn"){   //STOP BUTTON

        this.el.innerHTML = "STOP";

        $(this.el).click(function(){
             clearInterval(countdown_int);
        });
    }
    
        
    }   
}


function countDown()
    {
    
       if( seconds_total == 0)  //if the countdown is over
        {
            clearInterval(countdown_int);
            return;
        }
        
       if( seconds != 0){
            seconds--;
            seconds_total--;
        }
    
        else if(seconds == 0)
        {
            seconds = 59;
            seconds_total--;
        }

        minutes = Math.floor(seconds_total / 60);
    
        digitsContainer.el.innerHTML = minutes + ":" + seconds;   
    }





