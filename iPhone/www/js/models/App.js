App = {};

App.EVENTS = {
    appPaused : 'app.paused',
    appResumed : 'app.resumed',
    appResumed : 'app.active',
    appOnline : 'app.online',
    appOffline : 'app.offline'
};

_.extend(App, Backbone.Events, {

    toString : function() {
        return '[App]';
    },

    initialize : function(config, callback) {
        this.prefix = 'App';

        util.log(this.prefix, 'initialize()');

        this.userConnected = false;
        
        this.serverError = false;
        
        this.blockReturn = false;

        /** This will hold the contents of config.json */
        this.config = config || {};

        /** This will hold all the app data */
        this.data = null;

        /** This will hold the main PageManager which is a ViewManager */
        this.pages = null;
        
        /** This will hold the services calls*/
        this.server = null;

        /** This will hold the Settings Page */
        this.settings = null;

        /** This will hold all page/view html templates */
        this.templates = null;
        
        // Init Templates
        this.initTemplates(callback);
    },

    initTemplates : function(callback) {
        var file = this.config.templates;
        util.log(this.prefix, 'initTemplates() file: ' + file);
        $.get(file, _.bind(function(data) {
            this.templates = $(data);
            util.log(this.prefix, 'initTemplates() loaded');
            this.initClient(callback);
        }, this), 'text');
    },

    initClient : function(callback) {
        if (callback) {
            callback();
        }
    },

    startApp : function() {
        util.log(this.prefix, 'startApp()');

        util.log(this.prefix, 'Config: ' + JSON.stringify(this.config));
        
        if (util.supports_html5_storage()) {
            //TODO: Display instructions only the first time.
        }
        
        //Sets loading notification
        util.setBlockui();

        // Initialize the Page Manager
        this.pages = new PageManager();
        
        //Initializes the Server Object
        this.server = new Server({host:App.config.ApiEndPoint});
        
        this.pages.setView('login');

    },

    reset : function(viewId, options) {
        util.log(this.prefix, '!!!! reset() !!!!');
        this.pages.clear();

        var viewIdl = viewId || 'main';
        this.pages.setView(viewIdl, options);

    },

    onBackButton : function() {
        util.log(this.prefix, '!!!! onBackButton() !!!! blockReturn: ' + this.blockReturn);
        if(this.blockReturn == true){
            return;
        }
        var handled = false;

        // handled = this.settings.handleBackButton();
        if (!handled) {
            /*
             * if(this.popups.currentView){ handled = this.popups.handleBackButton(); }else
             */
            if (!handled) {
                handled = this.pages.handleBackButton();
            }

        }
        util.log(this.prefix, 'onBackButton() handled: ' + handled);
        if (!handled) {
            util.log(this.prefix, 'onBackButton() !!!! EXIT APP');
            if (window.Cordova) {
                navigator.app.exitApp();
            } else {
                window.history.back();
            }
        }
    },

    onPause : function() {
       util.log(this.prefix,'!!!! onPause() !!!!');
        this.trigger(App.EVENTS.appPaused);
    },

    onResume : function() {
        util.log(this.prefix, '!!!! onResume() !!!!');
        this.trigger(App.EVENTS.appResumed);
    },

    onActive : function() {
        util.log(this.prefix, '!!!! onActive() !!!!');
        this.trigger(App.EVENTS.appActive);
    },

    onOnline : function() {
        util.log(this.prefix, '!!!! onOnline() !!!!');
        this.trigger(App.EVENTS.appOnline);

        // If we kick to the online state, but we were offline before
        // try a reset of the views so discovery happens
        if (this.wasOffline) {
            util.log(this.prefix, 'Transitioned from offline to online -> resetting the view');
            // App.reset();
            this.wasOffline = false;
        }
    },

    onOffline : function() {
        util.log(this.prefix, '!!!! onOffline() !!!!');
        this.trigger(App.EVENTS.appOffline);
        this.alert('Debes estar conectado para usar la applicación');
        this.pages.setView('main');
        // track this state for when we are online
        this.wasOffline = true;
    },

    onError : function(event) {
        var result = event.result;
        util.log(this.prefix, 'onError() result: ' + result);
        // TODO:
    },

    logout : function() {
        util.log(this.prefix, ' logout()');
        this.pages.setView('main');
        $.unblockUI(); //Removes loading notification
    },
    
    /*
     * Native Generic (phonegap) alert that displays a message and an ok button
     */
    alert : function(message, callback, title, buttonName) {
        if (navigator.notification) {
            navigator.notification.alert(message, callback, title || App.config.appTitle, buttonName || 'OK');
        } else {
            alert(message);
            if (callback)
                callback();
        }
    },

    /*
     * Native Generic (phonegap) alert that displays a message and an ok button
     */
    confirm : function(message, callback, title, buttonLabels) {
        if (navigator.notification) {
            navigator.notification.confirm(message, callback, title || App.config.appTitle, buttonLabels);
        } else {
            var result = confirm(message);
            if (callback)
                callback(result == true ? 1 : 2);
        }
    }
});