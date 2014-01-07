var highlight = "yellow";
var isLight = true;
var highlights = [
    "yellow",
    "red",
    "blue",
    "green",
    "cyan",
    "orange",
    "magenta",
    "violet"
];
var html = document.querySelector("html");
function switchBg(){
    if(isLight){
        html.classList.remove("light");
        html.classList.add("dark");
    } else {
        html.classList.add("light");
        html.classList.remove("dark");
    }
    isLight = !isLight;
}

function setHighlight(color){
    if(highlights.indexOf(color) < 0){
        return console.error("Not a valid colour");
    }
    html.classList.remove(highlight);
    html.classList.add(color);
    highlight = color;
}

var changeBg = Math.round(Math.random());

if (changeBg) {
    switchBg();
}

var highlightIndex = Math.floor(Math.random() * 7);

setHighlight(highlights[highlightIndex]);
