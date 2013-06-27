PageManager = apps.ui.ViewManager.extend({
	
	initialize: function(options) {
		apps.ui.ViewManager.prototype.initialize.call(this, options);
		
		this.prefix = 'PageManager';
		util.log(this.prefix,'initialize()');
		
		this.el = $('#pages');
		
	    this.currentView = null;
	      
		this.delegateEvents();

		this.views = {
			login: 			new LoginView({parent:this})
		};
	},
	
	handleBackButton: function() {
		util.log(this.prefix,'handleBackButton()');
		var handled = false;
		if (this.currentView && this.currentView.handleBackButton) {
			handled = this.currentView.handleBackButton();
		}
		util.log(this.prefix,'handleBackButton() handled: ' + handled);
		return handled;
	},
	
	setView: function(id, options) {
		util.log(this.prefix,'setView() id: ' + id + ' options: ' + JSON.stringify(options));
		var view = this.views[id];
		if (view) {
			apps.ui.ViewManager.prototype.setView.call(this, view, options);
	        this.currentView = view;
		}
	},
	
	
	clear: function(){
		this.el.hide();
		apps.ui.ViewManager.prototype.clear.call(this);
	},

	show: function(){		
		this.el.show();
	}
});