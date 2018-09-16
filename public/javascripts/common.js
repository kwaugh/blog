function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function setRandomColor(id) {
    var color = getRandomColor();
    $(id).css("background-color", color);
    var rgb = parseInt(color.substr(1), 16);   // convert rrggbb to decimal
    var r = (rgb >> 16) & 0xff;  // extract red
    var g = (rgb >>  8) & 0xff;  // extract green
    var b = (rgb >>  0) & 0xff;  // extract bl…
    if ((r+g+b) / 3 < 127) {
        $(id).css("color", "white");
    } else {
        $(id).css("color", "black");
    }

}

async function lusty_dunghole() {
    var first_name_char = String.fromCharCode(65 + getRandomInt(26));
    var second_name_char = String.fromCharCode(65 + getRandomInt(26));
    new_name = first_name_char + "usty " + second_name_char + "unghole";
    $("#lusty_dunghole").text(new_name);
    setRandomColor("#lusty_dunghole");
    await sleep(1000);
    lusty_dunghole();
}

$(document).ready(function() { lusty_dunghole(); });
