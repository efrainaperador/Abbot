EditProfileView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'EditProfileView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#EditProfileTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
        this.idBaby = options.id;
        this.textFather = this.$("#text-father");
        this.textMother = this.$("#text-mother");
        this.textBaby = this.$("#text-baby");
        
        
    },
    
    events : {
    	'submit #formEdit' : 'updateProfile'
    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
    },
    
    updateProfile : function(){
//    	App.alert("Aqui va el llamado al metodo de actualizacion"+this.idBaby);
    	App.server.makeRequest('EditarPerfil',{IDUsuario : App.idUser, NombrePadre : 'padre madres', NombreMadre: 'madre perez', NombreBebe: 'el bebe', Genero:'M', FechaNacimiento : '2013-05-16', LugarNacimiento:'Bogota', Clinica:'Materno Infantil', NombrePedriatra:'Juan Gomez', Telefono: '3124567544', RecibeInformacion:'S'}, _.bind(this.onUpdateProfile,this), true);
    },
    
    onUpdateProfile:function(response){
    	util.log(this.prefix, ' GET LOGIN RESPONSE: ' + JSON.stringify(response));
    }
});
