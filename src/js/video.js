function VideoGallery(oVideo, mainElement){
	this.oVideo = oVideo;
	this.$mainElement = mainElement;
	this.aIframeYoutube = [];
	this.aDivContainer = [];
	this.sYoutubeUrl = 'https://www.youtube.com/embed/'
	this.sIfaceView = '<div class="iframeContainer"><iframe class="iframeYoutube" width="100%;" height="" src="" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe><p class="videoMeta" id="pTitle"></p><p class="videoMeta" id="pDate"></p></div>'

	VideoGallery.prototype.get_video = function(){
		var sIframe = '';
		var sCode = '';
		var sAuthor = '';
		for(var i = 0; i < this.oVideo.aData.length; i++){
			this.$mainElement.innerHTML += this.sIfaceView;
			console.log(this.oVideo.aData[i]);
		}

		this.aIframeYoutube = document.getElementsByClassName('iframeYoutube');
		for(var i = 0; i < this.aIframeYoutube.length; i++){
			sCode = this.oVideo.aData[i].sUrl.split('=')[1]+'?enablejsapi=1';
			this.aIframeYoutube[i].src = this.sYoutubeUrl+sCode;
		}

		this.aDivContainer = document.getElementsByClassName('iframeContainer');
		for(var i = 0; i < this.aDivContainer.length; i++){
			for(var j = 0; j < this.oVideo.aData[i].aAuthor.length; j++){
				console.log(this.oVideo.aData[i].aAuthor[j])
			}
			console.log(this.oVideo.aData[i])
			this.aDivContainer[i].childNodes[1].innerHTML = this.oVideo.aData[i].sTitle;
			this.aDivContainer[i].childNodes[2].innerHTML = this.oVideo.aData[i].sDate;

			//this.aIframeContainer[i].innerHTML += this.oVideo.aData[i];
		}
	}

	VideoGallery.prototype.stop_video = function(){
		for(var i = 0; i < this.aIframeYoutube.length; i++){
			console.log(this.aIframeYoutube[i].PlayerState)
			this.aIframeYoutube[i].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
		}	
	}

}

