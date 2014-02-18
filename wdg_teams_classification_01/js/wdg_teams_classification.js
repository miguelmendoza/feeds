;(function($){
    var $objGlobal = false;
    var objSettings = false;
    
    $.fn.teamsClassification = function( params ) {

        objSettings = $.extend( {
            idTorneo: false,
            title: 'Clasificación',
            urlWidget: 'http://televisadeportes.esmas.com/',
            lblNUM: '<i class="tvsa-hash"></i>',
            lblEQUIPO: 'EQUIPO',
            lblPJ: 'PJ',
            lblPG: 'G',
            lblPTS: 'PTS',
            lblNext: 'Siguiente',
            lblPrev: 'Anterior',
            lblViewMore: 'Ver todos',
            lblLoading: '<b>LOADING.....</b>',
            template: 'deportes',
            upperCase: true
        }, params);

        if ( !objSettings.idTorneo ) {
            return '';
        } 

        $objGlobal = $(this);
        urlToken = objSettings.idTorneo+'/teamsclassification.js';
        jsonpCallback = 'teamsClassification';
        
        
        token(urlToken);
        
        return this;

    };
    
    successData = function ( data ) {
        var html = "";
        
        switch( objSettings.template ) {
            case 'deportes': html = createHTML_Mundial( data ); break;
        }
        $objGlobal.delay( 8000 ).html( html );
        $objGlobal.children('div').fadeIn( 4000 );
    }
    
    createHTML_Mundial = function ( data ) {
        var html = '';
        
        htmlData = processData( data );
        if ( !htmlData ) {
            return '';
        }
        
        html += '<div class="wdg_teams_classification_01" data-enhance="false" style="display:none">';
        
        html += '<!-- BEGIN: str_pleca_01 -->';
        html += '<div class="str_pleca_01">';
          html += '<div class="str_pleca_01_title">';
            html += '<h3 class="background-color-pleca1">';
              html += '<a href="'+objSettings.urlWidget+'" title="'+objSettings.urlWidget+'" class="textcolor-title3">'+objSettings.title;
                html += '<span class="str_pleca_01_arrowa selected"></span><span class="str_pleca_01_arrowb"></span></a>';
            html += '</h3></div></div><!-- END: str_pleca_01 -->';

        html += '<table class="titulo"><tbody><tr><th class="izq textcolor-title1">'+objSettings.lblNUM+'</th>';
        html += '<th class="der_img textcolor-title1">&nbsp;</th><th class="team1 textcolor-title1">'+objSettings.lblEQUIPO+'</th>';
        html += '<th class="der textcolor-title1">'+objSettings.lblPJ+'</th><th class="der textcolor-title1">'+objSettings.lblPG;
        html += '</th><th class="der textcolor-title1">'+objSettings.lblPTS+'</th>';
        html += '</tr></tbody></table>';
        
        html += '<div class="scroll" id="navigation_list"><table class="datos"><tbody>';
        
        html += htmlData;
        
        html += '</tbody></table></div> <!-- END SCROLL -->';
        
        html += '<div class="wdg_teams_classification_01_cnt"><div class="carousel_nav">';
        html += '<a class="prev bginactive" title="'+objSettings.lblPrev+'" href="#"><i class="tvsa-caret-up"></i></a>';
        html += '<a class="next bgactive" title="'+objSettings.lblNext+'" href="#"><i class="tvsa-caret-down"></i></a>';
        html += '<table class="ver_todos"><tbody><tr><td><a href="'+objSettings.urlWidget+'">'+objSettings.lblViewMore+'</a></td></tr></tbody></table></div>';
        html += '<div class="wdg_stadistics_01_clear"></div></div><div class="degraded"></div>';
        html += '<div class="seemore"><a href="'+objSettings.urlWidget+'">'+objSettings.lblViewMore+'</a></div></div>';

        return html;
    };
    
    var processData = function ( data ) {
        var dataAux = "";
        var html = "";
        var lim = 0;
        
        lim = ( data.dataEstadistica ) ? data.dataEstadistica.length : 0;
        if ( lim === 0 ) {
          return false;
        }
        
        for( var i=0 ; i<lim ; i++ )  {
        
            dataAux = data.dataEstadistica[i];
            
            if( objSettings.upperCase ) {
                dataAux.nameTeam = dataAux.nameTeam.toUpperCase();
            }
            
            html += '<tr>';
            html += '<td class="fondo izq textcolor-title2">'+dataAux.position+'</td>';
            html += '<td class="der_img textcolor-title2"><img src="'+dataAux.urlLogoClub+'" alt="'+dataAux.nameTeam+'"></td>';
            html += '<td class="team">'+dataAux.nameTeam+'</td>';
            html += '<td class="der textcolor-title2">'+dataAux.dataEstadisticas.JJ+'</td>';
            html += '<td class="der textcolor-title2">'+dataAux.dataEstadisticas.JG+'</td>';
            html += '<td class="der textcolor-title2">'+dataAux.dataEstadisticas.PTS+'</td>';
            html += '</tr>';
        }
        return html;
    }
    
})(jQuery);
