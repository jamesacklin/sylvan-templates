var header = $('header[role=banner]');
var navitems = $('.nav[role=navigation]').children('li').not('.home');
var button = $('<a href="#" class="button button-normal nav-toggle"><i class="fa fa-fw fa-bars"></i> Menu</a>');

$(document).ready(function(){
  button.appendTo(header);
  navitems.hide();
  $('.nav-toggle').on('click', function(){
    navitems.toggle();
    header.toggleClass('nav-open');
  });
});

