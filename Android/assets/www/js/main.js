$(document).ready(function() {
    
    // LOADS THE CONFIG FILE
    var loadConfig = function(callback) {
        var configFile = $.url().param().config || 'config.json';
        $.getJSON(configFile, _.bind(function(data) {

            var config = data || {};

            if (util.supports_html5_storage()) {
            }

            // Override the config with any url parameters
            _.extend(config, $.url().param());

            callback(config);

        }, this)).fail(function(error){
            util.log('error: ' + JSON.stringify(error));
        });
    };

    // THE FIRST THING WE DO IS LOAD THE CONFIG AND SETUP LOGGING
    loadConfig(function(config) {
        
        util.log('main', '!!!! DOCUMENT READY !!!!');

        // PREVENT SCROLLING
        document.addEventListener('touchmove', function(e) {
            e.preventDefault();
        });

        $(document).bind("touchmove", function(e) {
            e.preventDefault();
        });

        // PREVENT DOUBLE CLICK
        $(window).dblclick(function(event) {
            event.preventDefault();
        });

        $(document).bind("touchend", function(e) {
            e.preventDefault();
        });

        // LISTEN FOR DEVICE READY IF INSIDE CORDOVA
        if (window.cordova) {

            document.addEventListener('deviceready', function() {
                util.log('main', '!!!! DEVICE READY !!!!');

                // INITIALIZE THE APP
                App.initialize(config, function() {

                    // ASSIGN CORDOVA EVENTS
                    document.addEventListener('backbutton', _.bind(App.onBackButton, App), false);
                    document.addEventListener('pause', _.bind(App.onPause, App), false);
                    document.addEventListener('resume', _.bind(App.onResume, App), false);
                    document.addEventListener('active', _.bind(App.onActive, App), false);
                    document.addEventListener('online', _.bind(App.onOnline, App), false);
                    document.addEventListener('offline', _.bind(App.onOffline, App), false);

                    // START THE APP
                    App.startApp();
                });
            }, false);
        } else {
            // INITIALIZE THE APP
            App.initialize(config, function() {
                // MIMIC DEVICE EVENTS
                $(window).focus(_.bind(App.onResume, App));
                $(window).blur(_.bind(App.onPause, App));

                // START THE APP
                App.startApp();

            });
        }

    });

});
