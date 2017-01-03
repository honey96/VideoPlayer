window.addEventListener('load', function() {

	// Video Container
	video = document.getElementById('video');

	// Progress Bar Container
	pbarContainer = document.getElementById('pbar-container');
	pbar = document.getElementById('pbar');

	// Buttons Container
	playButton = document.getElementById('play-button');
	timeField  =  document.getElementById('time-field');
	soundButton = document.getElementById('sound-button');
	sbarContainer = document.getElementById('sbar-container');
	sbar = document.getElementById('sbar');
	fullscreen =document.getElementById('fullscreen-button');


	video.load();
	video.addEventListener('canplay', function() {

		playButton.addEventListener('click', playOrPause, false);
		pbarContainer.addEventListener('click', skip, false);
		updatePlayer();
		soundButton.addEventListener('click', soundcontrol ,false);
		sbarContainer.addEventListener('click', modifyvol , false);
		fullscreen.addEventListener('click',changescreen,false);

	}, false);

}, false);

function playOrPause() {
	if (video.paused) {
		video.play();
		playButton.src = 'images/pause.png';
		update = setInterval(updatePlayer, 30);
	} else {
		video.pause();
		playButton.src = 'images/play.png';
		window.clearInterval(update);
	}
}

function updatePlayer() {
	var percentage = (video.currentTime/video.duration)*100;
	pbar.style.width = percentage + '%';
	timeField.innerHTML =getFormattedTime();
	if (video.ended) {
		window.clearInterval(update);
		playButton.src = 'images/replay.png';
	}
}

function skip(ev) {
	var mouseX = ev.pageX - pbarContainer.offsetLeft;
	var width = window.getComputedStyle(pbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.currentTime = (mouseX/width)*video.duration;
	updatePlayer();
}

function getFormattedTime() {
	var seconds = Math.round(video.currentTime);
    var minutes = Math.floor(seconds/60);
	if(minutes > 0) seconds -= minutes*60;
	if(seconds.toString().length ===  1) seconds = '0' + seconds;

	var totalseconds = Math.round(video.duration);
    var totalminutes = Math.floor(totalseconds/60);
	if(totalminutes > 0)  totalseconds -= totalminutes*60;
	if(totalseconds.toString().length ===  1) totalseconds = '0' + totalseconds;
 	return minutes + ':' + seconds + ' / ' + totalminutes + ':' + totalseconds;
}

function soundcontrol() {
	if(!video.muted) {
		video.muted = true;
		soundButton.src = 'images/mute.png';
	} else {
		video.muted = false;
		soundButton.src = 'images/sound.png';
	}
}

function modifyvol(ev) {
	var mouseX = ev.pageX - sbarContainer.offsetLeft;
	var width = window.getComputedStyle(sbarContainer).getPropertyValue('width');
	width = parseFloat(width.substr(0, width.length - 2));

	video.volume = (mouseX/width);
	sbar.style.width = (mouseX/width)*100 + '%';
	video.muted = false;
	soundButton.src = 'images/sound.png';
	sbar.style.display = 'block';ss

}
function changescreen() {
	if (video.requestFullscreen) {
		video.requestFullscreen();
	} else if (video.webkitRequestFullscreen) {
		video.webkitRequestFullscreen();
	} else if (video.mozRequestFullscreen) {
		video.mozRequestFullscreen();
	} else if (video.msRequestFullscreen) {
		video.msRequestFullscreen();
	}
}