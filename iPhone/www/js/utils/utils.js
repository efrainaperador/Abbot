window.log = function f() {
    log.history = log.history || [];
    log.history.push(arguments);
    if (this.console) {
        var args = arguments, newarr;
        args.callee = args.callee.caller;
        newarr = [].slice.call(args);
        if (typeof console.log === 'object')
            log.apply.call(console.log, console, newarr);
        else
            console.log.apply(console, newarr);
    }
};
(function(a) {
    function b() {
    }
    for ( var c = "assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,time,timeEnd,trace,warn"
            .split(","), d; !!(d = c.pop());) {
        a[d] = a[d] || b;
    }
})(function() {
    try {
        console.log();
        return window.console;
    } catch (a) {
        return (window.console = {});
    }
}());
var util = {};
var logTag = 'Abbott';
var enableDebug = true;

util.log = function(prefix, message) {
    if (enableDebug){
        console.log(logTag + ' : ' + prefix + ' : ' + message);
    }
};

util.supports_html5_storage = function() {
    try {
        return 'localStorage' in window && window['localStorage'] !== null;
    } catch (e) {
        return false;
    }
};


util.setBlockui = function(){
    //CUSTOM BLOCK UI OPTIONS
    $.blockUI.defaults = {
        message: 'Cargando...',
        css: {
            padding:        0, 
            margin:         0, 
            width:          '30%', 
            top:            '40%', 
            left:           '35%', 
            textAlign:      'center', 
            color:          '#FFF', 
            border:         'none', 
            backgroundColor:'transparent',
            baseZ: 10000,
            fontSize : '2em'
        }, 
        
        overlayCSS:  { 
            backgroundColor: '#000', 
            opacity:         0.6 
        }, 
        
        showOverlay: true,
        
        onBlock: function() { 
           App.blockReturn = true;  
        }, 
        
        onUnblock: function() { 
           App.blockReturn = false;   
        }
    };
};

util.convertirMes = function(mes){
        switch(mes){
            case '01' : return 'ENE'; break;
            case '02' : return 'FEB'; break;
            case '03' : return 'MAR'; break;
            case '04' : return 'ABR'; break;
            case '05' : return 'MAY'; break;
            case '06' : return 'JUN'; break;
            case '07' : return 'JUL'; break;
            case '08' : return 'AGO'; break;
            case '09' : return 'SEP'; break;
            case '10' : return 'OCT'; break;
            case '11' : return 'NOV'; break;
            case '12' : return 'DIC'; break;
        }
};

var normalize = (function() {
    var from = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç",
    to   = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc",
    mapping = {};
    
    for(var i = 0, j = from.length; i < j; i++ )
    mapping[ from.charAt( i ) ] = to.charAt( i );
    
    return function( str ) {
    var ret = [];
    for( var i = 0, j = str.length; i < j; i++ ) {
    var c = str.charAt( i );
    if( mapping.hasOwnProperty( str.charAt( i ) ) )
    ret.push( mapping[ c ] );
    else
    ret.push( c );
    }
    return ret.join( '' );
    }
    
    })();