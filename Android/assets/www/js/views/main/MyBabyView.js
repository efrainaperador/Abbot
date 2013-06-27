MyBabyView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'MyBabyView';
        util.log(this.prefix, 'initialize()');

        this.el = $($('#MyBabyTemplate', App.templates).html());

        this.parent = options.parent;
        this.delegateEvents();

        this.activated = false;
        
        this.stageMonths = this.$('#stageMonths');
        this.babyName = this.$('#babyName');
        this.dayTipText = this.$('#dayTipText');
        this.dayTipImg = this.$('#dayTipImg');
        this.containerGalleries = this.$('#scrollGallery');
        
        //TODO: REMOVE THESE LINES WHEN CSS IS COMPLETE
        this.dayTipImg.css({ 'width' : '100px', 'height': '100px'}); 
    },
    
    events : {
        'touchend #stageDevelopment' : 'onStageDevelopment',
        'touchend #showAllTips' :   'onShowAllTips',
        'touchend #showAllGalleries' : 'onShowAllGalleries',
        'touchend #showAllEvents' : 'onShowAllEvents',
        'touchend #buttonEditProfile' : 'viewEditProfile'
    },

    activate : function() {
        if (this.activated == false) {
            //Get baby Stage Service
            App.server.makeRequest('Etapa', { IDUsuario : App.idUser, FechaNacimiento : App.userInfo.FechaNacimiento}, _.bind(this.onGetStage, this));
            this.activated = true;
        }
        
        this.babyName.text(App.userInfo.NombreBebe);
    },
    
    onGetStage : function(response){
        util.log(this.prefix + ' GET STAGE RESPONSE: ' + JSON.stringify(response));
        var responseObject = response.etapa[0];
        if(responseObject.Mensaje == 'Successfully'){
            App.userInfo.etapaId = responseObject.term_id;
            this.stageMonths.text(responseObject.name + ' meses');
        }
        else{
            App.alert(responseObject.Repuesta);
        }
        
        //Get Tips Service
        App.server.makeRequest('Tip', { }, _.bind(this.onGetTips, this));
        
    },
    
    onGetTips : function(response){
        util.log(this.prefix + ' GET TIPS RESPONSE: ' + JSON.stringify(response));
        App.tipsArray = response.tip;
        var responseObject = response.tip[0];
        this.dayTipText.text(util.stripHtmlTags(responseObject.Cuerpo));
        this.dayTipImg.css( {'background-image' : 'url('+ responseObject.Foto + ')'});
        //Get Galleries Service
        App.server.makeRequest('Galeria', { IDUsuario : App.idUser }, _.bind(this.onGetGalleries, this));
    },
    
    onGetGalleries : function(response){
        util.log(this.prefix + ' GET GALLERIES RESPONSE: ' + JSON.stringify(response));
        var responseObject = response.galeria[0];
        if(responseObject.Mensaje == 'Successfully'){
             App.galleriesObject = response.galeria;
             this.loadGalleries();
        }
        else{
            App.alert(responseObject.Repuesta);
        }
        //Get events service
        App.server.makeRequest('Evento', { IDUsuario : App.idUser}, _.bind(this.onGetEvents, this));
    },
    
    onGetEvents : function(response){
        util.log(this.prefix + ' GET EVENTS RESPONSE: ' + JSON.stringify(response));
        var responseObject = response.evento[0];
        if(responseObject.Mensaje == 'Successfully'){
            App.eventsObject = response.evento;
            //TODO: display calendar in my baby view 
            //Esperando respuesta con respecto al json que devuelve el servicio
            /*{"evento":[{"Nombre":"szxczxc","Nota":"zxczxc","Fecha":"2013-06-4","IDUsuario":"458","Hora":"01:30:00","Lugar":"zxczx","FechaRecordatorio":"","HoraRecordatorio":"","Repuesta":"Consulta de Eventos exitosa","Mensaje":"Successfully"},{"Nombre":"evento6","Nota":"asdasd","Fecha":"2013-05-31","IDUsuario":"458","Hora":"12:30:00","Lugar":"evet","FechaRecordatorio":"","HoraRecordatorio":"","Repuesta":"Consulta de Eventos exitosa","Mensaje":"Successfully"},{"Nombre":"evento5","Nota":"asdas","Fecha":"2013-06-13","IDUsuario":"458","Hora":"09:30:00","Lugar":"asd","FechaRecordatorio":"","HoraRecordatorio":"","Repuesta":"Consulta de Eventos exitosa","Mensaje":"Successfully"},{"Nombre":"evento4","Nota":"asdas","Fecha":"2013-05-31","IDUsuario":"458","Hora":"09:00:00","Lugar":"asd","FechaRecordatorio":"","HoraRecordatorio":"","Repuesta":"Consulta de Eventos exitosa","Mensaje":"Successfully"},{"Nombre":"evento2","Nota":"fasdas","Fecha":"2013-05-30","IDUsuario":"458","Hora":"09:00:00","Lugar":"tfff","FechaRecordatorio":"","HoraRecordatorio":"","Repuesta":"Consulta de Eventos exitosa","Mensaje":"Successfully"}]}*/
        }
        else{
            App.alert(responseObject.Repuesta);
        }
    },  
    
    loadGalleries : function(){
       //this.containerGalleries.empty();​
        var html = "";
        $.each(App.galleriesObject, function( key, value ) {
                util.log("GALLERY: " , value.IDGaleria);
                var idGallery=value.IDGaleria;
                var nameGallery= value.Nombre;
                var dateGallery=value.Fecha;
                var photoGallery="";
                $.each(value.fotogaleria, function( index, obj ) {
                    photoGallery = obj.Foto;
                    return false;
                });
                var rowGallery = new RowBabyGalleryView({ idGallery : idGallery, nameGallery: nameGallery, dateGallery: dateGallery, photoGallery: photoGallery});
                html+=$(rowGallery.el).html();
        });
        this.containerGalleries.html(html);
        //this.galleryScroll.refresh();
    },
    
    /* Called when a row is clicked in the scrolling list
     * @param event
     */
    nextView: function(id) {
        util.log(this.prefix, ' nextView: id: ' + id);
        this.selectRow(id);
        /* We don't want to do anything if the list is being scrolled
        var moving = this.scrollerMoving();
        util.log(this.prefix, ' nextView: moving: ' + moving);
        if (!moving) {
            this.selectRow(id);
        }*/
    },
    
    
    /**
     * Selects a row programatically
     * @param row
     */
    selectRow: function(id) {
        util.log(this.prefix, ' selectRow: id: ' + id);
        var galleryId = (id) ? id : null;
        util.log(this.prefix, ' galleryId: ' + galleryId);
        if(galleryId){
            this.parent.setView('photodetail', { galleryId: galleryId, editMode : false});
        }
    },
    
    onStageDevelopment : function(){
      //TODO:  
        this.parent.setView('stages');
    },
    
    onShowAllTips : function(){
        //TODO: 
        this.parent.setView('tips');
    },
    
    onShowAllGalleries : function(){
        //TODO:  
        this.parent.setView('gallery');
   },
      
   onShowAllEvents : function(){
          //TODO: 
       this.parent.setView('calendar');
   },

   viewEditProfile : function(){
        this.parent.setView('editprofile',{id:47});
   }
});
