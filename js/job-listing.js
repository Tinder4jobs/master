/*Get the JSON data & display it on the index page*/
$.getJSON('http://35.231.77.246/matches/qwe', function(data) {
  var MatchesData = "";
  var i;

  for (i = 0; i < data.length; i++) {
    MatchesData += '<div class="row" data-id="'+ data[i].id +'">';
    MatchesData += '<div class="col-md-7">';
    MatchesData += '<a href="#">';
    MatchesData += '<img src="'+ data[i].image +'" alt="'+ data[i].username+'" width="100%" height="auto"></div>';
    MatchesData += '<h3>'+ data[i].username +'</h3>';
    MatchesData += '<p>'+ data[i].description +'</p>';
    MatchesData += '<p>'+ data[i].location +'</p>';
    MatchesData += '<p>105%</p></a>';
    MatchesData += '</div>';

  }
  $('.container').append(MatchesData);

});
