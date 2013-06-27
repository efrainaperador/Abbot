RowBabyGalleryView = apps.ui.View.extend({

    initialize : function(options) {
        apps.ui.View.prototype.initialize.call(this, options);

        this.prefix = 'RowBabyGalleryView';
        util.log(this.prefix, 'initialize()');
        
        this.idGallery=options.idGallery;
        this.nameGallery=options.nameGallery;
        this.dateGallery=options.dateGallery;
        this.photoGallery=options.photoGallery;
        
        this.el = $($('#rowBabyGalleryTemplate', App.templates).html());

        this.delegateEvents();
        
        this.$('#babyGalleryImg').css({'width':'100px', 'height':'100px'});
        this.render();
    },

    render : function(){
        if(this.photoGallery){
            this.$('#babyGalleryImg').css({'background-image' : 'url(' + this.photoGallery + ')'});
        }
        this.$('#babyGalleryDate').text(this.dateGallery);
        this.$('#babyGalleryTitle').text(this.nameGallery);
        this.$('#babyGallery').attr('onClick', 'App.pages.views.content.contentManager.views.mybaby.nextView('+this.idGallery+');');
    }
});
