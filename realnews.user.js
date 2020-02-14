// ==UserScript==
// @name        realnews
// @author      NunoF <self@nunof.eu>
// @namespace   self@nunof.eu
// @description real news should be unexpected
// @version     0.2
// @grant       none
// @require     https://code.jquery.com/jquery-1.11.1.min.js
// @require     https://raw.githubusercontent.com/techfort/LokiJS/master/build/lokijs.min.js
// @require     https://raw.githubusercontent.com/Stuk/jszip/master/dist/jszip.min.js
// @resource    realnewszip https://telepoesis.net/nunof/realnews.zip
// @include     http://eliterature.org/*
// @include     http://www.eliterature.org/*
// @include     http://*.amazon.com/*
// @include     http://amazon.com/*
// @grant       GM_getResourceURL
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

//exportFunction(GM_xmlhttpRequest, unsafeWindow, {defineAs: "GM_xmlhttpRequest"});

this.$ = this.jQuery = jQuery.noConflict(true);

var w_width = $(window).width();
var w_height = $(window).height();
var objobj = get_text_nodes();
var db = new loki('RealNews');
var nouns;
var verbs;
var adverbs;
var adjectives;

$(window).bind('resize', resize_window(null));
load_db_and_start();


// ********************************** //
//     script internal functions
// ********************************** //

function exportGMfunc(fn, name) {
    var fnName = name || fn.name;
    exportFunction(fn, unsafeWindow, {defineAs: fnName });
    return unsafeWindow[fnName];
}

function main() {

    //trace("main loop is starting");
    setInterval(function() { 
       objobj.each(function(index) { 
           var num_words = $(this).text().split(" ").length;
           if (num_words > 1) {
               var word_pos = get_natural(num_words) - 1;
               var atmp = $(this).text().split(" ");
               var tmps = atmp[word_pos];
               if (tmps.length == 0) return;
               var capitalized = (tmps.charAt(0) == tmps.charAt(0).toUpperCase());
               tmps = tmps.toLowerCase();
               //trace("word to replace is " + tmps);

               rs = nouns.find( {'entry': tmps } );
               
               if (rs != null) {
                   var newid = get_natural(nouns.data.length);
               		word_new = nouns.get(newid);
                    if (word_new == null) {
                        //trace("noun get "+newid+" is null");
                        return;
                    }
                   atmp[word_pos-1] = capitalized ? first_caps(word_new.entry) : word_new.entry;
               		$(this).last()[0].textContent= atmp.join(" ");
                   	return;
               }
		       rs = verbs.find( {'entry': tmps } );
               if (rs != null) {
                   var newid = get_natural(verbs.data.length);
               		word_new = verbs.get(newid);
                    if (word_new == null) {
                        //trace("verb get "+newid+" is null");
                        return;
                    }

                    atmp[word_pos-1] = capitalized ? first_caps(word_new.entry) : word_new.entry;
               		$(this).last()[0].textContent= atmp.join(" ");
                   	return;
               }

		       rs = adverbs.find( {'entry': tmps } );
               if (rs != null) {
                   var newid = get_natural(adverbs.data.length);
               		word_new = adverbs.get(newid);
                    if (word_new == null) {
                        //trace("adverb get "+newid+" is null");
                        return;
                    }
                   
               		atmp[word_pos-1] = capitalized ? first_caps(word_new.entry) : word_new.entry;
               		$(this).last()[0].textContent= atmp.join(" ");
                   	return;
               }

               rs = adjectives.find( {'entry': tmps } );
               if (rs != null) {
                   var newid = get_natural(adjectives.data.length);
               		word_new = adjectives.get(new_id);
                    if (word_new == null) {
                        //trace("adjective get "+newid+" is null");
                        return;
                    }
                   
               		atmp[word_pos-1] = capitalized ? first_caps(word_new.entry) : word_new.entry;
               		$(this).last()[0].textContent= atmp.join(" ");
                   	return;
               }
               
           }
       }); 
   }, 5000); 
   
}

function first_caps(word)
{
    return word.charAt(0).toUpperCase() + word.slice(1);
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


function trace(message){
    if(typeof console !== 'undefined' && console.log){ console.log(message); }
}
 
function load_db_and_start() {

    var json_data = "";
    var str = atob(GM_getResourceURL("realnewszip"));
    //trace("str " + str2.substring(0, 25));
    
    var zip = new JSZip(str);
	json_data = zip.file("RealNews").asText();

    if (json_data.length > 0) {
		db.loadJSON(json_data);
		nouns = db.getCollection('nouns');
		verbs = db.getCollection('verbs');
		adverbs = db.getCollection('adverbs');
		adjectives = db.getCollection('adjectives');

		main();
    }
}


function load_zip_url(srcurl) {	
    trace("zip url is " + srcurl);
	  JSZipUtils.getBinaryContent(srcurl, function(err, data) {
        trace("got zip data");
		   if (err) { trace(err); }
		   var zip = new JSZip(data);
		   json_data = zip.file("RealNews").asText();
		   db.loadJSON(json_data);
		   nouns = db.getCollection('nouns');
		   verbs = db.getCollection('verbs');
		   adverbs = db.getCollection('adverbs');
		   adjectives = db.getCollection('adjectives');

		   main();
	});
}

function load_external_url1(src_url) {
    trace("will start loading external file");
    GM_xmlhttpRequest({
      method: "GET",
      url: src_url,
      responseType: 'blob',
      onload: function(res) { 
          trace("zip loaded");
          var zip = new JSZip(res.response);
		      json_data = zip.file("RealNews").asText();
		      db.loadJSON(json_data);
		      nouns = db.getCollection('nouns');
		      verbs = db.getCollection('verbs');
		      adverbs = db.getCollection('adverbs');
		      adjectives = db.getCollection('adjectives');

		      main();
      },
      onerror: function(res) {
        var msg = "An error occurred."
           + "\nreadyState: " + res.readyState
           + "\nresponseHeaders: " + res.responseHeaders
           + "\nstatus: " + res.status
           + "\nstatusText: " + res.statusText
           + "\nfinalUrl: " + res.finalUrl;
        trace(msg);
      }
    });
}

function load_external_url2(src_url) {
    trace("will start loading external file");
    GM_xmlhttpRequest({
      method: "GET",
      url: src_url,
      overrideMimeType: "text/plain; charset=x-user-defined",
      onreadystatechange: function(res) { if(res.readyState === 4 && res.status === 200) trace("ready and len is " + res.response.length); },
      onload: function(res) { 
          trace("zip loaded");
          r = res.response;
          data = new Uint8Array(res.length);
          for (i = 0; i < r.length; i++) { data[i] = r.charCodeAt(i); }
          blob = new Blob([data], {type: "application/zip"});
          var zip = new JSZip(blob);
		      json_data = zip.file("RealNews").asText();
		      db.loadJSON(json_data);
		      nouns = db.getCollection('nouns');
		      verbs = db.getCollection('verbs');
		      adverbs = db.getCollection('adverbs');
		      adjectives = db.getCollection('adjectives');

		      main();
      },
      onerror: function(res) {
        var msg = "An error occurred."
           + "\nreadyState: " + res.readyState
           + "\nresponseHeaders: " + res.responseHeaders
           + "\nstatus: " + res.status
           + "\nstatusText: " + res.statusText
           + "\nfinalUrl: " + res.finalUrl;
        trace(msg);
      }
    });
}


/*
@Scratchpad/6:95:1
*/
