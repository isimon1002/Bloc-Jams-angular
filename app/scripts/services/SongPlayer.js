(function () {

   /**
   * @function SongPlayer
   * @desc Runs the music operations including stopping and starting songs
   * @returns {Object}
   */
    function SongPlayer() {

       /**
       * @desc Object that contains all the information about the song that is being played and whether or not the song is playing
       * @type {Object}
       */
        var SongPlayer = {};


        /**
        * @desc Object that holds the current song that is being played
        * @type {Object}
        */
        var currentSong = null;

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
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
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
        * @function SongPlayer.play
        * @desc Checks if the current song is the one being requested, if no, sets the current song as the one being requested and plays it, if yes plays the requested song.
        * @param {Object} song
        */
        SongPlayer.play = function(song) {
            if(currentSong !== song) {
                setSong(song);
                playSong(song);
           }
           else if (currentSong === song) {
               if (currentBuzzObject.isPaused()) {
                  playSong(song);
               }
           }
      };

      /**
      * @function SongPlayer.pause
      * @desc Pauses currently playing song and and stops the song from playing
      * @param {Object} song
      */
      SongPlayer.pause = function(song) {
          currentBuzzObject.pause();
          song.playing = false;
        }

      return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();
