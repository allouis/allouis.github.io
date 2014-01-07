if(!localStorage.getItem("oldHighlightIndex")) {
    localStorage.setItem("oldHighlightIndex", 1000);
}
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

function randomHighlights() {
    var highlightIndex = getRandomHighlightIndex();
    var oldIndex = localStorage.getItem("oldHighlightIndex");
    if(highlightIndex === parseInt(oldIndex, 10)) {
        return randomHighlights();
    }
    localStorage.setItem("oldHighlightIndex", highlightIndex);
    setHighlight(highlights[highlightIndex]);
}

function getRandomHighlightIndex(){
    return Math.floor(Math.random() * 7);
}
randomHighlights();
