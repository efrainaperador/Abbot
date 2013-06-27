InstructionsView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'InstructionsView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#instructionsTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
    },
    
    events : {
        'touchend #start' : 'onHomeEmpezar'
    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
    },
    
    onHomeEmpezar : function(){
        //TODO: Set flag so this view will only be displayed once
        this.parent.setView('login');
    }
});
