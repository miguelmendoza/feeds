
    token = function () {

        $.ajax({
            type: 'GET',
            url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/'+urlToken,
            async: false,
            jsonpCallback: jsonpCallback,
            contentType: "application/json",
            dataType: 'jsonp',
            cache: false,
            success: successData,
            error: function(xhr, ajaxOptions, thrownError) {
                $objGlobal.html('');
            }
        });
    };
    
    clearUrlString = function(text){
        text = text.trim();
        text = text.toLowerCase();
        text = text.replace(" ","-");
        return text;
    }