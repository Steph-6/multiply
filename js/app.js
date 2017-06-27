window.onload = init;

function init() {
  const error        = 'Required Field';
  const errorImage   = '<img src="./css/images/alert.png" width="25em" alt="alert">';
  const options      = {
    bounds: new google.maps.LatLngBounds(new google.maps.LatLng(51.506692,-0.143377))
  };
  const autocomplete = new google.maps.places.Autocomplete(document.getElementById('location'), options);

  for (let i = 0; i < $('.input').length; i++) {
    $('.input').css('display', 'none');
    $('#line1').css('display', 'block');
  }

  $('.input').on('click', function() {

    if (this.getAttribute('id') !== 'line1' && $('.name')[0].value !== '') {
      setName();
    }

    if ($(this).hasClass('select-rent')) {
      selectRentRoute();
    }
    if ($(this).hasClass('select-employment')) {
      selectEmploymentRoute();
    }

    $(this).next('.input').fadeIn(4000, function() {
      console.log(this, 'next field');
      const $inputDiv = $(this).prevAll('.input');
      checkFields($inputDiv);
    });
  });

  function setName() {
    const $name = $('.name')[0].value;
    if ($name.length > 5) {
      $('.title').css('font-size', '3em');
      $('.title')[0].innerHTML = `About ${$name}`;
    } else {
      $('.title')[0].innerHTML = `About ${$name}`;
    }
  }

  // ***** halfway through selection of route based on answer *****

  function selectRentRoute() {
    // to fix - all rent fields and the next input show
    //        - each value can only be selected once
    if ($('#home')[0].value !== 'rent') {
      $('.rent').removeClass('input');
      $('.rent').fadeOut(2000);
    }
    if ($('#home')[0].value === 'rent') {
      $('.rent').addClass('input').fadeIn(4000);
    }
    $('.rent').next('.input').fadeIn(4000);
  }

  function selectEmploymentRoute() {
    if ($('#employment')[0].value !== 'employed') {
      $('.employment').removeClass('input');
      $('.employment').fadeOut(2000);
    }
    if ($('#employment')[0].value === 'employed') {
      $('.employment').addClass('input').fadeIn(4000);
    }
    $('.employment').next('.input').fadeIn(4000);
  }

  // *********** halfway through validation of fields ***********

  function checkFields(prevDivs) {
    const $prevFields = prevDivs.find('input');
    prevDivs.find('span').innerHTML = '';
    for (let i = 0; i < $prevFields.length; i++) {
      if (!$prevFields[i].value) {
        console.log($prevFields[i], 'is empty');
        prevDivs[i].lastElementChild.innerHTML = `${error}${errorImage}`;
      }
    }
  }

  // *************************************************************

  $('.disable').click(function(e) {
    e.preventDefault();
  });

  $('#submit').click(function() {
    // check all fields to see if empty
    // alert please fill in required fields
    console.log('submitted');
  });
}

// Formatting:
// $(':input[type="number"]')
// if the field was type number then format tolocalestring with £ before if charAt[0] !== £ || $ || €
// if field was a number return £ + the value into the field
