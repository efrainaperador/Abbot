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
        this.textUsername = this.$('#text-username');
        this.textPassword = this.$('#text-password');
    },
    
    events : {
        'touchend #newUser' : 'onNewUser',
        'submit #formLogin' : 'onSubmitLogin',
        'touchend #forgotPass' : 'onForgotPass'
    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
        
        if(App.config.testing.active == true){
            this.textUsername.val(App.config.testing.user);
            this.textPassword.val(App.config.testing.password);
        }
    },
    
    onNewUser : function(){    	
        this.parent.setView('content');
        this.parent.views.content.contentManager.setView('registerprofile');
    },
    
    onSubmitLogin : function(){
        var user = this.textUsername.val();
        var pass = this.textPassword.val();
        util.log(this.prefix, 'user: ' + user);
        util.log(this.prefix, 'pass: ' + pass);
        
        if(!user || !pass){
            App.alert('Por favor complete todos los campos.');
            return false;
        }
        
        //Login Service
        App.server.makeRequest('Inicio', { Usuario : user, Password : pass}, _.bind(this.onLoginUser, this));
        
        return false;
    },
    
    onLoginUser : function(response){
        util.log(this.prefix, ' GET LOGIN RESPONSE: ' + JSON.stringify(response));
        //05-28 15:46:25.890: I/Web Console(12192): Abbott : Server : makeRequest() SUCCESS: response: {"login":[{"IDUsuario":458,"Usuario":"usernameTest","NombreBebe":"bbtttt","NombrePadre":"pedro","NombreMadre":"perez","Genero":"M","FechaNacimiento":"2013-02-1","LugarNacimiento":"Bogota","Clinica":"Marly","NombrePediatra":"pediatra","Email":"fabian@appsolution.co","Telefono":"12312312312","RecibeInformacion":"N","Repuesta":"Sesion permitida","Mensaje":"Successfully"}]}:35
       //05-28 15:49:09.735: I/Web Console(12192): Abbott : Server : makeRequest() SUCCESS: response: {"login":[{"Repuesta":"Por favor verifique nuevamente los datos (password)","Mensaje":"Error"}]}:35
        var responseObject = response.login[0];
        if(responseObject.Mensaje == 'Successfully'){
            App.idUser = responseObject.IDUsuario;
            App.userInfo = responseObject;
            this.parent.setView('content');
            this.parent.views.content.contentManager.setView('mybaby');
        }
        else{
            App.alert(responseObject.Repuesta);
        }
    },
    
    onForgotPass : function(){
        this.parent.setView('forgot');
    }
});
