(function($) {
  $(function() {
    $('.sidenav').sidenav();
  }); // end of document ready
})(jQuery); // end of jQuery name space

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.modal');
  var instances = M.Modal.init(elems);
});

// Or with jQuery

$(document).ready(function() {
  $('.modal').modal();
});
