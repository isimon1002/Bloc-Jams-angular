(function () {

   /**
   * @function SongPlayer
   * @desc Runs the music operations including stopping and starting songs
   * @param {Object} Fixtures
   * @returns {Object}
   */
    function SongPlayer($rootScope, Fixtures) {

       /**
       * @desc Object that contains all the information about the song that is being played and whether or not the song is playing
       * @type {Object}
       */
        var SongPlayer = {};

        /**
        * @desc Object that contains the currentAlbum
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                  });
            });

            currentBuzzObject.bind('ended', function() {
                SongPlayer.next();
                  });

            SongPlayer.currentSong = song;
        };

        /**
        * @function playSong
        * @desc Starts playing songs
        * @param {Object} song
        */

        var playSong = function (song) {
            currentBuzzObject.play();
            song.playing = true
        };

        /**
        * @function stopSong
        * @desc Starts playing songs
        * @param {Object} song
        */
        var stopSong = function (song) {
            currentBuzzObject.stop();
            song.playing = null;
        }

        /**
        * @function getSongIndex
        * @desc Gets the index of song
        * @param {Object} song
        */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
          };

        /**
        * @desc Active song object from list of songs
        * @type {Object}
        */
        SongPlayer.currentSong = null;

        /**
        * @desc Current playback time (in seconds) of currently playing song
        * @type {Number}
        */
        SongPlayer.currentTime = null;

        /**
        * @desc Current volume.
        * @type {Number}
        */
        SongPlayer.volume = 80;

        /**
        * @function setVolume
        * @desc Sets the volume to allow the volume to change
        * @param {Object} number
        */
        SongPlayer.setVolume = function (newVolume) {
            if(currentBuzzObject) {
                currentBuzzObject.setVolume(newVolume);
            }
            this.max = 100;
        };

        /**
        * @function play
        * @desc Play current or new song
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if(SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
           }
           else if (SongPlayer.currentSong === song) {
               if (currentBuzzObject.isPaused()) {
                  playSong(song);
               }
           }
      };

      /**
      * @function pause
      * @desc Pauses currently playing song
      * @param {Object} song
      */
      SongPlayer.pause = function(song) {
          song =song || SongPlayer.currentSong;
          currentBuzzObject.pause();
          song.playing = false;
        }

      /**
      * @function previous
      * @desc switches the song being played to the previous song
      */
      SongPlayer.previous = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex--;

          if (currentSongIndex < 0) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
            }
          else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
        };

      /**
      * @function next
      * @desc switches the song being played to the next song
      */
      SongPlayer.next = function() {
          var currentSongIndex = getSongIndex(SongPlayer.currentSong);
          currentSongIndex++;
          if (currentSongIndex >= currentAlbum.songs.length) {
              currentBuzzObject.stop();
              SongPlayer.currentSong.playing = null;
              }
          else {
              var song = currentAlbum.songs[currentSongIndex];
              setSong(song);
              playSong(song);
            }
        };

      /**
      * @function setCurrentTime
      * @desc Set current time (in seconds) of currently playing song
      * @param {Number} time
      */
      SongPlayer.setCurrentTime = function(time) {
          if (currentBuzzObject) {
              currentBuzzObject.setTime(time);
            }
        };

      return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();
