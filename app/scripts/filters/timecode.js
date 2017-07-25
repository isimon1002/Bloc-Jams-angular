(function() {
  function timecode() {

    return function(seconds) {
        var time = Number.parseFloat(seconds);  //163.38

        if (Number.isNaN(time)) {
            return '-:--';
          }

        var output = buzz.toTimer(time); //2:43

        return output;
     };
  }

  angular
    .module('blocJams')
    .filter('timecode', timecode);
})();
