;(function( $ ) {
    
    var $objGlobal = false;
    var objSettings = false;
    var arrItems = new Array();
    
    $.fn.gruposTeams = function( params ) {

        objGlobal = $.extend( {
            idTorneo: false,
            idFase: false,
            lblJJ: "JJ",
            lblJG: "JG",
            lblJE: "JE",
            lblJP: "JP",
            lblPTS: "PTS",
        }, params);

        if ( !objGlobal.idTorneo ) {
            return '';
        }
        
        $objGlobal = $(this);
        urlToken = objGlobal.idTorneo+'/phases.js';
        jsonpCallback = 'phasesbytorneo';
        
        token();
        
        return this;

    };
    
    var token = function () {

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
    
    var successData = function ( data ) {
        var html = "";
        html = createHTML( data );
        
        $objGlobal.delay( 8000 ).html( html );
        
        $objGlobal.children('div').fadeIn( 4000 );
    }
    
    var token2 = function () {
        
        $objGlobal.html(objSettings.loading);

        $.ajax({
            type: 'GET',
            //url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/'+urlToken,
            url: ''+urlToken,
            async: true,
            jsonpCallback: jsonpCallback,
            contentType: "application/json",
            dataType: 'jsonp',
            cache: false,
            success: function(data){
                arrItems.push(data);
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $objGlobal.html('');
            }
        });
    };
    
    var createHTML = function ( data ) {
        var html = '';
        var idTorneo = "";
        
        for( var i=0 ; i<data.dataFases.length ; i++ )  {
            idTorneo = data.idTorneo;
            urlToken = idTorneo+'/teamsclassification.js';
            jsonpCallback = 'teamsClassification';
            token2();
        }
        
        if( arrItems.length === 0 ){
            return html;
        }

        html += '<div class="wdg_smex_groups_01" data-enhance="false" style="display:none">';
          html += '<div class="scroll">';
            
            for( var i=0 ; i<data.dataFases.length ; i++ )  {
            
              html += '<div class="titulo_goal textcolor-title4">'+data.dataFases[i].nombreFase+'</div>';
              html += '<div class="goal">';
                html += '<ul class="head_team textcolor-title4">';
                  html += '<li>'+objGlobal.lblJJ+'</li>';
                  html += '<li>'+objGlobal.lblJG+'</li>';
                  html += '<li>'+objGlobal.lblJE+'</li>';
                  html += '<li>'+objGlobal.lblJP+'</li>';
                  html += '<li>'+objGlobal.lblPTS+'</li>';
                html += '</ul>';
                html += '<div class="team_divisor">';
                  html += '<ul class="team">';
                    
                        for( var k=0 ; k < data.dataFases[i].dataJornadas.length ; k++ )
                        {
                            for( var j=0 ; j < arrItems[0].dataEstadistica.length ; j++ )
                            {
                                if( data.dataFases[i].dataJornadas[k].idTeam == arrItems[0].dataEstadistica[j].idTeam )
                                {
                                    html += '<li class="first_child dotted-right"><p>'+arrItems[0].dataEstadistica[j].nameTeam+'</p></li>';
                                    html += '<li class="textcolor-title4 dotted-right"><p>'+arrItems[0].dataEstadistica[j].dataEstadisticas.JJ+'</p></li>';
                                    html += '<li class="textcolor-title4 dotted-right"><p>'+arrItems[0].dataEstadistica[j].dataEstadisticas.JG+'</p></li>';
                                    html += '<li class="textcolor-title4 dotted-right"><p>'+arrItems[0].dataEstadistica[j].dataEstadisticas.JE+'</p></li>';
                                    html += '<li class="textcolor-title4 dotted-right"><p>'+arrItems[0].dataEstadistica[j].dataEstadisticas.JP+'</p></li>';
                                    html += '<li class="last_child textcolor-title4"><p>'+arrItems[0].dataEstadistica[j].dataEstadisticas.PTS+'</p></li>';
                                }
                            }
                        }
                  html += '</ul>';
                html += '</div>';
              html += '</div>';
            
            }
            
          html += '</div>';
        html += '</div>';

        return html;
    };
    
    var successData = function ( data ) {
        var html = "";
        html = createHTML( data );
        
        $objGlobal.delay( 8000 ).html( html );
        $objGlobal.children('div').fadeIn( 4000 );
    }

})(jQuery);
