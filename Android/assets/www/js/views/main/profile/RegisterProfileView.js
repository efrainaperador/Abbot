RegisterProfileView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'RegisterProfileView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#RegisterProfileTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.isConnecting = false;
        this.activated = false;
        
        
        this.father= this.$('#text-father');
        this.mother= this.$('#text-mother');
        this.baby= this.$('#text-baby');
        this.babysex= this.$('#babysex');
        this.borndate= this.$('#text-borndate')
        this.bornplace= this.$('#text-bornplace');
        this.clinic=this.$('#text-clinic');
        this.doctor=this.$('#text-doctor');
        this.email= this.$('#text-email');
        this.phone=this.$('#text-phone');
        this.username=this.$('#text-username');
        this.password=this.$('#text-password');
        this.confirmpassword= this.$('#text-confirmpassword');
        this.acceptTerms= this.$('#acceptTerms');
        this.acceptInfo= this.$('#acceptInfo');                	
    },
    
    events : {
    	'submit #formRegister' : 'onSubmitRegister',
    },

    activate : function() {
        if (this.activated == false) {        	
            this.activated = true;
        }
        
        if(App.config.testing.active == true){
            this.father.val(App.config.testing.textfather);
            this.mother.val(App.config.testing.textmother);
            this.baby.val(App.config.testing.textbaby);
            this.babysex.val(App.config.testing.textbabysex);
            this.borndate.val(App.config.testing.textborndate);
            this.bornplace.val(App.config.testing.textbornplace);
            this.clinic.val(App.config.testing.textclinic);
            this.doctor.val(App.config.testing.textdoctor);
            this.email.val(App.config.testing.textemail);
            this.phone.val(App.config.testing.textphone);
            this.username.val(App.config.testing.textusername);
            this.password.val(App.config.testing.textpassword);
            this.confirmpassword.val(App.config.testing.textconfirmpassword);
            this.acceptTerms.val(App.config.testing.acceptTerms);
            this.acceptInfo.val(App.config.testing.acceptInfo);                       
        }
    },
    
    onSubmitRegister: function(){
    	var father = this.father.val();
    	var mother= this.mother.val();
    	var baby= this.baby.val();
        var babysex= this.babysex.val();
        var borndate= this.borndate.val();
        var bornplace= this.textbornplace.val();
        var clinic= this.clinic.val();		
        var doctor= this.doctor.val();
        var email= this.email.val();
        var phone= this.phone.val();
        var username= this.username();
        var password= this.password.val();
        var confirmpassword= this.confirmpassword.val();
        var acceptTerms= this.acceptTerms.val();
        var acceptInfo= this.acceptInfo.val();
        
        if(!father || !mother || !baby || !babysex || !borndate || !bornplace || !phone || !username || !password || !confirmpassword){
        	App.alert('Por favor complete todos los campos obligatorios.');
            return false;
        }
        
        App.server.makeRequest('Registro', { NombrePadre : father, NombreMadre : mother, NombreBebe: baby, Genero: babysex, FechaNacimiento: borndate, LugarNacimiento:bornplace, Clinica: clinic, NombrePediatra:doctor, Telefono:phone, password: password, TerminosCondiciones: acceptTerms, RecibeInformacion: acceptInfo }, _.bind(this.onRegisterUser, this));
    },
    
    onRegisterUser: function(response){
    	var responseObject= response.register[0];
    	
    	   if(responseObject.Mensaje == 'Successfully'){
               App.idUser = responseObject.IDUsuario;
               App.userInfo = responseObject;
               //userInfo.text-username;
               this.parent.setView('content');
               this.parent.views.content.contentManager.setView('mybaby');
           }
           else{
               App.alert(responseObject.Repuesta);
           }
    }
    
    
});
