$(document).ready(function() {
  /* Get name */
  var nameCookie = Cookies.get('name');

  if(nameCookie) {
    $('.user-modal').hide();
    $('#name, #name-input').val(nameCookie);
    $('.user').text(nameCookie);
    console.log(nameCookie);
  }
  else {
    $('.user-modal').show();
  }

  /* Set name */
  $('.btn--name-ok').on('click', function() {
    var nameValue = $('#name-input').val();

    if(nameValue != '') {
      Cookies.set('name', nameValue, { expires: 365 });
      $('#name').val(nameValue);
      $('.user').text(nameValue);
      $('.user-modal').hide();
    }
  });

  /* Change name */
  $('.user').on('click', function() {
    $('.user-modal').show();
  });

  /* Get location */
  var latitude = '';
  var longitude = '';
  function getLocation() {
    function success(position) {
      latitude  = position.coords.latitude;
      longitude = position.coords.longitude;

      $('#pos-lat').val(latitude);
      $('#pos-long').val(longitude);

      console.log(latitude, longitude);
    }

    function error() {
      alert('Kunde inte hitta din position 😭');
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  getLocation();

  /* Wrap title letters */
  /*$('h1').each(function() {
    var letters = $(this).text().split('');

    $(this).html(function() {
      return $.map(letters, function(letter, i) {
        return "<span class='letter'>"+letter+"</span>"
      });
    });

    $(this).find('.letter').each(function() {
      var letter = $(this).text();
      if(letter == " ") {
        $(this).addClass('letter--space');
      }
    });
  });*/

  /* Animate place */
  anime({
    targets: 'h1 .letter',
    translateY: [
      { value: [-10, 0], duration: 2000 }
    ],
    opacity: [
      { value: [0,1], duration: 800 }
    ],
    delay: function(el, i, l) {
      return i * 30;
    }
  });

  /* Change step */
  $('.btn--change').on('click', function() {
    $('.app__screen--current').removeClass('active');
    $('.app__screen--change').addClass('active');
    $('body').addClass('change-screen');

    getLocation();
  });
  $('.back').on('click', function() {
    $('.app__screen--current').addClass('active');
    $('.app__screen--change').removeClass('active');
    $('body').removeClass('change-screen');
  });

  /* Form */
  $('#place-standard').change(function() {
    console.log($(this).val());

    if($(this).val() == 'other') {
      $('#place-entry').show();
      $('#place-entry').val('');
      $('#comment').hide();
      $('.form-pos').hide();
    }
    else {
      $('#place-entry').hide();
      $('#place-entry').val($(this).find('option:selected').text());
      $('#comment').show();
      $('#submitForm').show();
      $('.form-pos').show();
    }
  });
  $('#place-entry').change(function() {
    if($(this).val() == '') {

    }
    else {
      $('#comment').show();
      $('#submitForm').show();
      $('.form-pos').show();
    }
  });
  $('#skipPos').change(function() {
    if($(this).is(':checked')) {
      getLocation();
    }
    else {
      $('#pos-lat').val('');
      $('#pos-long').val('');
    }
  });

  /* Debug form */
  function formDebug() {
    $('.app__screen--current').removeClass('active');
    $('.app__screen--change').addClass('active');
  }
  //formDebug();


  /* Send mail and go to result */
  var actionUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc47TVLKw8z2nHdRPLn_PVrKYwktElYZPlXd-8TV3MCs2E7-w/formResponse";
  console.log(actionUrl);

  $('#parking').submit(function(event) {
    event.preventDefault();

    var jqxhr = $.post( actionUrl, $( "#parking" ).serialize());

    jqxhr.always(function() {
      location.reload();
    });
  });
});
