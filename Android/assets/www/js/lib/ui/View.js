var apps = apps || {};
apps.ui = apps.ui || {};

apps.ui.View = Backbone.View.extend({
	
	initialize: function(options) {
		Backbone.View.prototype.initialize.call(this, options);
		this.viewID = apps.ui.View.ViewID++;
		this.prefix = 'apps.ui.View';
		util.log(this.prefix,'initialize()');
		this.title = (options && options.title) ? options.title : ('View: ' + this.viewID);
		this.activated = false;
		this.active = false;
	},
	
	toString: function() {
		return '[apps.ui] viewID: ' + this.viewID + ', title: ' + this.title;
	},
	
	delegateEvents: function() {
		Backbone.View.prototype.delegateEvents.call(this);
	},
	
	_beforeActivate: function(options) {
		util.log(this.prefix,'_beforeActivate()');
		this.beforeActivate(options);
	},
	
	beforeActivate: function(options) {
		
	},
	
	_activate: function(options) {
		util.log(this.prefix,'_activate()');
		this.activate(options);
		this.activated = true;
		this.active = true;
		this.trigger(apps.ui.View.EVENTS.activated, this);
	},
	
	activate: function(options) {
		
	},
	
	_beforeDeactivate: function() {
		util.log(this.prefix,'_beforeDeactivate()');
		this.beforeDeactivate();
	},
	
	beforeDeactivate: function() {
		
	},
	
	_deactivate: function() {
		util.log(this.prefix,'_deactivate()');
		this.deactivate();
		this.active = false;
		this.trigger(apps.ui.View.EVENTS.deactivated, this);
	},
	
	deactivate: function() {
		 
	},
	
	_remove: function() {
		// TODO
		$(this.el).remove();
		this.remove();
	},
	
	remove: function() {
		
	},
	
	handleBackButton: function() {
		return false;
	}
});

apps.ui.View.ViewID = 0;

apps.ui.View.EVENTS = {
	activated: 			'activated',
	deactivated: 		'deactivated'
};
