;(function( $ ) {
    
    var $objGlobal = false;
    var objSettings = false;
    var domain = false;
    var jsonpCallback = false;
    
    $.fn.teamsClassification = function( params ) {

        var settings = $.extend( {
            idTorneo: false,
            title: 'Clasificación',
            urlWidget: 'http://televisadeportes.esmas.com/',
            template: 'wdg_teams_classification_01',
            lblNUM: '<i class="tvsa-hash"></i>',
            lblEQUIPO: 'EQUIPO',
            lblPJ: 'PJ',
            lblPG: 'G',
            lblPTS: 'PTS',
            lblNext: 'Siguiente',
            lblPrev: 'Anterior',
            lblViewMore: 'Ver todos',
            lblLoading: '<b>LOADING.....</b>',
            upperCase: true
        }, params);

        if ( !settings.idTorneo ) {
            return '';
        }

        objSettings = settings;
        $objGlobal = $(this);
        domain = 'http://feeds-televisadeportes.dev/data/'+settings.idTorneo+'/tablageneral.js';
        jsonpCallback = 'teamsClassification';
        
        token();
        return this;

    };
    
    $.fn.stadisticDT = function( params ) {

        var settings = $.extend( {
            idDT: false,
            title: 'Director Técnico',
            template: 'mix_smex_dt_01',
            lblFullName: 'Nombre Completo: ',
            lblPosicion: 'Posición: ',
            lblFechaNac: 'Fecha de nacimiento: ',
            lblLugarNac: 'Lugar de nacimiento: ',
            lblNacionalidad: 'Nacionalidad: ',
            lblLoading: '<b>LOADING.....</b>'
        }, params);

        if ( !settings.idDT ) {
            return '';
        }
        
        $objGlobal = $(this);
        objSettings = settings;
        domain = 'http://feeds-televisadeportes.dev/data/tecnicos/'+settings.idDT+'.js';
        jsonpCallback = 'stadisticDT';
        
        token();
        return this;

    };

    function token() {
        
        $objGlobal.html(objSettings.loading);

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

    function createHTML_teamsClassification( data ) {
        var html = '';

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
        
        html += createTable( data );
        
        html += '</tbody></table></div> <!-- END SCROLL -->';
        
        html += '<div class="wdg_teams_classification_01_cnt"><div class="carousel_nav">';
        html += '<a class="prev bginactive" title="'+objSettings.lblPrev+'" href="#"><i class="tvsa-caret-up"></i></a>';
        html += '<a class="next bgactive" title="'+objSettings.lblNext+'" href="#"><i class="tvsa-caret-down"></i></a>';
        html += '<table class="ver_todos"><tbody><tr><td><a href="'+objSettings.urlWidget+'">'+objSettings.lblViewMore+'</a></td></tr></tbody></table></div>';
        html += '<div class="wdg_stadistics_01_clear"></div></div><div class="degraded"></div>';
        html += '<div class="seemore"><a href="'+objSettings.urlWidget+'">'+objSettings.lblViewMore+'</a></div></div>';

        return html;
    };
    
    function createHTML_stadisticDT( data ) {
        var html = '';

        html += '<div class="mix_smex_dt_01" data-enhance="false" style="display:none">';
        
        html += '<div class="str_pleca_01">';
          html += '<div class="str_pleca_01_title">';
            html += '<h3 class="background-color-pleca3">';
                html += '<a class="textcolor-title3" href="http://stats.televisadeportes.esmas.com/futbol/tecnicos/'+data.webNameDT+'/'+data.idDT+'" title="'+data.nameDT+'">';
                    html += objSettings.title;
                    html += '<span class="str_pleca_01_arrowa selected"></span>';
                    html += '<span class="str_pleca_01_arrowb"></span>';
                html += '</a>';
            html += '</h3>';
          html += '</div>'; 
        html += '</div>';
    

        html += '<div class="left_div">';
            html += '<div class="mix_img">';
                html += '<img src="'+data.urlPhotoPlayer+'" alt="'+data.nameDT+'">';
            html += '</div>';
        html += '</div>';
        html += '<div class="right_div">';
            html += '<div class="art_right_text">';
                html += '<h2 class="gray2">'+data.nameDT+'</h2>';
            html += '</div>';
            html += '<div class="art_contenido">';
                html += '<p class="began"><span class="gray">'+objSettings.lblFullName+'</span>'+data.dataTecnico.fullName+'</p>';
                html += '<p class="began"><span class="gray">'+objSettings.lblPosicion+'</span>'+data.dataTecnico.posicion+'</p>';
                html += '<p class="began"><span class="gray">'+objSettings.lblFechaNac+'</span>'+data.dataTecnico.fechaNacimiento+'</p>';
                html += '<p class="began"><span class="gray">'+objSettings.lblLugarNac+'</span>'+data.dataTecnico.lugarNacimiento+'</p>';
                html += '<p class="began"><span class="gray">'+objSettings.lblNacionalidad+'</span>'+data.dataTecnico.nacionalidad+'</p>';
            html += '</div>';
        html += '</div>';
        
        html += '<div style="clear: both;"></div>';
        html += '</div>';
        
        return html;
    };
    
    function createTable( data ) {
        var dataAux = "";
        var html = "";
        var lim = data.dataEstadistica.length;
        
        if ( lim === 0 ) {
          return '';
        }
        
        for( var i=0 ; i<lim ; i++ )  {
        
            dataAux = data.dataEstadistica[i];
            
            if( objSettings.upperCase ) {
                dataAux.nameTeam = dataAux.nameTeam.toUpperCase();
            }
            
            html += '<tr>';
            html += '<td class="fondo izq textcolor-title2">'+i+'</td>';
            html += '<td class="der_img textcolor-title2"><img src="'+dataAux.urlLogoClub+'" alt="'+dataAux.nameTeam+'"></td>';
            html += '<td class="team">'+dataAux.nameTeam+'</td>';
            html += '<td class="der textcolor-title2">'+dataAux.dataEstadisticas.JJ+'</td>';
            html += '<td class="der textcolor-title2">'+dataAux.dataEstadisticas.JG+'</td>';
            html += '<td class="der textcolor-title2">'+dataAux.dataEstadisticas.PTS+'</td>';
            html += '</tr>';
        }
        return html;
    }
    
    function successData( data ) {
        
        var html = "";
        
        switch( objSettings.template ) {
          case 'wdg_teams_classification_01': 
            html = createHTML_teamsClassification( data );
          break;
          case 'mix_smex_dt_01': 
            html = createHTML_stadisticDT( data );
          break;
        }
        
        $objGlobal.delay( 8000 ).html( html );
        $objGlobal.children('div').fadeIn( 4000 );
    }

})(jQuery);
