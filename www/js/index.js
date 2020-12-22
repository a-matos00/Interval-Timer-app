

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
    x = new display_screen;
    document.getElementById("box").appendChild(x.display);
    y = new fbutton("btn");
    document.getElementById("box").appendChild(y.el);
    

    if( localStorage.getItem("broj") != null || NaN || undefined)
    {      
        $("#box").append(localStorage.getItem("broj"));
    }
    else{
        document.getElementById("box").innerHTML += "nema";
    }
    
    
}


class display_screen
{   
    constructor()
    {
        this.display = document.createElement("DIV");
        this.display.classList.add("display");
        
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

        $(this.el).click(function(){
            localStorage.setItem("broj", "2");
            $("#btn").html(localStorage.getItem("broj"));
        });
            
     }   
}



