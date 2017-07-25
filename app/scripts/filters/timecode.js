(function() {
  function timecode() {

    return function(seconds) {
        var time = Number.parseFloat(seconds);  //163.38

        if (Number.isNaN(time)) {
            return '-:--';
          }

        var minutes = Math.floor(time / 60);  //2
        var secondss = Math.round((((time / 60) - minutes) * 0.6)*100+1) //43
        var output = minutes + ":" + secondss; //2:43

      return output;
    };

  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();
