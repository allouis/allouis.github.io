(function(){
    if(!localStorage.getItem("oldHighlightIndex")) {
        localStorage.setItem("oldHighlightIndex", 1000);
    }
    var highlight = "yellow";
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

    function setHighlight(color){
        if(highlights.indexOf(color) < 0){
            return false;
        }
        html.classList.remove(highlight);
        html.classList.add(color);
        highlight = color;
        return true;
    }

    function randomHighlights() {
        var highlightIndex = random(highlights.length);
        var oldIndex = localStorage.getItem("oldHighlightIndex");
        if(highlightIndex === parseInt(oldIndex, 10)) {
            return randomHighlights();
        }
        localStorage.setItem("oldHighlightIndex", highlightIndex);
        setHighlight(highlights[highlightIndex]);
    }

    function random(i){
        return Math.floor(Math.random() * i);
    }

    window.setHighlight = setHighlight;

    var now = new Date();

    var hour = now.getHours();

    if (hour < 6 || hour > 18) {
        html.classList.remove('light');
        html.classList.add('dark');
    }
    randomHighlights();

    document.querySelector('.bg-button.light')
        .addEventListener('click', function(){
            html.classList.remove('dark');
            html.classList.add('light');
        }
    );

    document.querySelector('.bg-button.dark')
        .addEventListener('click', function(){
            html.classList.remove('light');
            html.classList.add('dark');
        }
    );

}());
