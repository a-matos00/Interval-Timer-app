

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');

    screen.orientation.lock('portrait');//orientation lock(cordova plugin)

}

var interval_variable;  //variable used for intervals

var seconds_total_work = 0; //countdown variables
var seconds_total_rest = 0;

var minutes = 0;    //counter variables
var seconds = 0;

//user input variables
var input_seconds_work = 0;
var input_minutes_work = 0;

var input_seconds_rest = 0;
var input_minutes_rest = 0;

var sets = 1;   //number of repetitions
var input_sets = 1;

var state = "";         //logical variables
var pre_pause_state = "";

var beep = new Audio('beep.mp3');   //audio files
var beepbeep = new Audio('beepbeep.mp3');

var work_color = "#00cf26"; //green
var main_color = "#0069a5"; //blue


//function loads all DOM elements, restores local storage data and defines input functions
document.body.onload = function load()
{
    screen.orientation.lock('portrait');    //orientation lock(cordova plugin)

    displayContainer = new container("displayContainer");   //data and messages display container
    document.getElementById("main_container").appendChild(displayContainer.el);

    SetContainer = new container("SetContainer");   //set count display
    document.getElementById("displayContainer").appendChild(SetContainer.el);
    SetContainer.el.innerHTML = "SETS LEFT: " + sets;
    
    digitsContainer = new container("digitsContainer");   //timer display
    document.getElementById("displayContainer").appendChild(digitsContainer.el);

    MessageContainer = new container("MessageContainer");   //message display
    document.getElementById("displayContainer").appendChild(MessageContainer.el);
    MessageContainer.el.innerHTML = state;
   
    inputContainer = new container("inputContainer");   //main input wrapper
    document.getElementById("main_container").appendChild(inputContainer.el);

    WorkInputContainer = new container("WorkInputContainer");   //work input wrapper
    document.getElementById("inputContainer").appendChild(WorkInputContainer.el);
    WorkInputContainer.el.classList.add("flexeri");

    WorkDesc= new container("WorkDesc");
    document.getElementById("WorkInputContainer").appendChild(WorkDesc.el);
    WorkDesc.el.innerHTML = "WORK";

    WorkMinutesInput = new input_field("WorkMinutesInput");
    document.getElementById("WorkInputContainer").appendChild(WorkMinutesInput.el);

    WorkColon = new container("WorkColon");
    document.getElementById("WorkInputContainer").appendChild(WorkColon.el);
    WorkColon.el.innerHTML = ":";
    
    WorkSecondsInput = new input_field("WorkSecondsInput");
    document.getElementById("WorkInputContainer").appendChild(WorkSecondsInput.el);

    RestInputContainer = new container("RestInputContainer");    //rest input wrapper
    document.getElementById("inputContainer").appendChild(RestInputContainer.el);
    RestInputContainer.el.classList.add("flexeri");

    RestDesc= new container("RestDesc");
    document.getElementById("RestInputContainer").appendChild(RestDesc.el);
    RestDesc.el.innerHTML = "REST       ";

    RestMinutesInput = new input_field("RestMinutesInput");
    document.getElementById("RestInputContainer").appendChild(RestMinutesInput.el);

    RestColon = new container("RestColon");   //timer digits container
    document.getElementById("RestInputContainer").appendChild(RestColon.el);
    RestColon.el.innerHTML = ":";

    RestSecondsInput = new input_field("RestSecondsInput");
    document.getElementById("RestInputContainer").appendChild(RestSecondsInput.el);

    SetInputContainer = new container("SetInputContainer");   //set input wrapper
    document.getElementById("inputContainer").appendChild(SetInputContainer.el);
    SetInputContainer.el.classList.add("flexeri");

    SetDesc= new container("SetDesc");   //intput specifier
    document.getElementById("SetInputContainer").appendChild(SetDesc.el);
    SetDesc.el.innerHTML = "SETS";

    SetInput = new input_field("SetInput");
    document.getElementById("SetInputContainer").appendChild(SetInput.el);

    buttonContainer = new container("buttonContainer");   //button wrapper
    document.getElementById("main_container").appendChild(buttonContainer.el);
        
    startBtn = new fbutton("start_btn");    //start button
    document.getElementById("buttonContainer").appendChild(startBtn.el);

    stopBtn = new fbutton("stop_btn");    //start button
    document.getElementById("buttonContainer").appendChild(stopBtn.el);
    document.getElementById("stop_btn").style.visibility = "hidden";

    resetBtn = new fbutton("reset_btn");    //start button
    document.getElementById("buttonContainer").appendChild(resetBtn.el);

    //local storage acess(contains input values and number of sets from last input change)
    if(localStorage.getItem("saved_seconds_work") != undefined )
    {
        input_seconds_work = localStorage.getItem("saved_seconds_work")
    }
    
    if(localStorage.getItem("saved_minutes_work") != undefined )
    {
        input_minutes_work = localStorage.getItem("saved_minutes_work")
    }

    if(localStorage.getItem("saved_seconds_rest") != undefined )
    {
        input_seconds_rest = localStorage.getItem("saved_seconds_rest")
    }

    if(localStorage.getItem("saved_minutes_rest") != undefined )
    {
        input_minutes_rest = localStorage.getItem("saved_minutes_rest")
    }

    if(localStorage.getItem("saved_sets") != undefined )
    {
        input_sets = localStorage.getItem("saved_sets")
    }
    
    //applies local storage access result to GUI
    document.getElementById("WorkSecondsInput").value = input_seconds_work;
    document.getElementById("WorkMinutesInput").value = input_minutes_work;
    document.getElementById("RestSecondsInput").value = input_seconds_rest;
    document.getElementById("RestMinutesInput").value = input_minutes_rest;
    document.getElementById("SetInput").value = input_sets;
    SetContainer.el.innerHTML = "SETS LEFT: " + input_sets;
    digitsContainer.el.innerHTML = input_minutes_work + ":" + input_seconds_work;
    

    //function is called when the user types something in the input field
    $('#WorkSecondsInput').on('input', function() { 
             
             if( $(this).val() < 60 &&  $(this).val() > -1 &&  ($(this).val()).length < 3){
                input_seconds_work = $(this).val(); //save user input
                digitsContainer.el.innerHTML = input_minutes_work + ":" + input_seconds_work;  //HTML update
             }
        
            else{   //invalid input case
                $(this).val("");    //empty the input field
                input_seconds_work = 0;
                digitsContainer.el.innerHTML = input_minutes_work + ":" + input_seconds_work;  //HTML update
            }

            localStorage.setItem("saved_seconds_work", input_seconds_work );    //save input to local storage
     });    

    $('#RestSecondsInput').on('input', function() { 
             
             if( $(this).val() < 60 &&  $(this).val() > -1 &&  ($(this).val()).length < 3){ //les than 3 digits
                input_seconds_rest = $(this).val();
             }
        
            else{   //invalid input
                $(this).val("");
                input_seconds_rest = 0;
                seconds = 0;
                digitsContainer.el.innerHTML = minutes + ":" + input_seconds_rest;
            }
    
            localStorage.setItem("saved_seconds_rest", input_seconds_rest );
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
                digitsContainer.el.innerHTML = input_minutes_work + ":" + input_seconds_work;
            }

            localStorage.setItem("saved_minutes_work", input_minutes_work );
     });    

    $('#RestMinutesInput').on('input', function() { 
             
             if( $(this).val() < 60 &&  $(this).val() > -1 &&  ($(this).val()).length < 3){ //les than 3 digits
                input_minutes_rest = $(this).val();
                minutes = input_minutes_rest;
             }
        
            else{       //invalid input
                $(this).val("");
                input_minutes_rest = 0;
                digitsContainer.el.innerHTML = input_minutes_rest + ":" + input_seconds_rest;
            }

        localStorage.setItem("saved_minutes_rest", input_minutes_rest );
     });    

     $('#SetInput').on('input', function() { 
             
             if( $(this).val() < 100 &&  $(this).val() > 0 &&  ($(this).val()).length < 3){ //les than 3 digits
                input_sets = $(this).val();
               SetContainer.el.innerHTML = "SETS LEFT: " + input_sets;
             }
        
            else{       //invalid input
                $(this).val("");
                input_sets = 1;
            }

            localStorage.setItem("saved_sets", input_sets );
     }); 

}

//this class defines input objects
class input_field
{   
    constructor(arg_id) //the argument is the id which will be assigned to the object
    {
        this.el = document.createElement("INPUT");  //DOM element creation
        this.el.classList.add("input_field");   //assigns css class
        this.el.id = arg_id;   //asign object id
        this.el.type = "number";    //asign input type

        if(arg_id == "WorkMinutesInput")    //define input parameters according to id
        {
            this.el.min = 0;
            this.el.max = 99;
        }
    
        if(arg_id == "WorkSecondsInput")
        {
            this.el.min = 1;
            this.el.max = 59;
        }
    }  
}



class container
{   
    constructor(arg_id)
    {
        this.el = document.createElement("DIV");
        this.el.id = arg_id;   
    }
    
}

class fbutton   //functional button class, the function called on click is defined by the id of the button
{   
    constructor(arg_id)
    {
        this.el = document.createElement("BUTTON"); //next 3 lines create a DOM element with an assigned id and class
        this.el.classList.add("fbutton");
        this.el.id = arg_id;     

        if(arg_id == "start_btn"){  //START BUTTON
             this.el.innerHTML = "START";   //the button says START
  
            $(this.el).click(function(){    //( WORKOUT START )Function is called when the start button is pressed 

                //CSS
                document.getElementById("main_container").style.backgroundColor = work_color;   //changes background color 
                document.getElementById("reset_btn").style.visibility = "visible";  //the reset button is now visible
                document.getElementById("start_btn").style.visibility = "hidden";   //hides start button
                document.getElementById("stop_btn").style.visibility = "visible";   //pause button is now visible
                inputContainer.el.style.visibility = "hidden";  //hides all inputs
                document.getElementById("SetContainer").style.visibility = "visible";
                            
                //LOGIC
                seconds_total_work = parseInt(input_seconds_work) + parseInt(input_minutes_work * 60);  //rest and work time calculation based on user input
                seconds_total_rest = parseInt(input_seconds_rest) + parseInt(input_minutes_rest * 60);
                seconds = input_seconds_work;   //setting counter variables
                minutes = input_minutes_work;
                sets = input_sets;
                state = "WORK"; //state change

                //HTML
                digitsContainer.el.innerHTML = input_minutes_work + ":" + input_seconds_work;   //timer reset 
                 SetContainer.el.innerHTML = "SETS LEFT: " + input_sets;   //displays set count
                MessageContainer.el.innerHTML = state;  //display current state
                
                //START COUNTDOWN
                interval_variable = setInterval(countDownWork, 1000);   //create interval for countdown
            });     
        }  

        if(arg_id == "stop_btn"){   //PAUSE BUTTON

            this.el.innerHTML = "PAUSE";    //button label
        
            $(this.el).click(function(){

               if( state == "WORK" || state == "REST" ) //if the timer is running
               { 
                   //FUNCTIONAL
                    clearInterval(interval_variable);   //stops the timer

                    //LOGIC
                    pre_pause_state = state;    //saves the previous state for future reference
                    state = "PAUSE";    //state change

                    //HTML
                    MessageContainer.el.innerHTML = state;  //updates current state display
                    stopBtn.el.innerHTML = "continue";  //changes button label
               }

               else //if the timer is paused
               {
                    state = pre_pause_state;    //return to previous state

                    stopBtn.el.innerHTML = "PAUSE"; //change button label
    
                    if( state == "WORK" ){
                       interval_variable = setInterval(countDownWork, 1000);
                    }

                    if( state == "REST" ){
                        interval_variable = setInterval(countDownRest, 1000);
                    }
               }

                
            });
        }  

        if( arg_id == "reset_btn" ) //RESET BUTTON
        {
            this.el.innerHTML = "RESET";    //change button label
            
            $(this.el).click(function(){
                MessageContainer.el.innerHTML = "";

                //CSS
                document.getElementById("main_container").style.backgroundColor = main_color;
                document.getElementById("reset_btn").style.visibility = "hidden";                
                inputContainer.el.style.visibility = "visible";
                document.getElementById("start_btn").style.visibility = "visible";
                document.getElementById("stop_btn").style.visibility = "hidden";
                document.getElementById("SetContainer").style.visibility = "hidden";
                
                //LOGIC
                seconds = input_seconds_work;
                minutes = input_minutes_work;
                
                //HTML
                digitsContainer.el.innerHTML = minutes + ":" + seconds;
                SetContainer.el.innerHTML = "SETS LEFT: " + sets;
                
                //FUNCTIONAL
                clearInterval(interval_variable);             
            });
        }
    }   
}


function countDownWork()
    {
       if( seconds_total_work == 0)  //end of work interval
        {
            clearInterval(interval_variable);   //stop counting the work time
            sets--; //one less set to go
            SetContainer.el.innerHTML = "SETS LEFT: " + sets;   //set display update

            seconds_total_work = parseInt(input_seconds_work) + parseInt(input_minutes_work * 60);  //work time reset for future reference

            minutes = Math.floor(seconds_total_rest / 60);
            seconds = input_seconds_rest;   //prepare counter variables for rest time

            if( sets == 0 ){    //WORKOUT FINISH
                //CSS
                document.getElementById("main_container").style.backgroundColor = main_color;
                document.getElementById("reset_btn").style.visibility = "hidden";
                inputContainer.el.style.visibility = "visible";
                document.getElementById("stop_btn").style.visibility = "hidden";
                document.getElementById("start_btn").style.visibility = "visible"; 
                document.getElementById("SetContainer").style.visibility = "hidden";
            
                SetContainer.el.innerHTML = "SETS LEFT: " + sets;  
                sets = input_sets;
                state = "FINISHED";
                MessageContainer.el.innerHTML = state;
                   
                beepbeep.play();

                return;
            }
           
            if( sets != 0 )
                 beep.play();
                document.getElementById("main_container").style.backgroundColor = " #fc2a00 ";
                state = "REST";
                MessageContainer.el.innerHTML = state;
                 digitsContainer.el.innerHTML = input_minutes_rest + ":" + input_seconds_rest;  //HTML update
               interval_variable = setInterval(countDownRest, 1000);
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
        state = "REST";
        MessageContainer.el.innerHTML = state;
        document.getElementById("main_container").style.backgroundColor = " #fc2a00 ";

       if( seconds_total_rest == 0)  //kraj serije
        {
            beep.play();
            clearInterval(interval_variable);

            seconds_total_rest = parseInt(input_seconds_rest) + parseInt(input_minutes_rest * 60);
            minutes = Math.floor(seconds_total_work / 60);
            seconds = input_seconds_work;
            document.getElementById("main_container").style.backgroundColor = "#00cf26";
            state = "WORK";
            MessageContainer.el.innerHTML = state;
            digitsContainer.el.innerHTML = input_minutes_work + ":" + input_seconds_work;  //HTML update
            interval_variable = setInterval(countDownWork, 1000);

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



