LoginView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'LoginView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#loginTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.isConnecting = false;
        this.activated = false;
        this.passed = false;
        this.timerInterval = null;
        this.resumeTimeout = null;
    },
    
    events : {
        'touchend #clickExample' : 'onClickExample'
    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
    },
    
    onClickExample : function(){
        App.alert('touch Example called');
    }
});
