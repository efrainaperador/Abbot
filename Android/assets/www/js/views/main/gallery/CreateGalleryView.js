CreateGalleryView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'CreateGalleryView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#CreateGalleryTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();
        
        this.textgallerydesc = this.$('#text-gallerydesc');
        this.textgalleryname = this.$('#text-galleryname');

        this.activated = false;
    },
    
    events : {
        'submit #formCreateGallery' : 'onSubmitFormCreateGallery'
    },
    
    onSubmitFormCreateGallery : function(){
        var desc = this.textgallerydesc.val();
        var name = this.textgalleryname.val();
        util.log(this.prefix, 'desc: ' + desc);
        util.log(this.prefix, 'name: ' + name);
        
        if(!name){
            App.alert('Por favor indique un nombre de la galería.');
            return false;
        }
        
        //Login Service
        App.server.makeRequest('InsertaGaleria', { IDUsuario : App.idUser, Nombre : name, Descripcion: desc}, _.bind(this.onInsertGallery, this), true);
        
        return false; 
    },
    
    onInsertGallery : function(response){
        util.log(this.prefix, ' CREATE GALLERY RESPONSE: ' + JSON.stringify(response));
        var responseObject = response.insertagaleria[0];
        if(responseObject.Mensaje == 'Successfully'){
            //TODO:
            this.parent.setView('detailgallery', { idGallery : responseObject.IDGaleria });
        }
        else{
            App.alert(responseObject.Repuesta);
        }
    },

    activate : function() {
        if (this.activated == false) {
            this.activated = true;
        }
    }
});
