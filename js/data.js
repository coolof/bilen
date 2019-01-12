var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1KsAyHyZI6kZerJ5zWh-PS4NpPtsYKAAStz39nlAbZp4/pubhtml';

function init() {
  Tabletop.init( { key: publicSpreadsheetUrl,
                   callback: showInfo,
                   simpleSheet: true } )
}

function showInfo(data, tabletop) {
  console.log('Successfully processed!');

  var latest = data[data.length - 1];

  $('.car__place__name').text(latest.Var);

  //Add class for longer locations
  if (latest.Var.length > 10) {
    $('.car__place__name').addClass('long');
  }


  if(latest.Kommentar) {
    $('.car__place__comment').text(latest.Kommentar);
  }
  else {
    $('.car__place__comment').hide();
  }

  $('.car__data__date').text(latest.Timestamp);
  $('.car__data__user').text(latest.Vem);

  if(latest.Lat && latest.Long) {
    var mapsLink = "https://www.google.com/maps/search/?api=1&query=" + latest.Lat + "," + latest.Long;
    console.log(mapsLink);

    $('.car__place__name').wrap('<a href="' + mapsLink + '">');
  }

  console.log(latest.Var, latest.Kommentar, latest.Timestamp, latest.Vem, latest.Lat, latest.Long);

  $('.loading').fadeOut();
}

window.addEventListener('DOMContentLoaded', init);
