;(function( $ ) {
    var objSettings = false;
    
    $.fn.stadisticDT = function( params ) {

        var settings = $.extend( {
            idDT: false,
            title: 'Director Técnico',
            template: 'mundial',
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
        
        var $objGlobal = $(this);
        objSettings = settings;
        urlToken = 'coaches/coach_'+settings.idDT+'.js';
        jsonpCallback = 'stadisticDT';
        
        token( $objGlobal );
        return this;

    };
    
    var token = function ( $objGlobal ) {

        $.ajax({
            type: 'GET',
            url: 'http://static-televisadeportes.esmas.com/sportsdata/futbol/data/'+urlToken,
            async: false,
            jsonpCallback: jsonpCallback,
            contentType: "application/json",
            dataType: 'jsonp',
            cache: false,
            success: function(data) { successData($objGlobal, data); } ,
            error: function(xhr, ajaxOptions, thrownError) {
                $objGlobal.html('');
            }
        });
    };
    
    var successData = function ( $objGlobal, data ) {
        var html = "";
        html = createHTML( data );
        
        $objGlobal.delay( 8000 ).html( html );
        
        $objGlobal.children('div').fadeIn( 4000 );
    }
    
    var createHTML = function ( data ) {
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
   

})(jQuery);
