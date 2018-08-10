  $(function() {
    $('#stars').barrating({
      theme: 'fontawesome-stars'
    });
  });
  
  $(document).ready(function() {
    $('#content-slider').lightSlider({
        item: 3,
        loop:false,
        speed: 700,
        pager: true
    });
});


///anchor for links
$(document).ready(function(){
    $("ul").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top;
        $('body,html').animate({scrollTop: top}, 500);
    });
});
//responsive menu on phone
$(document).ready(function(){
  $('.main-nav-trigger').click(function(){
    $(this).next('.horizontal-nav').slideToggle()
  });
});

