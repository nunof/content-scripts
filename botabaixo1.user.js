// ==UserScript==
// @name        botabaixo
// @namespace   self@nunof.eu
// @description a monkey that wreaks havoc your web site
// @version     0.1
// @grant       none
// @require     https://code.jquery.com/jquery-1.11.1.min.js
// @require     https://github.com/daftspunk/3d-falling-leaves/raw/gh-pages/rotate3Di.min.js
// @require     https://github.com/daftspunk/3d-falling-leaves/raw/gh-pages/3d-falling-leaves.min.js
// @include     http://po-ex.net/*
// @include     http://www.po-ex.net/*
// ==/UserScript==
//
// ******************************************************************************
// @licstart  
// The following is the entire license notice for the JavaScript code in this page.
//
//  botabaixo.user.js
//  Copyright (C) 2014  Nuno Ferreira - self@nunof.eu
//
//  The JavaScript code in this page is free software: you can
//  redistribute it and/or modify it under the terms of the GNU
//  General Public License (GNU GPL) as published by the Free Software
//  Foundation, either version 3 of the License, or (at your option)
//  any later version.  The code is distributed WITHOUT ANY WARRANTY;
//  without even the implied warranty of MERCHANTABILITY or FITNESS
//  FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
//
//  As additional permission under GNU GPL version 3 section 7, you
//  may distribute non-source (e.g., minimized or compacted) forms of
//  that code without the copy of the GNU GPL normally required by
//  section 4, provided you include this license notice and a URL
//  through which recipients can access the Corresponding Source.
//
// @licend  
// The above is the entire license notice for the JavaScript code in this page.
//
// ******************************************************************************
//

this.$ = this.jQuery = jQuery.noConflict(true);

$("<style type='text/css'> .october-leaf { position: absolute; background-color: transparent; background-image: url('https://github.com/daftspunk/3d-falling-leaves/raw/gh-pages/leaves.png'); -webkit-transform: translateZ(0); -moz-transform: translateZ(0); transform: translateZ(0); } </style>").appendTo("head");

/*
$.getScript( "https://github.com/daftspunk/3d-falling-leaves/blob/gh-pages/rotate3Di.min.js", function( data, textStatus, jqxhr ) {
    console.log( textStatus ); // Success
    console.log( jqxhr.status ); // 200
    $.getScript( "https://github.com/daftspunk/3d-falling-leaves/blob/gh-pages/3d-falling-leaves.min.js", function( data, textStatus, jqxhr ) {
       console.log( textStatus ); // Success
       console.log( jqxhr.status ); // 200
    });
});
*/

main();

// ********************************** //
//     script internal functions
// ********************************** //

function main() {

    var w_width = $(window).width();
    var w_height = $(window).height();

    $(window).bind('resize', resize_window(null));

    $('body').css('background-color', get_color());

    $('table', 'body').each(function(index) {
        //console.log("table " + index);
        atmp = element2array($(this), 'td');
        $(this).remove();
        for (var i = 0; i < atmp.length; i++) {
           for (var j = 0; j < atmp[i].length; j++) {
               var $div = $("<div></div>");
               $div.html(atmp[i][j]);
               $("body").append($div);
               //console.log(atmp[i][j]);
           }
        }
    });

    $('ul', 'body').each(function(index) {
        //console.log("list " + index);
        atmp = element2array($(this), 'li');
        $(this).remove();
        for (var i = 0; i < atmp.length; i++) {
           for (var j = 0; j < atmp[i].length; j++) {
               var $div = $("<div></div>");
               $div.html(atmp[i][j]);
               $("body").append($div);
               //console.log(atmp[i][j]);
           }
        }
    });

    $('div', 'body').each(function(index) {
       $(this).removeClass();
       var element = $(this).detach().prependTo("body"); // detach() or unwrap()
       $(this).css('color', get_color());
       $(this).css('position', 'absolute');
       $(this).css('background-color', get_color());
       $(this).css('border-color', get_color());
       $(this).css('left', get_left());
       $(this).css('top', get_top());
       $(this).css('text-decoration', get_textdeco()); 
       $(this).css('font-family', get_fontfamily()); 
    });

    setInterval(function() { dancing_divs() }, 5000);

    jQuery(document).octoberLeaves({
        leafStyles: 3,
        speedC: 2,
        rotation: 1,
        rotationTrue: 1,
        numberOfLeaves: 15,
        size: 40,
        cycleSpeed: 30
    }); 
}

    
function dancing_divs() {

    $('body').css('background-color', get_color());
    $('div', 'body').each(function(index) {    
         $(this).animate({
             opacity: get_fraction(2),
             left: get_left(),
             top: get_top(),
             color: get_color()
          }, 2000);
    });
}

function get_fraction(decimals) {
    return (Math.random() * (1 - 0.1) + 0.1).toFixed(decimals);
}

function resize_window(e) {
    w_height = $(window).height();
    w_width = $(window).width() -400/4;
}

function get_color() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function get_left() {
    return Math.floor(Math.random() * w_width - 100);
}

function get_top() {
    return Math.floor(Math.random() * w_height - 80);
}


function get_textdeco() {
    var tcs = ["none", "underline", "overline", "line-through", "initial", "inherit"];
    return tcs[(Math.floor(Math.random() * 5))];
}

function get_fontfamily() {
    var ff = ["serif", "sans-serif", "cursive", "fantasy", "monospace"];
    return ff[(Math.floor(Math.random() * 5))];
}

function element2array(jquery_obj, element) {
    var element_array = [];

    jquery_obj.each(function(index) {
       var rowarray = [];
       var obj_data = $(this).find(element);
       if (obj_data.length > 0) {
        obj_data.each(function() { 
            //console.log($(this).html());
            rowarray.push($(this).html()); 
        });
        element_array.push(rowarray);
       }
    });
    
    //if (typeof element_array[0][0] != "undefined" && element_array[0][0].constructor == Array) console.log(element + " is multidim");
    //else console.log(element + " is unidim");
/*    
    for (var i = 0; i < element_array.length; i++) {
       for (var j = 0; j < element_array[i].length; j++) {
              console.log("i=" + i + "; j=" + j + " => " + element_array[i][j]);
       }
    }
*/ 
    return element_array;
}

/*
Exception: jQuery(...).octoberLeaves is not a function
@Scratchpad/6:95:1
*/