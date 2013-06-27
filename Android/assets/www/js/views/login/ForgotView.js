ForgotView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'ForgotView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#forgotTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
        
        this.textEmail = this.$('#text-email');
    },
    
    events : {
        'touchend #backToLogin' : 'handleBackButton',
        'submit #formForgot' : 'onSubmitForgot'
    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
    },
    
    onSubmitForgot : function(){
        var email = this.textEmail.val();
        util.log(this.prefix, 'email: ' + email);
        
        if(!email){
            App.alert('Por favor complete el campo de correo electrónico.');
            return false;
        }
        
      //Forgot password/username service
       App.server.makeRequest('RecordarPassword', { Email : email}, _.bind(this.onForgotPassword, this));
        
       return false;
    },
    
    onForgotPassword : function(response){
        util.log(this.prefix, ' FORGOT PASSWORD RESPONSE: ' + JSON.stringify(response));
        //05-28 16:45:59.130: I/Web Console(32164): Abbott : ForgotView :  FORGOT PASSWORD RESPONSE: {"recordar":[{"Repuesta":"El usuario no esta registrado","Mensaje":"Error"}]}:35
       //05-28 16:46:46.855: I/Web Console(32164): Abbott : ForgotView :  FORGOT PASSWORD RESPONSE: {"recordar":[{"Repuesta":"Contrasena actualizada, envio de correo realizado","Mensaje":"Successfully"}]}:35
        var responseObject = response.recordar[0];
        if(responseObject.Mensaje == 'Successfully'){
            this.handleBackButton();
        }
        App.alert(responseObject.Repuesta);
    },
    
    
    handleBackButton : function() {
        util.log(this.prefix, 'handleBackButton');
        this.parent.setView('login');
        return true;
    }
});
