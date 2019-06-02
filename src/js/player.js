/*Prototype
	- aMusic
	+ sPlayer
*/
function Player(oMusic, mainElement, sRoot){
	this.oMusic = oMusic;
	this.$mainElement = mainElement;
	this.sRoot = sRoot;
	this.sFullRoot = '';
	this.bFirst = true;
	this.nIlist = 0;
	this.nEnd = 0;
	this.nStart = 0;
	this.sMsgNoSub = 'Próximamente'
	this.sSelectView = '<select id="selectPlayer"></select>';
	/*this.sAudioView = `<audio id="audioPlayer">
							<source id="mp3" type="audio/mpeg">Actualiza tu navegador. No soporta el reproductor de audio.
							<track kind="subtitles" id="explicionismTrack" label="Explicionismo" src="" srclang="es" default></track>
						</audio>`;
	this.sIfaceView = `<div id="appIface">
							<div id="playerIface">
								<div class="screwIface" id="topScrew">
									<div class="left"></div>
									<img class="left" src="src/img/web/svg/screw.svg">
									<div class="right"></div>
									<img class="right" src="src/img/web/svg/screw.svg">
								</div>
								
								<div id="playBtnIface">
									<button title="play" class="btnIface play desktop" value="play" id="playpauseDesktop"></button>
								</div>
								<div id="screenIface">
									<div id="screenTime">

									</div>
									<div id="screenTitle">
										<div id="screenTitleWrapper">
											<p id="screenTitleP"></p>
										</div>
									</div>
									
								</div>
								
								<div id="secundaryIface">
									<div>
										<button title="descarga" value="download" id="downloadBtnMobile" class="btnIface">Descargar</button>

									</div>
									<div>
										<button title="play" class="btnIface play mobile" value="play" id="playpauseMobile"></button>
										<button title="stop" value="stop" id="stop" class="btnIface"></button>
										<button title="anterior" value="previous" id="previous" class="btnIface"></button>
										<button title="siguiente" value="next" id="next" class="btnIface"></button>
										<button title="volumen" value="onVolume" id="volume" class="btnIface onVolume"></button>
										<button title="descarga" value="download" id="downloadBtnDesktop" class="btnIface">Descargar</button>
										<a id="downloadAnchor" href="" download></a>
										<ul id="downloadUl" class="menu">
											<li><a download >Tema (.mp3)</a></li>
											<li><a download >Mixtape (.zip)</a></li>
										</ul>

									</div>
								</div>
								<div id="barIface">
									<div id="playBar"></div>
									<span id="controllerBar"></span>
								</div>
								<div class="screwIface" id="bottomScrew">
									<div class="left"></div>
									<img class="left" src="src/img/web/svg/screw.svg">
									<div class="right"></div>
									<img class="right" src="src/img/web/svg/screw.svg">
								</div>
							</div>
							
						<div id="listPlayer"><ol></ol></div>
						<div id="terciaryIface">
							
							<button value="onExplicionism" id="explicionismBtn" class="btnIface">Off</button>
							<div id="explicionismDiv">
								<span id="runner">B</span>
								<p id="author"></p>
								<p id="textContent"></p>
								<img id="imgContent">

							</div>
						</div>`;
	*/
	this.sAudioView = '<audio id="audioPlayer"><source id="mp3" type="audio/mpeg">Actualiza tu navegador. No soporta el reproductor de audio.<track kind="subtitles" id="explicionismTrack" label="Explicionismo" src="" srclang="es" default></track></audio>';
	this.sIfaceView = '<div id="appIface"><div id="playerIface"><div class="screwIface" id="topScrew"><div class="left"></div><img class="left" src="src/img/web/svg/screw.svg"><div class="right"></div><img class="right" src="src/img/web/svg/screw.svg"></div><div id="playBtnIface"><button title="play" class="btnIface play desktop" value="play" id="playpauseDesktop"></button></div><div id="screenIface"><div id="screenTime"></div><div id="screenTitle"><div id="screenTitleWrapper"><p id="screenTitleP"></p></div></div></div><div id="secundaryIface"><div><button title="descarga" value="download" id="downloadBtnMobile" class="btnIface">Descargar</button></div><div><button title="play" class="btnIface play mobile" value="play" id="playpauseMobile"></button><button title="stop" value="stop" id="stop" class="btnIface"></button><button title="anterior" value="previous" id="previous" class="btnIface"></button><button title="siguiente" value="next" id="next" class="btnIface"></button><button title="volumen" value="onVolume" id="volume" class="btnIface onVolume"></button><button title="descarga" value="download" id="downloadBtnDesktop" class="btnIface">Descargar</button><a id="downloadAnchor" href="" download></a><ul id="downloadUl" class="menu"><li><a download >Tema (.mp3)</a></li><li><a download >Mixtape (.zip)</a></li></ul></div></div><div id="barIface"><div id="playBar"></div><span id="controllerBar"></span></div><div class="screwIface" id="bottomScrew"><div class="left"></div><img class="left" src="src/img/web/svg/screw.svg"><div class="right"></div><img class="right" src="src/img/web/svg/screw.svg"></div></div><div id="listPlayer"><ol></ol></div><div id="terciaryIface"><button value="onExplicionism" id="explicionismBtn" class="btnIface">Off</button><div id="explicionismDiv"><span id="runner">B</span><p id="author"></p><p id="textContent"></p><img id="imgContent"></div></div>';
	
	this.$selectPlayer = {};
	this.$listPlayer = {};
	this.$audioPlayer = {};
	this.$audioPlayerMp3 = {};
	this.$audioPlayerOgg = {};
	this.oCue = {};
	this.$divExplicionism = {};
	//interface
	this.$aBtnPlayer = {};
	this.$playPauseDesktopBtn = {};
	this.$playPauseMobileBtn = {};
	this.$stopBtn = {};
	this.$downloadAnchorSong = {};
	this.$downloadUl = {};

	//$spanScreenTime;
	this.$spanScreenTime = {};
	this.$pScreenTitle = {};

	//barPlayer
	this.$barIface = {}
	this.$controllerBar = {};
	this.$playBar = {};

}
	/*player builder
		
		desc: store the player elements in properties
		arg: -
		return: -
	*/
	Player.prototype.get_player = function(){
		var sRes = this.sSelectView + this.sAudioView + this.sIfaceView;
		this.$mainElement.innerHTML = sRes;
		this.$selectPlayer = document.getElementById('selectPlayer');
		this.$listPlayer = document.getElementById('listPlayer');
		this.$audioPlayer = document.getElementById('audioPlayer');
		this.$audioPlayerMp3 = document.getElementById('mp3');
		this.$audioPlayerTrack = document.getElementById('explicionismTrack');
		this.$divExplicionism = document.getElementById('explicionismDiv');
		this.$aBtnPlayer = document.getElementsByClassName('btnIface');
		this.$playPauseDesktopBtn = document.getElementById('playpauseDesktop');
		this.$playPauseMobileBtn = document.getElementById('playpauseMobile');
		this.$stopBtn = document.getElementById('stop');
		
		this.$spanScreenTime = document.getElementById('screenTime');
		this.$pScreenTitle = document.getElementById('screenTitleP');
		this.$spanScreenTime.innerHTML = '00:00';
		this.$barIface = document.getElementById('barIface');
		this.$controllerBar = document.getElementById('controllerBar');
		this.$playBar = document.getElementById('playBar');
		this.$downloadUl = document.getElementById('downloadUl');
		this.$downloadAnchorSong = this.$downloadUl.getElementsByTagName('a')[0];
		console.log(this.$downloadAnchorSong)
	}

	/*tape select builder
		
		desc: load all the tapes name in the select
		arg: -
		return: innerHTML prope
	*/
	Player.prototype.get_option = function(){
		var sRes = '';
		for (var oTape in this.oMusic.aData){
			var sTapeName = this.oMusic.aData[oTape].sTitle;
			sRes += '<option value="'+sTapeName+'">' + sTapeName.replace(/-/g,' ') + '</option>';
		}
		return this.$selectPlayer.innerHTML = sRes;
	}

	/*tape loader

		desc: load first song, put the rest in the list, with the title up and the img
		arg: -
		return: - 
	*/
	Player.prototype.load_tape = function(){
		var sSelectValue = this.$selectPlayer.value;
		var sMsg = '';
		for(var oTape in this.oMusic.aData){
			var sTapeName = this.oMusic.aData[oTape].sTitle;
			if(sSelectValue == sTapeName){
				var sTapeName = this.oMusic.aData[oTape].sTitle;
				var aTapeSong = this.oMusic.aData[oTape].aSong;
				var sTitle = sTapeName;
				sMsg += 'loaded tape '+sTitle+'\n';
				for(var i = 0; i < aTapeSong.length; i++){
					var sSongName = aTapeSong[i].sName;
					var sSongAuthor = '';
					var sClass = '';
					var bLyric = aTapeSong[i].bLyric
					this.sFullRoot = this.sRoot+sTapeName+'/';
					for(var j = 0; j < aTapeSong[i].aAuthor.length; j++){
						var sSep = ', ';
						if (j == aTapeSong[i].aAuthor.length-2){
							sSep = ' y ';
						}else if(j == aTapeSong[i].aAuthor.length-1){
							sSep = '';
						}
						sSongAuthor += aTapeSong[i].aAuthor[j] + sSep; 
					}
					this.$listPlayer.childNodes[0].innerHTML += '<li id="'+i+'" name="'+sSongName+'_'+sSongAuthor+'" class="'+sClass+' '+bLyric+'"><span id="songName">'+sSongName.replace(/-/g,' ')+'</span><span id="songSep">-</span><span id="songAuthor">'+sSongAuthor+'</span></li>';			
				}
			}
		}
	}

	/*player reseter
		
		desc: clean list when mixtape changes
		arg: -
		return: innerHTML prop
	*/
	Player.prototype.reset_player = function(){
		return this.$listPlayer.childNodes[0].innerHTML = '';
	}

	/*song loader
		
		desc: song loader when finish, or click in list
		arg: li element 
		return: load method
	*/
	Player.prototype.load_song = function($li){

		var sName = $li.getAttribute('name');
		var sSongName = sName.split('_')[0];
		var sSongAuthor = sName.split('_')[1];
		this.$pScreenTitle.innerHTML = sSongName.replace(/-/g,' ') + ' - ' + sSongAuthor;
		//this.$pScreenTitle.innerHTML += '------aaaaaaaa- -----------  ------ ---- -------------- --------- --------- ------- ---------ssssss'
		var sRoot = this.sFullRoot+sSongName+'.mp3';
		this.$audioPlayerMp3.src = sRoot;
		this.$downloadAnchorSong.href = sRoot;
		return this.$audioPlayer.load();
	}

	/*subtitle loader
		
		desc: subtitle loader
		arg: li element
		return: cue object
	*/
	Player.prototype.load_sub = function($li){
		var sRoot = '';
		var $divContent = this.$divExplicionism.children[2];
		var $spanRunner = this.$divExplicionism.children[0];
		var sSongName = $li.getAttribute('name');
		if($li.classList.contains('true')){
			sRoot = 'src/sub/'+sSongName.split('_')[0]+'.vtt';
			$divContent.innerHTML = '';
			$spanRunner.innerHTML = 'B';
		}else{
			this.clean_explicionism('author');
			$divContent.classList.remove('noMargin');
			$divContent.innerHTML = this.sMsgNoSub;
			$spanRunner.innerHTML = ''
		}
		return this.$audioPlayerTrack.src = sRoot;
		//return this.oCue = this.$audioPlayer.textTracks[0];	
	}

	/*img loader

		desc: load gif / jpg and append as an img object in the vtt object of the cue
		arg: -	
		return: -
	*/

	Player.prototype.load_img = function(){
		var oVtt = null;
		var oImg = null;
		for(var i = 0; i < this.oCue.cues.length; i++){
			oVtt = JSON.parse(this.oCue.cues[i].text);
			if (oVtt.sMode == 'gif' || oVtt.sMode == 'jpg'){
				oImg = new Image();
				oImg.src = 'src/img/sub/gif/'+oVtt.sContent+'.'+oVtt.sMode;
				this.oCue.cues[i].oImg = oImg;

			}
		}
	}


	Player.prototype.get_last_second = function(){
		console.log(this.oCue.cues)
	}

	/*subtitles poster

		desc: post both subtitles and png/gifs after clean the div
		arg: cue object	
		return: innerHTML prop / img src
	*/
	Player.prototype.post_explicionism = function(oActiveCue){
		var oVtt = JSON.parse(oActiveCue.text);
		var $spanRunner = this.$divExplicionism.children[0];
		var $divAuthor = this.$divExplicionism.children[1]; 
		var $divContent = this.$divExplicionism.children[2];
		var $imgContent = null;
		//shoot
		
		if($divAuthor.innerHTML != oActiveCue.id){
			console.log($divAuthor.innerHTML)
			console.log(oActiveCue.id)
			
			$divAuthor.innerHTML = oActiveCue.id;
		}
		if(oVtt.sMode == 'text'){
			$divContent.classList.remove('noMargin');
			return $divContent.innerHTML = oVtt.sContent;	
		}else if(oVtt.sMode == 'gif' || oVtt.sMode == 'jpg'){
			$divContent.classList.add('noMargin');
			$imgContent = this.$divExplicionism.children[3];
			return $imgContent.src = oActiveCue.oImg.src;
		}
	}

	/*subtitles cleaner

		desc: clean cue when finish
		arg: -	
		return: innerHTML prop
	*/
	Player.prototype.clean_explicionism = function(sMode){
		var $divContent = this.$divExplicionism.children[2];
		var $imgContent = this.$divExplicionism.children[3];

		$imgContent.src = '';
		//shoot
		if (sMode == 'author'){
			var $divAuthor = this.$divExplicionism.children[1];
			return $divAuthor.innerHTML = ''; 
		}else if($divContent.innerHTML !== this.sMsgNoSub){
			return $divContent.innerHTML = '';
		}
		
	}

	/*class list loader

		desc: put the load class to the current song
		arg: li element	
		return: innerHTML prop
	*/

	Player.prototype.load_class = function($li){
		var aLi = this.$listPlayer.getElementsByTagName('ol')[0].childNodes;
		var nIFrom = null;
		var nITo = null;
		for(var i = 0; i < aLi.length; i++){
			if($li == aLi[i]){
				aLi[i].classList.add('loaded');
				nITo = i;
			}else if(aLi[i].classList.contains('loaded')){
				aLi[i].classList.remove('loaded');
				nIFrom = i;
			}
		}
		return 'class loaded changed from '+String(nIFrom)+' to '+String(nITo);
	}

	/*song timer

		desc: get the current song time and post it
		arg: -
		return: innerHTML prop
	*/
	Player.prototype.timer_song = function(){
		var sMsg = '';
		var nTime = Math.floor(this.$audioPlayer.currentTime);
		//console.log(this.$audioPlayer.currentTime)
		var nMin = Math.floor(nTime/60);
		var sMin = String(nMin).length > 1 ? String(nMin) : '0'+ String(nMin);
		var nSec = nTime - nMin * 60
		var sSec = String(nSec).length > 1 ? String(nSec) : '0'+ String(nSec);
		sMsg = sMin+':'+sSec;
		if(this.$spanScreenTime.innerHTML != sMsg){
			return this.$spanScreenTime.innerHTML = sMsg;
		}
	}

	/*operations of the music player

		desc: set the operations of the song: play, pause, stop, onVolume, offVolume, onSubtitles, offExplicionism
		arg: button element
		return: players's props / methods
	*/
	Player.prototype.op_song = function(oBtn){
		var $li = null;
		var sRoot = '';
		var b = false;
		var aLi = this.$listPlayer.getElementsByTagName('ol')[0].childNodes;
		var $spanRunner = this.$divExplicionism.children[0];
		var $divAuthor = this.$divExplicionism.children[1];
		var $divContent = this.$divExplicionism.children[2];
		var $imgContent = this.$divExplicionism.children[3];
		var oBtnPlay = null;
		if(oBtn.value == 'play'){
			if(this.bFirst){
				this.bFirst = false;
				$li = this.$listPlayer.getElementsByTagName('ol')[0].childNodes[0];
				
				this.$downloadAnchorSong.href = sRoot;
				this.load_song($li);
				this.load_sub($li);
				this.get_last_second();
				console.log(this.oCue)
				this.load_class($li);
			}
			this.$playPauseDesktopBtn.value = 'pause';
			this.$playPauseDesktopBtn.classList.add('pause');
			this.$playPauseDesktopBtn.classList.remove('play');

			this.$playPauseMobileBtn.value = 'pause';
			this.$playPauseMobileBtn.classList.add('pause');
			this.$playPauseMobileBtn.classList.remove('play');				
			return this.$audioPlayer.play();

		}else if(oBtn.value == 'pause'){
			this.$playPauseDesktopBtn.value = 'play';
			this.$playPauseDesktopBtn.classList.add('play');
			this.$playPauseDesktopBtn.classList.remove('pause');

			this.$playPauseMobileBtn.value = 'play';
			this.$playPauseMobileBtn.classList.add('play');
			this.$playPauseMobileBtn.classList.remove('pause');		
			return this.$audioPlayer.pause();
			
		}else if(oBtn.value == 'stop'){
			this.$audioPlayer.currentTime = 0;
			this.$playPauseDesktopBtn.value = 'play';
			this.$playPauseDesktopBtn.classList.add('play');
			this.$playPauseDesktopBtn.classList.remove('pause');

			this.$playPauseMobileBtn.value = 'play';
			this.$playPauseMobileBtn.classList.add('play');
			this.$playPauseMobileBtn.classList.remove('pause'); 	 	
			return this.$audioPlayer.pause();

		}else if(oBtn.value == 'onVolume'){
			oBtn.value = 'offVolume';
			oBtn.classList.add('offVolume');
			oBtn.classList.remove('onVolume');
			return this.$audioPlayer.volume = 0;

		}else if(oBtn.value == 'offVolume'){
			oBtn.value = 'onVolume';
			oBtn.classList.add('onVolume');
			oBtn.classList.remove('offVolume');
			return this.$audioPlayer.volume = 1;

		}else if(oBtn.value == 'onExplicionism'){
			oBtn.value = 'offExplicionism';
			oBtn.innerHTML = 'On';
			$divAuthor.style.visibility = 'hidden';
			$divContent.style.visibility = 'hidden';
			$spanRunner.style.visibility = 'hidden';
			return $imgContent.style.visibility = 'hidden';
			console.log(this.$audioPlayer.textTracks[0].cues)

		}else if(oBtn.value == 'offExplicionism'){
			oBtn.value = 'onExplicionism';
			oBtn.innerHTML = 'Off';
			$divAuthor.style.visibility = '';
			$divContent.style.visibility = '';
			$spanRunner.style.visibility = '';
			return $imgContent.style.visibility = '';
		}else if(oBtn.value == 'download'){
			
			this.$downloadUl.classList.toggle('on');
			console.log()
			if(this.$downloadAnchorSong.getAttribute('href') != ''){
				//return this.$downloadAnchorSong.click();
			}else{
				return false;
			}
		}else if(oBtn.value == 'next' || oBtn.value == 'previous'){	
			if (this.$playPauseDesktopBtn.classList.contains('play')){
				this.$playPauseDesktopBtn.classList.add('pause');
				this.$playPauseDesktopBtn.classList.remove('play');

				this.$playPauseMobileBtn.classList.add('pause');
				this.$playPauseMobileBtn.classList.remove('play');
			}
			if(this.nIlist >= 0 || this.nIlist <= aLi.length  - 1){	
				if(oBtn.value == 'next'){
					if(this.nIlist < aLi.length - 1){
						b = true;
						$li = aLi[this.nIlist += 1];
					}else{
						b = true;
						$li = aLi[this.nIlist -= this.nIlist];
					}
					
				}else{
					if(this.nIlist > 0){
						b = true;
						$li = aLi[this.nIlist -= 1];
					}else{
						b = true;
						$li = aLi[this.nIlist += aLi.length-1]
					}
				}
				if(b){
					this.load_song($li);
					this.load_sub($li); 
					this.load_class($li);
					this.$playPauseDesktopBtn.value = 'pause';
					return this.$audioPlayer.play();
				}
			}
		}
	}

	/*move of the bar player
	
		desc: change the position of the player's bar
		arg: nPos of the bar
		return: style-width prop
	*/
	Player.prototype.move_bar_player = function(nPos){
		this.$controllerBar.style.left = String(nPos)+'px';
		return this.$playBar.style.width = String(nPos)+'px';	
	}

	/*set events
	
		desc: set the events
		arg: -
		return: -
	*/
	Player.prototype.get_event = function(){
		
		var nWidthBar = null;
		var nEndBar = null;
		var nxBar = null;

		var nWidthController = null;
		var nControllerE = null;

		var bDown = false;
		var oPosX = 0;

		var nPosController = null;

		var oActiveCue = null;

		//player controller
		for(var i = 0; i < this.$aBtnPlayer.length; i++){
			this.$aBtnPlayer[i].onclick = function(e){
				return this.op_song(e.target);
			}.bind(this);

			this.$aBtnPlayer[i].onmousedown = function(e){
				e.target.classList.add('pressed');
			}.bind(this);

			this.$aBtnPlayer[i].onmouseup = function(e){
				e.target.classList.remove('pressed');
			}.bind(this);

			this.$aBtnPlayer[i].ontouchstart = function(e){
				console.log(e)
				e.target.classList.add('pressed');
			}.bind(this);

			this.$aBtnPlayer[i].ontouchend = function(e){
				e.target.classList.remove('pressed');
			}.bind(this);
		}
		//select
		this.$selectPlayer.onchange = function(e){
			var $li = null;
			this.op_song(this.$stopBtn);
			this.nIlist = 0;
			this.reset_player();
			this.load_tape();
			$li = this.$listPlayer.childNodes[0].childNodes[0];
			this.load_song($li);
			this.load_sub($li)
			this.load_class($li)
			this.op_song(this.$playPauseDesktopBtn)
			
		}.bind(this);
		//download list
		this.$downloadUl.onclick = function(){
			this.$downloadUl.classList.toggle('on')
		}.bind(this);
		//list elements
		this.$listPlayer.childNodes[0].onclick = function(e){
			var aLi = this.$listPlayer.getElementsByTagName('ol')[0].childNodes;
			var $li = null;
			var sSongName = '';
			var sRoot = '';
			if(e.target.nodeName == 'SPAN'){
				$li = e.target.parentNode;
			}else if(e.target.nodeName == 'LI'){
				$li = e.target;
			}else{
				return false;
			}
			if($li.classList.contains('loaded')){
				return false;
			}
			this.nIlist = Number($li.id);
			if(this.bFirst){
				this.bFirst = false;
			}
			this.load_song($li);
			this.load_sub($li)
			this.load_class($li);
			this.op_song(this.$stopBtn);
			console.log(this.$playPauseDesktopBtn)
			this.op_song(this.$playPauseDesktopBtn);
		}.bind(this);
		//change song's time
		this.$audioPlayer.ontimeupdate = function(){
			this.timer_song();
			
			if(!bDown){
				//bar start
				nxBar = this.$barIface.offsetLeft
				//bar width 
				nWidthBar = this.$barIface.offsetWidth;
				this.move_bar_player(this.$audioPlayer.currentTime * nWidthBar / this.$audioPlayer.duration);
			}
			//var aLi = this.$listPlayer.getElementsByTagName('ol')[0].childNodes;
			if(this.$audioPlayer.duration === this.$audioPlayer.currentTime){
				for(var i = 0; i < this.$aBtnPlayer.length; i++){
					if (this.$aBtnPlayer[i].id == 'next'){
						this.clean_explicionism('author');
						this.op_song(this.$aBtnPlayer[i]);
					}
				}
			}
			//clean author if greatest that last second cue
			if(this.$audioPlayer.currentTime > this.nEnd || this.$audioPlayer.currentTime < this.nStart){
				this.clean_explicionism('author');
			}
			//cue change
			this.oCue.oncuechange = function(){
				//post
				console.log(this.oCue)
				if (this.oCue.activeCues.length > 0){
					oActiveCue = this.oCue.activeCues[0];
					return this.post_explicionism(oActiveCue);
				}

			}.bind(this);
			//cue finish
			if (oActiveCue != null){
				oActiveCue.onexit = function(){
					//clean
					return this.clean_explicionism('content');	
				}.bind(this);
			}		
		}.bind(this);

		//bar clickdown
		this.$barIface.onmousedown = function(e){
			return down(e.clientX, this);
		}.bind(this);
		//bar clickup
		document.onmouseup = function(){
			return up(this);
		}.bind(this);

		//bar clickmove
		document.onmousemove = function(e){
			return move(e.clientX, this)
		}.bind(this);

		//bar touchdown
		this.$barIface.addEventListener('touchstart', function(e){
			document.addEventListener('touchmove', prevent(e), { passive: false });
			return down(e.changedTouches[0].clientX, this);
		}.bind(this), false)

		function prevent(e){
			return e.preventDefault();
		}
		//bar touchup
		document.addEventListener('touchend', function(){
			return up(this);
		}.bind(this), false);

		//bar touchmove
		document.addEventListener('touchmove', function(e){
			return move(e.changedTouches[0].clientX, this);
		}.bind(this), false)

		document.onclick  = function(e){
			console.log(e.target)
			if(this.$downloadUl.classList.contains('on') && e.target.id != 'downloadBtnDesktop'){
				return this.$downloadUl.classList.toggle('on');
			}
		}.bind(this)
		
		this.$audioPlayerTrack.onload = function(){
			this.oCue = this.$audioPlayer.textTracks[0];
			this.$audioPlayer.textTracks[0].mode = 'showing';
			//en la funcion que load el sub: cambiar los modes: showing, disabled
			console.log(this.$audioPlayer.textTracks[0])			
			if(this.oCue.cues !== null){
				if(this.oCue.cues.length > 0){
					this.nEnd = this.oCue.cues[this.oCue.cues.length-1].endTime;
					this.nStart = this.oCue.cues[0].startTime;
					return this.load_img();
				}	
			}
			
		}.bind(this)
		
		function down(nClientX, that){
			if(!that.bFirst){
				/*if(document.getElementsByClassName('play').length == 0){
				this.op_song(this.$playPauseDesktopBtn);
				}*/
				bDown = true;
				oPosX = nClientX;
				
				nWidthController = that.$controllerBar.offsetWidth;
				//bar width 
				nWidthBar = that.$barIface.offsetWidth;
				//bar start
				nxBar = that.$barIface.offsetLeft
				//bar end
				nEndBar = nxBar+nWidthBar;
				nPosController = (nClientX-nxBar)-nWidthController/2;
				that.move_bar_player(nPosController);
			}
		}

		function up(that){
			if( bDown == true){
				//console.log(nPosController)
				that.$audioPlayer.currentTime = nPosController * that.$audioPlayer.duration / nWidthBar
				//this.op_song(this.$playPauseDesktopBtn);
				bDown = false;
				return 'mouseup!';
			}
		}

		function move(nClientX, that){
			if(bDown){
				if(oPosX != nClientX){
					if(nClientX <= nEndBar && nClientX >= nxBar){
						nPosController = (nClientX-nxBar)-nWidthController/2;
					}else if(nClientX > nEndBar){
						nPosController = nWidthBar;
					}else if(nClientX < nxBar){
						nPosController = 0;
					}
					
					that.move_bar_player(nPosController);					
				}
			}
		}
	}