Server = function(options) {
    this.initialize(options);
};

_.extend(Server.prototype, Backbone.Events, {

    initialize : function(options) {
        this.prefix = 'Server';

        util.log(this.prefix, 'initialize()');

        // Must supply a host for the url of the server and a token for a secure connection
        this.host = options.host;
        this.host2 = options.host2;

        this.data = null;
    },

    toString : function() {
        return '[Server]';
    },

    makeRequest : function(method, args, callback, secondHost, triggerUpdated) {
        util.log(this.prefix, "METHOD: " + method);
        var host = (secondHost == true) ? this.host2 : this.host;
        
        if (triggerUpdated == undefined) {
            triggerUpdated = true;
        }
        var requestData = {};
        requestData.Action = method;
        _.extend(requestData, args);
        util.log(this.prefix, 'makeRequest: requestData: ' + JSON.stringify(requestData));
        
        $.blockUI(); //Loading notification
        
        $.ajax({
            type : App.config.requestType,
            url : host,
            data : requestData,
            dataType : 'json',
            timeout : 15000,
            async : true,
            success : _.bind(function(response) {
                util.log(this.prefix, 'makeRequest() SUCCESS: response: ' + JSON.stringify(response));
                App.serverError = false;
                /*if (response.result.code == 0) {
                    this.data = response.data;
                    // Important to call this before we call the callback
                    if (triggerUpdated) {
                        this.trigger('dataUpdated');
                    }

                } else {
                    this.trigger('error', response);
                    // App.alert('Data server error.');
                }*/

                callback(response);

            }, this),
            error : _.bind(function(xhr, ajaxOptions, thrownError) {

                var response = {
                    result : {
                        code : 1,
                        msg : xhr.status,
                        error : thrownError
                    }
                };
                util.log(this.prefix, 'makeRequest() ERROR: response: ' + JSON.stringify(response));
                this.trigger('error', response);
                App.serverError = true;
                App.alert('Error de conexión con el servidor: ' + response.result.msg);
                // App.alert('Connection with server failed.');
                callback(response);
            }, this),
            complete : _.bind(function(xhr, status) {
                $.unblockUI(); //Removes loading notification
            }, this)
        });
    }
});
