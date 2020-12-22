

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');


}

var countdown_int;  //setInterval variable
var countdown_int_rest;  //setInterval variable

var seconds_total = 45;

var minutes = Math.floor(seconds_total / 60);
var seconds= seconds_total % 60;
var input_seconds = 0;
var input_minutes = 0;
var sets = 0;


document.body.onload = function load()
{
    
    displayContainer = new container("displayContainer");   //time display container
    document.getElementById("box").appendChild(displayContainer.el);

    digitsContainer = new container("digitsContainer");   //timer digits container
    document.getElementById("displayContainer").appendChild(digitsContainer.el);
 
    
    inputContainer = new container("inputContainer");   //button container
    document.getElementById("box").appendChild(inputContainer.el);

    buttonContainer = new container("buttonContainer");   //button container
    document.getElementById("box").appendChild(buttonContainer.el);

    
    startBtn = new fbutton("start_btn");    //start button
    document.getElementById("buttonContainer").appendChild(startBtn.el);

    startBtn = new fbutton("stop_btn"); //stop button
    document.getElementById("buttonContainer").appendChild(startBtn.el);

    minutesInput = new input_field("minutesInput");
    document.getElementById("inputContainer").appendChild(minutesInput.el);

    secondsInput = new input_field("secondsInput");
    document.getElementById("inputContainer").appendChild(secondsInput.el);

     $('#secondsInput').on('input', function() { 
             
             if( $(this).val() < 60 &&  $(this).val() > -1 &&  ($(this).val()).length < 3){ //les than 3 digits
                input_seconds = $(this).val();
                digitsContainer.el.innerHTML = minutes + ":" + input_seconds;
                seconds = input_seconds;
             }
        
            else{   //invalid input
                $(this).val("");
                input_seconds = 0;
                seconds = 0;
                digitsContainer.el.innerHTML = minutes + ":" + input_seconds;
            }
     });    

     $('#minutesInput').on('input', function() { 
             
             if( $(this).val() < 60 &&  $(this).val() > -1 &&  ($(this).val()).length < 3){ //les than 3 digits
                input_minutes = $(this).val();
                digitsContainer.el.innerHTML = input_minutes + ":" + input_seconds;
                minutes = input_minutes;
             }
        
            else{       //invalid input
                $(this).val("");
                input_minutes = 0;
                minutes = 0;
                digitsContainer.el.innerHTML = input_minutes + ":" + input_seconds;
            }
     });    
}

class input_field
{   
    constructor(arg_id)
    {
        this.el = document.createElement("INPUT");
        this.el.classList.add("input_field");
        this.el.id = arg_id;   
        this.el.type = "number";

        if(arg_id == "minutesInput")
        {
            this.el.min = 0;
            this.el.max = 100;

       

        }
    
        if(arg_id == "secondsInput")
        {
            this.el.min = 1;
            this.el.max = 59;
        }
    }  //constructor end
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
                seconds_total = parseInt(input_seconds) + parseInt(input_minutes * 60);
                alert(seconds_total);
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





