;(function( $ ) {

    function token() {

        $.ajax({
            type: 'GET',
            url: domain,
            async: false,
            jsonpCallback: jsonpCallback,
            contentType: "application/json",
            dataType: 'jsonp',
            cache: false,
            success: successData,
            error: function(xhr, ajaxOptions, thrownError) {
                $objGlobal.html('');
                console.log(thrownError);
                console.log("Algo Fallo");
            }
        });
    };

    
    function successData( data ) {
        
    }

})(jQuery);
