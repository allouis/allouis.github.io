
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
    function resizeSplashBlock(winHeight){
        var resultantHeight = winHeight - 100;
        splashBlock.style.height = resultantHeight + "px";
    }
    // setup page
    window.scroll(0);
    resizeSplashBlock(window.innerHeight);

}

window.onload = function(){ new MainPage() };

var Router = function(){
    this.getCurrentRoute();
};

Router.extend = function(props){
    var child = function(){ Router.apply(this, arguments); };
    var proto = Router.prototype;
    for(var prop in proto){
        child.prototype[prop] = proto[prop];
    }
    for(var prop in props){
        child.prototype[prop] = props[prop];
    }
    return child;
}

Router.prototype = {
    
    getCurrentRoute: function(){
        this.currentRoute = window.location.pathname;
    },

    routes: {},

    matchRoute: function(){
        for(var prop in this.routes){
            if(this.testRoute(this.currentRoute, prop)){
                return this.route(prop);
            }
        }
    },

    testRoute: function(currentRoute, route) {
        // TODO
        return !!currentRoute.match(route)[0];
    },

    route: function(route){
        this[this.routes[route]].call(this, route);
    }

}
