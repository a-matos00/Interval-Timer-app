

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');


}

var countDownWork_int;  //setInterval variable
var countDownRest_int;  //setInterval variable

var seconds_total_work = 0;
var seconds_total_rest = 0;

var minutes = 0;
var seconds = 0;

var input_seconds_work = 0;
var input_minutes_work = 0;

var input_seconds_rest = 0;
var input_minutes_rest = 0;

var sets = 0;


document.body.onload = function load()
{
    
    displayContainer = new container("displayContainer");   //time display container
    document.getElementById("box").appendChild(displayContainer.el);

    digitsContainer = new container("digitsContainer");   //timer digits container
    document.getElementById("displayContainer").appendChild(digitsContainer.el);
    
    inputContainer = new container("inputContainer");   //button container
    document.getElementById("box").appendChild(inputContainer.el);

    WorkInputContainer = new container("WorkInputContainer");   //button container
    document.getElementById("inputContainer").appendChild(WorkInputContainer.el);

    WorkDesc= new container("WorkDesc");   //button container
    document.getElementById("WorkInputContainer").appendChild(WorkDesc.el);
    WorkDesc.el.innerHTML = "WORK";

    WorkMinutesInput = new input_field("WorkMinutesInput");
    document.getElementById("WorkInputContainer").appendChild(WorkMinutesInput.el);

    WorkSecondsInput = new input_field("WorkSecondsInput");
    document.getElementById("WorkInputContainer").appendChild(WorkSecondsInput.el);

    RestInputContainer = new container("RestInputContainer");   //button container
    document.getElementById("inputContainer").appendChild(RestInputContainer.el);

    RestDesc= new container("RestDesc");   //intput specifier
    document.getElementById("RestInputContainer").appendChild(RestDesc.el);
    RestDesc.el.innerHTML = "REST";

    RestMinutesInput = new input_field("RestMinutesInput");
    document.getElementById("RestInputContainer").appendChild(RestMinutesInput.el);

    RestSecondsInput = new input_field("RestSecondsInput");
    document.getElementById("RestInputContainer").appendChild(RestSecondsInput.el);

    SetInputContainer = new container("SetInputContainer");   //button container
    document.getElementById("inputContainer").appendChild(SetInputContainer.el);

    SetDesc= new container("SetDesc");   //intput specifier
    document.getElementById("SetInputContainer").appendChild(SetDesc.el);
    SetDesc.el.innerHTML = "SET";

    SetInput = new input_field("SetInput");
    document.getElementById("SetInputContainer").appendChild(SetInput.el);

    buttonContainer = new container("buttonContainer");   //button container
    document.getElementById("box").appendChild(buttonContainer.el);
        
    startBtn = new fbutton("start_btn");    //start button
    document.getElementById("buttonContainer").appendChild(startBtn.el);
    
     $('#WorkSecondsInput').on('input', function() { 
             
             if( $(this).val() < 60 &&  $(this).val() > -1 &&  ($(this).val()).length < 3){ //les than 3 digits
                input_seconds_work = $(this).val();
                digitsContainer.el.innerHTML = minutes + ":" + input_seconds_work;
                seconds = input_seconds_work;
             }
        
            else{   //invalid input
                $(this).val("");
                input_seconds_work = 0;
                seconds = 0;
                digitsContainer.el.innerHTML = minutes + ":" + input_seconds_work;
            }
     });    

    $('#RestSecondsInput').on('input', function() { 
             
             if( $(this).val() < 60 &&  $(this).val() > -1 &&  ($(this).val()).length < 3){ //les than 3 digits
                input_seconds_rest = $(this).val();
                digitsContainer.el.innerHTML = minutes + ":" + input_seconds_rest;
                seconds = input_seconds_rest;
             }
        
            else{   //invalid input
                $(this).val("");
                input_seconds_rest = 0;
                seconds = 0;
                digitsContainer.el.innerHTML = minutes + ":" + input_seconds_rest;
            }
     });

     $('#WorkMinutesInput').on('input', function() { 
             
             if( $(this).val() < 60 &&  $(this).val() > -1 &&  ($(this).val()).length < 3){ //les than 3 digits
                input_minutes_work = $(this).val();
                digitsContainer.el.innerHTML = input_minutes_work + ":" + input_seconds_work;
                minutes = input_minutes_work;
             }
        
            else{       //invalid input
                $(this).val("");
                input_minutes_work = 0;
                minutes = 0;
                digitsContainer.el.innerHTML = input_minutes_work + ":" + input_seconds_work;
            }
     });    

    $('#RestMinutesInput').on('input', function() { 
             
             if( $(this).val() < 60 &&  $(this).val() > -1 &&  ($(this).val()).length < 3){ //les than 3 digits
                input_minutes_rest = $(this).val();
                digitsContainer.el.innerHTML = input_minutes_rest + ":" + input_seconds_rest;
                minutes = input_minutes_rest;
             }
        
            else{       //invalid input
                $(this).val("");
                input_minutes_rest = 0;
                minutes = 0;
                digitsContainer.el.innerHTML = input_minutes_rest + ":" + input_seconds_rest;
            }
     });    

     $('#SetInput').on('input', function() { 
             
             if( $(this).val() < 10 &&  $(this).val() > 0 &&  ($(this).val()).length < 3){ //les than 3 digits
                sets = $(this).val();
                SetDesc.el.innerHTML = sets;
             }
        
            else{       //invalid input
                $(this).val("");
                sets = 0;
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

        if(arg_id == "WorkMinutesInput")
        {
            this.el.min = 0;
            this.el.max = 99;
        }
    
        if(arg_id == "WorkSecondsInput")
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
                document.getElementById("start_btn").style.visibility = "hidden";
                
                seconds_total_work = parseInt(input_seconds_work) + parseInt(input_minutes_work * 60);

                seconds_total_rest = parseInt(input_seconds_rest) + parseInt(input_minutes_rest * 60);
                
                seconds = input_seconds_work;
                minutes = input_minutes_work;
                digitsContainer.el.innerHTML = minutes + ":" + seconds;
                
                countDownWork_int = setInterval(countDownWork, 1000);

            });
        }   
    }   
}


function countDownWork()
    {
    
       if( seconds_total_work == 0)  //kraj serije
        {
            clearInterval(countDownWork_int);
            sets--;
            SetDesc.el.innerHTML = sets;


            seconds_total_work = parseInt(input_seconds_work) + parseInt(input_minutes_work * 60);
            minutes = Math.floor(seconds_total_rest / 60);
            seconds = input_seconds_rest;
           
            if( sets != 0 )
               countDownRest_int = setInterval(countDownRest, 1000);
            return;
        }
        
       else if( seconds != 0){  //normal case
            seconds--;
            seconds_total_work--;
        }
    
        else if(seconds == 0)   //minute pass
        {
            seconds = 59;
            seconds_total_work--;
        }

        minutes = Math.floor(seconds_total_work / 60);
    
        digitsContainer.el.innerHTML = minutes + ":" + seconds;   
    }

function countDownRest()
    {
    
       if( seconds_total_rest == 0)  //kraj serije
        {
            clearInterval(countDownRest_int);

            seconds_total_rest = parseInt(input_seconds_rest) + parseInt(input_minutes_rest * 60);
            minutes = Math.floor(seconds_total_work / 60);
            seconds = input_seconds_work;
                      
            countDownWork_int = setInterval(countDownWork, 1000);

        }
        
       else if( seconds != 0){  //normal case
            seconds--;
            seconds_total_rest--;
        }
    
        else if(seconds == 0)   //minute pass
        {
            seconds = 59;
            seconds_total_rest--;
        }

        minutes = Math.floor(seconds_total_rest / 60);
    
        digitsContainer.el.innerHTML = minutes + ":" + seconds;   
    }

