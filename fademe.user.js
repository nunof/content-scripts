// ==UserScript==
// @name        fademe
// @author      NunoF <self@nunof.eu>
// @namespace   self@nunof.eu
// @description fademe - progressively evaporates web site text content
// @version     0.1
// @grant       none
// @require     https://code.jquery.com/jquery-1.11.1.min.js
// @include     http://po-ex.net/*
// @include     http://www.po-ex.net/*
// ==/UserScript==
//
// ******************************************************************************
// @licstart  
// The following is the entire license notice for the JavaScript code in this page.
//
//  fuzzyme.user.js
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

var w_width = $(window).width();
var w_height = $(window).height();
var objobj = get_text_nodes();
init_res();

main();

// ********************************** //
//     script internal functions
// ********************************** //

function init_res() {
    $(window).bind('resize', resize_window(null));
    
}

function main() {

   setInterval(function() { 
       objobj.each(function(index) { 
           var num_words = $(this).text().split(" ").length;
           if (num_words > 0) {
               atmp = $(this).text().split(" ");
               atmp.splice(get_natural(num_words)-1, 1);
               $(this).last()[0].textContent= atmp.join(" ");
           }
       }); 
   }, 1000); 
   
}

function get_text_nodes() {
    return $('*', 'body').contents().filter(function() { return this.nodeType === 3; }); 
}                                          
                                          
function get_natural(top) {
    return Math.floor((Math.random() * top) + 1); 
}

function resize_window(e) {
    w_height = $(window).height();
    w_width = $(window).width() -400/4;
}


/*
@Scratchpad/6:95:1
*/