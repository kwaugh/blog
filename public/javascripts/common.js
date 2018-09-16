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

var vowel = new Set([65, 69, 73, 79, 85]);

async function lusty_dunghole() {
    var first_name_int = 65 + getRandomInt(26);
    first_name_int = vowel.has(first_name_int) ? first_name_int + 1 : first_name_int;
    var second_name_int = 65 + getRandomInt(26);
    second_name_int = vowel.has(second_name_int) ? second_name_int + 1 : second_name_int;
    var first_name_char = String.fromCharCode(first_name_int);
    var second_name_char = String.fromCharCode(second_name_int);
    new_name = first_name_char + "usty " + second_name_char + "unghole";
    $("#lusty_dunghole").text(new_name);
    setRandomColor("#lusty_dunghole");
    await sleep(1000);
    lusty_dunghole();
}

$(document).ready(function() { lusty_dunghole(); });
