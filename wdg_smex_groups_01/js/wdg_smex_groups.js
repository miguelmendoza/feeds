;(function( $ ) {
    
    var $objGlobal = false;
    var objSettings = false;
    var domain = false;
    var jsonpCallback = false;
    
    $.fn.gruposTeams = function( params ) {

        objGlobal = $.extend( {
            idTorneo: false,
            idFase: false
        }, params);

        if ( !objGlobal.idTorneo ) {
            return '';
        }
        
        $objGlobal = $(this);
        domain = objGlobal.idTorneo+'/tablafase_'+objGlobal.idFase+'.js';
        jsonpCallback = 'phasesbytorneo';
        
        token();
        
        return this;

    };
    
    function token() {
        
        $objGlobal.html(objSettings.loading);

        $.ajax({
            type: 'GET',
            url: 'http://feeds-televisadeportes.dev/data/'+domain,
            async: false,
            jsonpCallback: jsonpCallback,
            contentType: "application/json",
            dataType: 'jsonp',
            cache: false,
            success: successData,
            error: function(xhr, ajaxOptions, thrownError) {
                $objGlobal.html('');
                console.log( thrownError );
            }
        });
    };
    
    function createHTML ( data ) {
        var html = '';

        html += '<div class="wdg_smex_groups_01" data-enhance="false" style="display:none">';
          html += '<div class="scroll">';
            
            for( var i=0 ; i<data.dataFases.length ; i++ )  {
              html += '<div class="titulo_goal textcolor-title4">Hexagonal</div>';
              html += '<div class="goal">';
                html += '<ul class="head_team textcolor-title4">';
                  html += '<li>JJ</li>';
                  html += '<li>JG</li>';
                  html += '<li>JE</li>';
                  html += '<li>JP</li>';
                  html += '<li>PTS</li>';
                html += '</ul>';
                html += '<div class="team_divisor">';
                  html += '<ul class="team">';
                    for( var j=0 ; j<data.dataFases[i].dataJornadas.length ; j++ )  {
                      html += '<li class="first_child dotted-right"><p>Panama</p></li>';
                      html += '<li class="textcolor-title4 dotted-right"><p>6</p></li>';
                      html += '<li class="textcolor-title4 dotted-right"><p>6</p></li>';
                      html += '<li class="textcolor-title4 dotted-right"><p>6</p></li>';
                      html += '<li class="textcolor-title4 dotted-right"><p>6</p></li>';
                      html += '<li class="last_child textcolor-title4"><p>6</p></li>';
                    }
                  html += '</ul>';
                html += '</div>';
              html += '</div>';
            }
            
          html += '</div>';
        html += '</div>';
        

        return html;
    };
    
    function successData( data ) {
        console.log(data);
        var html = "";
        html = createHTML( data );
        
        $objGlobal.delay( 8000 ).html( html );
        $objGlobal.children('div').fadeIn( 4000 );
    }

})(jQuery);
