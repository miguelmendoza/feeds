;jQuery(function($){ 
    (function($,T){
        $('.wdg_teams_classification_01').each(function(ix,element){
            var $this = $(this), 
                Pointer = {
                    UP: (T.getIsTouchDevice()) ? 'touchend' : 'mouseup',
                    DOWN: (T.getIsTouchDevice()) ? 'touchstart' : 'mousedown'
                }, 
                $theUl = $('.wdg_teams_classification_01 .scroll');
            
            $this.find('a.prev, a.next').click(function(event){
                event.preventDefault();
            });
            
            $this.find('a.prev').bind(Pointer.DOWN,function(){
				$(this).parent().parent().siblings('.scroll').animate({
                    'scrollTop': $theUl.scrollTop() - $theUl.height() - 2
                }, 500);
            });
            
            $this.find('a.next').bind(Pointer.DOWN,function(){
                $(this).parent().parent().siblings('.scroll').animate({
                    'scrollTop': $theUl.scrollTop() + $theUl.height() + 2
                }, 500);
            });
     	});
		
		/*Swipe*/
		$(document).ready(function(){
		$wtc =  164;
			$('.wdg_teams_classification_01 .scroll').bind('swipeup',function(){
				$(this).animate({
						'scrollTop': $(this).scrollTop() + $wtc
					}, 500);
			});
			$('.wdg_teams_classification_01 .scroll').bind('swipedown',function(){
				$(this).animate({
						'scrollTop': $(this).scrollTop() - $wtc
					}, 500);
			});	
		});
		
		
		/*Monitoreo scroll*/
		var $wtc_altura = $('.wdg_teams_classification_01 .datos').height();
		$('.wdg_teams_classification_01 .scroll').scroll(function() {
				
				
				
				if($(this).scrollTop() + $(this).height() == $wtc_altura) {
           		 $(this).siblings('.degraded').css("visibility","hidden");
				 //$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings().children('.tvsa-caret-down').css('color','#000');
				  $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').addClass('bginactive');
				  $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').removeClass('bgactive');
      			}
				else if ($.browser.msie && parseInt($.browser.version, 10) <= 8 && $(this).scrollTop() >= 475){
					
					$(this).siblings('.degraded').css("visibility","hidden");
				 	
				  	$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').addClass('bginactive');
				  	$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').removeClass('bgactive');
				}
				else{
				 $(this).siblings('.degraded').css("visibility","visible");
				 //$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings().children('.tvsa-caret-down').css('color','#FFF');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').addClass('bgactive');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.next').removeClass('bginactive');
				}
				
				if($(this).scrollTop() == 0){
				 //$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings().children('.tvsa-caret-up').css('color','#000');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.prev').addClass('bginactive');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.prev').removeClass('bgactive');
				}
				else
				{
				//$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings().children('.tvsa-caret-up').css('color','#FFF');	
				$(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.prev').addClass('bgactive');
				 $(this).siblings('.wdg_teams_classification_01_cnt').children().children().siblings('.prev').removeClass('bginactive');
				}
			});	   
    })($,Televisa);
});

//=============================================================================

;(function( $ ) {
    var $objGlobal = false;
    var objSettings = false;
    var domain = 'http://feeds-televisadeportes.dev/';
    var jsonpCallback = false;
    
    $.fn.teamsClassification = function( params ) {

        objSettings = $.extend( {
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

        if ( !objSettings.idTorneo ) {
            return '';
        } 

        $objGlobal = $(this);
        urlToken = domain+'data/'+objSettings.idTorneo+'/tablageneral.js';
        jsonpCallback = 'teamsClassification';
        
        token(urlToken);
        return this;

    };
    
    var token = function ( urlToken ) {
        $objGlobal.html(objSettings.loading);
        $.ajax({
            type: 'GET',
            url: urlToken,
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
    
    function successData( data ) {
        var html = "";
        html = createHTML( data );
        $objGlobal.delay( 8000 ).html( html );
        $objGlobal.children('div').fadeIn( 4000 );
    }
    
    function createHTML( data ) {
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
        
        html += processData( data );
        
        html += '</tbody></table></div> <!-- END SCROLL -->';
        
        html += '<div class="wdg_teams_classification_01_cnt"><div class="carousel_nav">';
        html += '<a class="prev bginactive" title="'+objSettings.lblPrev+'" href="#"><i class="tvsa-caret-up"></i></a>';
        html += '<a class="next bgactive" title="'+objSettings.lblNext+'" href="#"><i class="tvsa-caret-down"></i></a>';
        html += '<table class="ver_todos"><tbody><tr><td><a href="'+objSettings.urlWidget+'">'+objSettings.lblViewMore+'</a></td></tr></tbody></table></div>';
        html += '<div class="wdg_stadistics_01_clear"></div></div><div class="degraded"></div>';
        html += '<div class="seemore"><a href="'+objSettings.urlWidget+'">'+objSettings.lblViewMore+'</a></div></div>';

        return html;
    };
    
    function processData( data ) {
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

  
})(jQuery);