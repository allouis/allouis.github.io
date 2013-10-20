
var App = (function(){
    
    // Setup events;
    Events(this);
    // App stuff;

    return this;

}());

// Setup listeners
;(function(){
    
    window.addEventListener("resize", function(){
        App.emit("screen:resize", window.innerHeight);
    });

}());

function MainPage(){
    
    App.on("screen:resize", resizeSplashBlock);

    var splashBlock = document.getElementById("splash-block");
    var main = document.getElementById("main");
    var header = document.querySelector("header");
    function resizeSplashBlock(winHeight){
        var resultantHeight = winHeight - main.offsetHeight - header.offsetHeight;
        splashBlock.style.height = resultantHeight + "px";
    }
    // setup page
    window.scroll(0);
    resizeSplashBlock(window.innerHeight);

}

window.onload = function(){ new MainPage() };

