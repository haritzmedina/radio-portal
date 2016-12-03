(function(){

    function addEventListener(listenButton){
        listenButton.addEventListener("click", function(event){
            // Get clicked radio
            var radioUri = event.toElement.dataset.radioUri;
            // Get player
            var player = document.getElementById('audioPlayer');
            // Set new radio to the player
            player.innerHTML = "<source id='sourcePL' src='"+radioUri+"' type='audio/mpeg'/>";
            player.dataset.station = event.toElement.innerText;
            // Reload and play
            player.load();
            playPlayer();
            // Set to select current radio
            selectRadio(event.toElement);
        });
    }

    function setControlsListeners(){
        var playPauseButton = document.getElementById('player-play-pause');
        playPauseButton.addEventListener('click', function(){
            var player = document.getElementById('audioPlayer');
            if(player.paused){
                playPlayer();
            }
            else{
                pausePlayer();
            }
        });
    }

    function selectRadio(elem){
        deselectRadios();
        elem.dataset.selected = "true";
    }

    function deselectRadios(){
        var listenButtons = document.getElementsByClassName("listenRadio");
        for(i=0; i< listenButtons.length; i++){
            listenButtons[i].dataset.selected = "false";
        }
    }

    function pausePlayer(){
        var player = document.getElementById('audioPlayer');
        if(player.firstChild.nodeName==='SOURCE'){
            player.pause();
            // Change control icon
            var playPauseButton = document.getElementById('player-play-pause');
            playPauseButton.innerHTML = '<img src="img/play.png"/>';
        }
    }

    function playPlayer(){
        var player = document.getElementById('audioPlayer');
        if(player.firstChild.nodeName==='SOURCE'){
            player.play();
            // Change control icon
            var playPauseButton = document.getElementById('player-play-pause');
            playPauseButton.innerHTML = '<img src="img/pause.png"/>';
        }
    }


    var listenButtons = document.getElementsByClassName("listenRadio");
    var i = 0;
    for(i=0; i<listenButtons.length; i++){
        addEventListener(listenButtons[i]);
    }

    setControlsListeners();

    function updateSongMetadata(){
        var stationName = document.getElementById('audioPlayer').dataset.station;
        if(typeof stationName==='string'){
            console.log('Retrieving metadata from '+stationName);
            $.getJSON('metadata.php?name='+stationName, function(result){
                // Set song title
                document.getElementById('songtitle').innerText = result.metadata.title;
                // Update youtube link
                document.getElementById('youtubeLink').href =
                    'https://www.youtube.com/results?search_query='+result.metadata.title;
            });
        }
    }

    setInterval(updateSongMetadata, 3000);

})();