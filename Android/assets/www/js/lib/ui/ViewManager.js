apps.ui.ViewManager = apps.ui.View.extend({
	
	initialize: function(options) {
		apps.ui.View.prototype.initialize.call(this, options);
		this.prefix = 'apps.ui.ViewManager';
		util.log(this.prefix, 'initialize()');
		this.defaultAnimationTime = 300;
		this.currentView = null;
	},
	
	toString: function() {
		return '[apps.ui.ViewManager]';
	},
	
	clear: function() {
		util.log(this.prefix,'clear()');
		this._deactivateView(this.currentView);
		this.currentView = null;
	},
	
	setView: function(view, options) {
		util.log(this.prefix,'setView() view: ' + view  + ' options: ' + JSON.stringify(options));
		if (!view) return false;
		if (view == this.currentView) {
			return;
		}
		
			this._activateView(view, options);
			this._deactivateView(this.currentView, options);
			this.currentView = view;
			this.trigger(apps.ui.ViewManager.EVENTS.viewChanged, view);
	},
	
	_deactivateView: function(view, options) {
		if (!view) return true;
		util.log(this.prefix,'_deactivateView() view: ' + view);
		view._beforeDeactivate(options);
		$(view.el).hide();
		$(view.el).detach();
		view._deactivate(options);
		this.trigger(apps.ui.ViewManager.EVENTS.viewDeactivated, view);
	},
	
	_activateView: function(view, options) {
		if (!view) return false;
		util.log(this.prefix,'_activateView() view: ' + view);
		view._beforeActivate(options);
		$(this.el).append($(view.el));
		$(view.el).show();
		view._activate(options);
		this.trigger(apps.ui.ViewManager.EVENTS.viewActivated, view);
	},
	
	isChildView: function(view) {
		return view && $(view.el).parent().is($(this.el));
	}
	
});

apps.ui.ViewManager.EVENTS = {
	viewActivated: 			'viewActivated',
	viewDeactivated: 		'viewDeactivated',
	viewChanged: 			'viewChanged'
};