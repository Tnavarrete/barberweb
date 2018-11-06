
jQuery(document).ready(function(){
	
	//////area declaracion de funciones para eventos.

	function Carrusel_open_sl(dom){
		dom.parent().parent().css({width: "100%"});
		dom.parent().find(".crop_content_lan").animate({
			width:"100%"
		}, 500);
	}

	function Carrusel_create_sl_slide_controls(){
		for (var i = 0; i < Carrusel_num_sl_slides; i++) {
				jQuery(".Carrusel_lan .content_lan .balls_lan").append('<li></li>');
		};
	}
	
	function Carrusel_slide_change(Carrusel_slide_ind_ref){
		jQuery(".Carrusel_lan .content_lan .stage_lan a:eq("+Carrusel_slide_ind_ref+")").siblings().fadeOut("fast", function(){
			jQuery(".Carrusel_lan .content_lan .stage_lan a:eq("+Carrusel_slide_ind_ref+")").fadeIn("fast");
		});
		
		jQuery(".Carrusel_lan .content_lan .balls_lan li:eq("+Carrusel_slide_ind_ref+")").addClass("active").siblings().removeClass("active");
	}
	
	
	//////fin area declaracion de funciones para eventos.

	//////area creacion timer y slider.

	var kbft_timer_panico;
	var keyFirstTime=true;
	
	function kbft_panic_slides_mueve_limites(gg){
		if(Carrusel_slide_ind_ref < Carrusel_num_sl_slides ){
			Carrusel_slide_ind_ref=gg;
		}else{
			Carrusel_slide_ind_ref=0;
		}

		Carrusel_slide_change(Carrusel_slide_ind_ref);			
	}
	
	var Carrusel_num_sl_slides=jQuery(".Carrusel_lan .content_lan .slider_lan .stage_lan").children().length;
	var Carrusel_slide_ind_ref=0;
	
	//////fin area creacion timer y slider.
	
	//////area start
	Carrusel_create_sl_slide_controls();
	Carrusel_slide_change(Carrusel_slide_ind_ref);
	//////fin area start
	
	////// area funciones autoRun
	function kbft_panic_slides_autoRun_Init(){
		clearInterval(kbft_timer_panico);
		kbft_timer_panico=setInterval(function(){kbft_panic_slides_mueve_limites(Carrusel_slide_ind_ref);Carrusel_slide_ind_ref++;},15000);
	}
	
	function kbft_panic_slides_autoRun_Reset(Carrusel_slide_ind_ref_copy){
		if(Carrusel_slide_ind_ref_copy==Carrusel_num_sl_slides){
			Carrusel_slide_ind_ref_copy=0;
		}
		Carrusel_slide_ind_ref=Carrusel_slide_ind_ref_copy;
		clearInterval(kbft_timer_panico);
		kbft_timer_panico=setInterval(function(){kbft_panic_slides_mueve_limites(Carrusel_slide_ind_ref);Carrusel_slide_ind_ref++;},15000);
	}
	
	function kbft_panic_slides_autoRun_Stop(){
		clearInterval(kbft_timer_panico);
		Carrusel_slide_ind_ref=0;
	}

	////// fin area funciones autoRun

	////// area eventos .click
	
	jQuery(".Carrusel_lan .content_lan .balls_lan li").click(function(){
		Carrusel_slide_ind_ref=jQuery(this).index();
		clearInterval(kbft_timer_panico);
		Carrusel_slide_change(Carrusel_slide_ind_ref);
		kbft_panic_slides_autoRun_Reset(Carrusel_slide_ind_ref);
	});


	jQuery(".Carrusel_lan .content_lan .sld_izq,.Carrusel_lan .content_lan .sld_der").click(function(){
		if(jQuery(this).hasClass("sld_izq")) {
			if(Carrusel_slide_ind_ref > 0){
				Carrusel_slide_ind_ref--;
			}else{
				Carrusel_slide_ind_ref=(Carrusel_num_sl_slides - 1);
			}
		}else{
			if(Carrusel_slide_ind_ref < (Carrusel_num_sl_slides - 1)){
				Carrusel_slide_ind_ref++;
			}else{
				Carrusel_slide_ind_ref=0;
			}
		};
		
		clearInterval(kbft_timer_panico);			
		if(keyFirstTime==true){
			Carrusel_slide_change(Carrusel_slide_ind_ref);
			keyFirstTime=false;
		}else{
			Carrusel_slide_change(Carrusel_slide_ind_ref-1);
			keyFirstTime=false;
		}
		
		kbft_panic_slides_autoRun_Reset(Carrusel_slide_ind_ref);
	});
	
	////// fin area eventos .click
	
});
	
		
	
	
	
	
	