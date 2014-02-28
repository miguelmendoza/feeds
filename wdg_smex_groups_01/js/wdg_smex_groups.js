;(function( $ ) {
    var arrItems = new Array();
    
    $.fn.gruposTeams = function( params ) {

        var objSettings = $.extend( {
            idTorneo: false,
            idTeam: false,
            lblJJ: "JJ",
            lblJG: "JG",
            lblJE: "JE",
            lblJP: "JP",
            lblPTS: "PTS",
            test: false
        }, params);

        if ( !objSettings.idTorneo && !objSettings.idTeam ) {
            return '';
        }

        var $objGlobal = $(this);
        token_fases( $objGlobal, objSettings );

        return this;
    };
    
    var token_fases = function ( $objGlobal, objSettings ) {

        var domain = ( objSettings.test ) 
            ? 'http://feeds-miportal.appspot.com/phases.js'
                : 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/'+objSettings.idTorneo+'/phases.js';
        
        $.ajax({
            type: 'GET',
            url: domain,
            async: false,
            jsonpCallback: 'phasesbytorneo',
            contentType: "application/json",
            dataType: 'jsonp',
            cache: false,
            success: function(data) {
              token_team( $objGlobal, objSettings, data );
            },
            error: function(xhr, ajaxOptions, thrownError) {
                $objGlobal.html('');
            }
        });
    };
    
   
    var token_team = function ( $objGlobal, objSettings, data_Fases ) {
        
        var domain = ( objSettings.test ) 
            ? 'http://feeds-miportal.appspot.com/teamsclassification.js'
              : 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/'+data_Fases.idTorneo+'/teamsclassification.js';
        
        $objGlobal.html(objSettings.loading);

        $.ajax({
            type: 'GET',
            url: domain,
            async: true,
            jsonpCallback: 'teamsClassification',
            contentType: "application/json",
            dataType: 'jsonp',
            cache: false,
            success: function(data_grupos){
                successData( $objGlobal, objSettings, data_Fases , data_grupos );
            },
            
            error: function(xhr, ajaxOptions, thrownError) {
                $objGlobal.html('');
            }
        });
    };
    
     var successData = function ( $objGlobal, objSettings, data_Fases , data_grupos  ) {
        var html = "";

        html = createHTML( $objGlobal, objSettings, data_Fases , data_grupos );
        $objGlobal.delay( 8000 ).html( html );
        $objGlobal.children('div').fadeIn( 4000 );
    }
    
    
    var createHTML = function ( $objGlobal, objSettings, data_Fases , data_grupos ) {
        var html = '';
        var campos = [];
        var idGroupbyTeam = [];
        var idPhasebyTeam = [];
        
        if( data_Fases.dataFases.length === 0 ){
            return html;
        }
        
        for( var i=0 ; i<data_Fases.dataFases.length ; i++ )  {
            for( var k=0 ; k < data_Fases.dataFases[i].dataJornadas.length ; k++ ) {
                if( data_Fases.dataFases[i].dataJornadas[k].idTeam == objSettings.idTeam ) { 
                    idPhasebyTeam.push(data_Fases.dataFases[i].idFase);
                    idGroupbyTeam.push(data_Fases.dataFases[i].dataJornadas[k].group);
                }
            }
        }
        
        html += '<div class="wdg_smex_groups_01" data-enhance="false" style="display:none">';
          html += '<div class="scroll">';
        
          for( var i=0 ; i<data_Fases.dataFases.length ; i++ )  {
              if ( idPhasebyTeam.indexOf( data_Fases.dataFases[i].idFase ) > -1 ) {
                  
                  html += '<div class="titulo_goal textcolor-title4">'+data_Fases.dataFases[i].nombreFase+'</div>';
                    html += '<div class="goal">';
                      html += '<ul class="head_team textcolor-title4">';
                        html += '<li>'+objSettings.lblJJ+'</li>';
                        html += '<li>'+objSettings.lblJG+'</li>';
                        html += '<li>'+objSettings.lblJE+'</li>';
                        html += '<li>'+objSettings.lblJP+'</li>';
                        html += '<li>'+objSettings.lblPTS+'</li>';
                      html += '</ul>';
                      html += '<div class="team_divisor">';
                        html += '<ul class="team">';
                        
                        for( var k=0 ; k < data_Fases.dataFases[i].dataJornadas.length; k++ ) {
                            if ( idGroupbyTeam.indexOf( data_Fases.dataFases[i].dataJornadas[k].group ) > -1 ) {
                                for( var j=0 ; j < data_grupos.dataEstadistica.length; j++ )
                                {
                                    if( data_Fases.dataFases[i].dataJornadas[k].idTeam == data_grupos.dataEstadistica[j].idTeam )
                                    {
                                        html += '<li class="first_child dotted-right"><p>'+data_grupos.dataEstadistica[j].nameTeam+'</p></li>';
                                        html += '<li class="textcolor-title4 dotted-right"><p>'+data_grupos.dataEstadistica[j].dataEstadisticas.JJ+'</p></li>';
                                        html += '<li class="textcolor-title4 dotted-right"><p>'+data_grupos.dataEstadistica[j].dataEstadisticas.JG+'</p></li>';
                                        html += '<li class="textcolor-title4 dotted-right"><p>'+data_grupos.dataEstadistica[j].dataEstadisticas.JE+'</p></li>';
                                        html += '<li class="textcolor-title4 dotted-right"><p>'+data_grupos.dataEstadistica[j].dataEstadisticas.JP+'</p></li>';
                                        html += '<li class="last_child textcolor-title4"><p>'+data_grupos.dataEstadistica[j].dataEstadisticas.PTS+'</p></li>';
                                    }
                                }
                                
                            }
                        }
                        html += '</ul>';
                      html += '</div>';
                    html += '</div>';
              }
          }
          html += '</div>';
        html += '</div>';
        
        return html;
    };

})(jQuery);
