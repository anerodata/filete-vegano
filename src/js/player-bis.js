/*Prototype
	- aMusic
	+ sPlayer
*/
function Player(oMusic, mainElement, sRoot){
	this.oMusic = oMusic;
	this.$mainElement = mainElement;
	this.sRoot = sRoot;
	this.sFullRoot = '';
	this.nIlist = 0;
	this.sSelectView = '<select id="selectPlayer"></select>';
	this.sAudioView = '<audio controls id="audioPlayer"><source id="mp3" type="audio/mpeg">Actualiza tu navegador. No soporta el reproductor de audio.</audio>';
	this.sIfaceView = '<div><div class="primaryIface"><div id="screen"><span id="screenTime"></span></div><button class="btnIface pause" value="play" id="playpause">Play/Pause</button></div><div id="barIface"><div id="playBar"></div><span id="controllerBar"></span></div><div id="secundaryIface"><button value="stop" id="stop" class="btnIface">Stop</button><button value="next" id="next" class="btnIface">Next</button><button value="previous" id="previous" class="btnIface">Previous</button><button id="volume" class="btnIface offVolume" value="onVolume">volume</button><a id="download" href="" download>Descarga</a></div>';
	this.sListView = '<div id="listPlayer"><ol></ol></div>';

	this.$selectPlayer = {};
	this.$listPlayer = {};
	this.$audioPlayer = {};
	this.$audioPlayerMp3 = {};
	this.$audioPlayerOgg = {};

	//interface
	this.$aBtnPlayer = {};
	this.$playPauseBtn = {};
	this.$stopBtn = {};
	this.$downloadAnchor = {};

	//screenInterface;
	this.screenInterface = {};

	//barPlayer
	this.$barIface = {}
	this.$controllerBar = {};
	this.$playBar = {};
}

	Player.prototype.get_player = function(){
		var sRes = this.sSelectView + this.sAudioView + this.sIfaceView +  this.sListView;
		$mainElement.innerHTML = sRes;
		this.$selectPlayer = document.getElementById('selectPlayer');
		this.$listPlayer = document.getElementById('listPlayer');
		this.$audioPlayer = document.getElementById('audioPlayer');
		this.$audioPlayerMp3 = document.getElementById('mp3');

		this.$aBtnPlayer = document.getElementsByClassName('btnIface');
		this.$playPauseBtn = document.getElementById('playpause');
		this.$stopBtn = document.getElementById('stop');
		this.$downloadAnchor = document.getElementById('download');

		this.screenInterface = document.getElementById('screen');
		this.$barIface = document.getElementById('barIface');
		this.$controllerBar = document.getElementById('controllerBar');
		this.$playBar = document.getElementById('playBar');


		return 'player created';
	}

	Player.prototype.get_option = function(){
		var sRes = '';
		for (var oTape in this.oMusic.aData){
			var sTapeName = this.oMusic.aData[oTape].sTitle;
			sRes += '<option value="'+sTapeName.replace(' ','-')+'">' + sTapeName + '</option>';
		}
		this.$selectPlayer.innerHTML = sRes;
		return 'options created';
	}

	//load first song, put the rest in the list, with the title up and the img
	Player.prototype.load_tape = function(bFirstSong){
		var sSelectValue = this.$selectPlayer.value.replace('-',' ');
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
					var bFirst = false;
					if(i == this.nIlist){
						this.sFullRoot = this.sRoot+sTapeName+'/';
						var sRoot = (this.sFullRoot+aTapeSong[i].sName+'.mp3');
						sMsg += this.load_song(sRoot);
						bFirst = true;
					}
					for(var j = 0; j < aTapeSong[i].aAuthor.length; j++){
						var sSep = ', ';
						if (j == aTapeSong[i].aAuthor.length-2){
							sSep = ' y ';
						}else if(j == aTapeSong[i].aAuthor.length-1){
							sSep = '';
						}
						sSongAuthor += aTapeSong[i].aAuthor[j] + sSep; 
					}
					if (bFirst){
						sClass = 'loaded';
						this.$downloadAnchor.href = sRoot;
					}else{
						sClass = '';
					}
					this.$listPlayer.childNodes[0].innerHTML += '<li id="'+i+'" name="'+sSongName+'" class="'+sClass+'"><span id="songName">'+sSongName+'</span><span id="songSep">-</span><span id="songAuthor">'+sSongAuthor+'</span></li>';
					
				}
				if(bFirstSong){
					this.op_song(this.$playPauseBtn);
				}
				sMsg += String(aTapeSong.length)+' songs.'+'\n';
			}
		}
		return sMsg;
	}

	Player.prototype.reset_player = function(){
		this.$listPlayer.childNodes[0].innerHTML = '';
	}

	Player.prototype.load_song = function(sRoot){
		this.$audioPlayerMp3.src = sRoot;
		this.$audioPlayer.load();
		this.$downloadAnchor.href = sRoot;
		return 'loaded song '+sRoot+'\n';
	}

	Player.prototype.timer_song = function(){
		var sMsg = '';
		var nTime = Math.floor(this.$audioPlayer.currentTime);
		console.log(this.$audioPlayer.currentTime)
		var nMin = Math.floor(nTime/60);
		var sMin = String(nMin).length > 1 ? String(nMin) : '0'+ String(nMin);
		var nSec = nTime - nMin * 60
		var sSec = String(nSec).length > 1 ? String(nSec) : '0'+ String(nSec);
		sMsg = sMin+':'+sSec;
		if(this.screenInterface.innerHTML != sMsg){
			this.screenInterface.innerHTML = sMsg;
		}
		return sMsg;
	}

	Player.prototype.op_song = function(oBtn){
		var sMsg = '';
		var sSongName = '';
		var sRoot = '';
		var b = false;
		
		if(oBtn.value == 'play'){
			oBtn.value = 'pause';
			oBtn.className = 'btnIface pause';			
			this.$audioPlayer.play();

		}else if(oBtn.value == 'pause'){
			oBtn.value = 'play';
			oBtn.className = 'btnIface play';		
			this.$audioPlayer.pause();
			
		}else if(oBtn.value == 'stop'){
			this.$audioPlayer.pause();
			this.$audioPlayer.currentTime = 0;
			this.$playPauseBtn.value = 'play';
			clearInterval(this.nIntervalBarMove);

		}else if(oBtn.value == 'onVolume'){
			this.$audioPlayer.volume = 0;
			oBtn.value = 'offVolume';

		}else if(oBtn.value == 'offVolume'){
			this.$audioPlayer.volume = 1;
			oBtn.value = 'onVolume';
			console.dir(this.$audioPlayer)

		}else if(oBtn.value == 'next' || oBtn.value == 'previous'){
			var aLi = this.$listPlayer.getElementsByTagName('ol')[0].childNodes;
			if(this.nIlist >= 0 || this.nIlist <= aLi.length  - 1){	
				if(oBtn.value == 'next'){
					if(this.nIlist < aLi.length - 1){
						b = true;
						sSongName = aLi[aLi, this.nIlist += 1].getAttribute('name'); 
					}else{
						b = true;

						sSongName = aLi[this.nIlist -= this.nIlist].getAttribute('name');
					}
					
				}else{
					if(this.nIlist > 0){
						b = true;
						sSongName = aLi[this.nIlist -= 1].childNodes[0].innerHTML;
					}else{
						b = true;
						sSongName = aLi[this.nIlist += aLi.length-1].getAttribute('name');
					}
				}
				if(b){
					var sRoot = this.sFullRoot+sSongName+'.mp3';
					sMsg = this.load_song(sRoot);
					this.$audioPlayer.play();
					this.$playPauseBtn.value = 'pause';
				}
			}
		}
		return sMsg += oBtn.value+ 'in song: '+this.$audioPlayerMp3.src+'\n';
		
	}

	Player.prototype.move_bar_player = function(nPos){
		this.$controllerBar.style.left = String(nPos)+'px';
		this.$playBar.style.width = String(nPos)+'px';
		return 'bar player n controller player move to... '+String(nPos);
	}

	Player.prototype.get_event = function(){
		var sMsg = '';
		var nWidthBar = null;
		var nEndBar = null;
		var nxBar = null;

		var nWidthController = null;
		var nControllerE = null;

		var bDown = false;
		var oPosX = 0;

		var nPosController = null;

		//player controller
		for(var i = 0; i < this.$aBtnPlayer.length; i++){
			this.$aBtnPlayer[i].onclick = function(e){
				return sMsg = this.op_song(e.target);
			}.bind(this);
		}
		//select
		this.$selectPlayer.onchange = function(e){
			sMsg = this.op_song(this.$stopBtn);
			this.nIlist = 0;
			sMsg += this.reset_player();
			sMsg += this.load_tape(true);
		}.bind(this);

		//list elements
		this.$listPlayer.childNodes[0].onclick = function(e){
			var aLi = this.$listPlayer.getElementsByTagName('ol')[0].childNodes;
			var sSongName = '';
			var sRoot = '';
			if(e.target.nodeName == 'SPAN'){
				sSongName = e.target.parentNode.getAttribute('name');
				this.nIlist = Number(e.target.parentNode.id);
			}else if(e.target.nodeName == 'LI'){
				sSongName = e.target.getAttribute('name');
				this.nIlist = Number(e.target.id);
			}else{
				return false;
			}
			sRoot = (this.sFullRoot+sSongName+'.mp3');
			sMsg += this.load_song(sRoot);
			sMsg += this.op_song(this.$stopBtn);
			sMsg += this.op_song(this.$playPauseBtn);
			return sMsg;
		}.bind(this);

		this.$audioPlayer.ontimeupdate = function(){
			sMsg = this.timer_song();
			if(!bDown){
				//bar start
				nxBar = this.$barIface.offsetLeft
				//bar width 
				nWidthBar = this.$barIface.offsetWidth;
				sMsg += '\n' + this.move_bar_player(this.$audioPlayer.currentTime * nWidthBar / this.$audioPlayer.duration);
			}
			//var aLi = this.$listPlayer.getElementsByTagName('ol')[0].childNodes;
			if(this.$audioPlayer.duration === this.$audioPlayer.currentTime){
				for(var i = 0; i < this.$aBtnPlayer.length; i++){
					if (this.$aBtnPlayer[i].id == 'next'){
						sMsg += '\n' + this.op_song(this.$aBtnPlayer[i]);
					}
				}
			}
			return sMsg

		}.bind(this)

		//bar element
		this.$barIface.onmousedown = function(e){
			
			/*if(document.getElementsByClassName('play').length == 0){
				this.op_song(this.$playPauseBtn);
			}*/
			bDown = true;
			oPosX = e.clientX;
			nWidthController = this.$controllerBar.offsetWidth;
			//bar width 
			nWidthBar = this.$barIface.offsetWidth;
			//bar start
			nxBar = this.$barIface.offsetLeft
			//bar end
			nEndBar = nxBar+nWidthBar;
			nPosController = (e.clientX-nxBar)-nWidthController/2;
			sMsg = this.move_bar_player(nPosController);
			return sMsg;	
		}.bind(this);

		document.onmouseup = function(e){
			if( bDown == true){
				
					//console.log(nPosController)
					this.$audioPlayer.currentTime = nPosController * this.$audioPlayer.duration / nWidthBar

				//this.op_song(this.$playPauseBtn);
				bDown = false;
				return 'mouseup!';
			}
		}.bind(this);

		document.onmousemove = function(e){
			if(bDown){
				if(oPosX != e.clientX){
					if(e.clientX <= nEndBar && e.clientX >= nxBar){
						nPosController = (e.clientX-nxBar)-nWidthController/2;
					}else if(e.clientX > nEndBar){
						nPosController = nWidthBar;
					}else if(e.clientX < nxBar){
						nPosController = 0;
					}
					sMsg = this.move_bar_player(nPosController);
					return sMsg;					
				}
			}
		}.bind(this);

		//functions down-move-up
		function down(){

		}

		function up(){
			
		}

		function move(){
			
		}
	}