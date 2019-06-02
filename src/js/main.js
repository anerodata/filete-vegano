var sUrl = 'src/data/data.json';
var sMusicRoot = 'src/music/';
var $divToggleMenu = document.getElementById('toggleMenu');
var aAMenu =  document.getElementsByClassName('menuBtn');
var $ulMenu = document.getElementById('menuSection');
var $articleMain = document.getElementById('main');
var $sectionAudio = document.getElementById('audioSection');
var $sectionVideo = document.getElementById('videoSection');
var $sectionForm = document.getElementById('formSection');


var $selectPlayer = {};
var $listPlayer = {};
var $audioPlayer = {};

var aData = [];
var oMusic = {};
var oVideo = {};
//load data _song, videos_ / build player
get_data(sUrl);
//event menu handler
function get_data(sUrl){
	var xhttp;
	if (window.XMLHttpRequest) {
		xhttp = new XMLHttpRequest();
		}else{
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.onreadystatechange = function(){
		if(this.readyState == 4 && this.status == 200){
			aData = JSON.parse(this.responseText);
			for(var i = 0; i < aData.length; i++){
				if(aData[i].sName == 'music'){
					oMusic = aData[i];
				}else if(aData[i].sName == 'video'){
					oVideo = aData[i];
				}
			}
			return get_app();
		}
	}
	xhttp.open('GET', sUrl, true);
	xhttp.send();
}


function get_app(){ 
	var oPlayer = null;
	var oVideoGallery = null;
	var sSection = window.location.href.split('#')[window.location.href.split('#').length - 1];
	var $stopBtn = null;
	var $el = null;
	if(sSection == 'video-a'){
		add_class($sectionAudio);
		remove_class($sectionVideo);
		document.getElementById('videoA').classList.remove('disabled');
		document.getElementById('audioA').classList.add('disabled');
		get_video();
	
	}else{
		get_player();
	}
	//NEW SECTION
	
	function get_video(){
		oVideoGallery = new VideoGallery(oVideo, $sectionVideo);
		return oVideoGallery.get_video();
	}

	function get_player(){
		oPlayer = new Player(oMusic, $sectionAudio, sMusicRoot);
		oPlayer.get_player();
		oPlayer.get_option();
		oPlayer.load_tape();
		$stopBtn = document.getElementById('stop');
		return oPlayer.get_event();
	}

	function add_class($el, sClass){
		return $el.classList.add(sClass);
	}

	function remove_class($el, sClass){
		return $el.classList.remove(sClass);
	}

	function check_class($el, sClass){
		return $el.classList.contains(sClass);
	}

	$divToggleMenu.onclick = function(e){
		$divToggleMenu.classList.toggle('on');
		$ulMenu.classList.toggle('on');
	}

	document.onclick  = function(e){
		console.log(e.target)
		console.log($divToggleMenu)
		if($ulMenu.classList.contains('on') && e.target.id != 'toggleMenu'){
			console.log($divToggleMenu)
			$ulMenu.classList.toggle('on');
			return $divToggleMenu.classList.toggle('on');
		}
	}

	for(var i = 0; i < aAMenu.length; i++){
		aAMenu[i].onclick = function(e){
			remove_class($divToggleMenu, 'on');
			$ulMenu.classList.toggle('on');
			var sId = e.target.href.split('#')[1];
			console.log(e.target)
			if(sId == 'video-a' || sId == 'audio-a'){
				if(check_class(e.target, 'disabled') && sId == 'video-a'){

					/*if(!check_class($sectionVideo, 'displayNone')){
						
					}*/

					add_class($sectionVideo, 'displayNone');
					remove_class(e.target, 'disabled');
					get_video();
				}else if(check_class(e.target, 'disabled') && sId == 'audio-a'){
					/*if(!check_class($sectionAudio, 'displayNone')){
						

					}*/
					add_class($sectionAudio, 'displayNone');
					remove_class(e.target, 'disabled');
					alert('build plahyer')
					get_player();
				}
				//NEW SECTION

				if(sId == 'audio-a'){
					if(!check_class($sectionVideo, 'displayNone')){
						if(oVideoGallery != null){
							oVideoGallery.stop_video();
						}
						add_class($sectionVideo, 'displayNone');
						remove_class($sectionAudio, 'displayNone');
					}
				}else if(sId == 'video-a'){
					if(!check_class($sectionAudio, 'displayNone')){
						if(oPlayer != null){
							oPlayer.op_song($stopBtn);
						}
						add_class($sectionAudio, 'displayNone');
						remove_class($sectionVideo, 'displayNone');
					}
				}
				//NEW SECTION
			}
		}.bind(this);
	}
}
