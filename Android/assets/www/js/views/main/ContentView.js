ContentView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'ContentView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#ContentTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
        
        this.header=this.$('#HeaderView');
        this.menu=this.$('#MenuView');
        this.container=this.$('#ContainerView');
        this.headerTitle = this.$('#titleView');
    },
    
    events : {
        'touchend #mainHeaderButton' : 'onMainHeaderButton',
        'touchend #secondHeaderButton' : 'onSecondHeaderButton'
    },

    activate : function() {
        if (this.activated == false) {
            this.contentManager = new ContentManager({element:this.container});
            this.activated = true;
        }
    },
    
    onMainHeaderButton : function(){
        //TODO:
    },
    
    onSecondHeaderButton : function(){
        //TODO:
    },
    
    handleBackButton : function() {
        util.log(this.prefix, 'handleBackButton');
        var handled = this.contentManager.handleBackButton();
        if (!handled) {
            this.parent.setView('login');
            return true;
        }
        return handled;
    }
});
