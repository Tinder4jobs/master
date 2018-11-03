(function(){
  http://localhost:5000/response/qwe -XPOST -d '{"id": 1, "response": true, "relevance": 0.3}'

  /*Get the JSON data & display it on the index page*/
  $.getJSON('http://35.231.77.246/question/test', function(data) {
    var CardData = "";
    var i;

    for (i = 0; i < data.length; i++) {
      CardData += '<li class="card">';
      CardData += '<h3>'+ data[i].text +'</h3>';
      CardData += '<img src="'+ data[i].image +'" alt="">';
      CardData += '</li>';
    }
    $('.cardlist').append(CardData);

    $('.cardlist li:first-child').addClass('current');
  });


  /*Post the JSON datae*/
  $.ajax({
    type: 'POST',
    url: 'http://localhost:5000/response/qwe',
    data: '{"id": 1, "response": true, "relevance": 0.3}', // or JSON.stringify ({name: 'jonas'}),
    success: function(data) { alert('data: ' + data); },
    contentType: "application/json",
    dataType: 'json'
  });


  var animating = false;

  function animatecard(ev) {
    if (animating === false) {
      var t = ev.target;
      if (t.className === 'but-nope') {
        t.parentNode.classList.add('nope');
        animating = true;
        fireCustomEvent('nopecard',
          {
            origin: t,
            container: t.parentNode,
            card: t.parentNode.querySelector('.card')
          }
        );
      }
      if (t.className === 'but-yay') {
        t.parentNode.classList.add('yes');
        animating = true;
        fireCustomEvent('yepcard',
          {
            origin: t,
            container: t.parentNode,
            card: t.parentNode.querySelector('.card')
          }
        );
      }
      if (t.classList.contains('current')) {
        fireCustomEvent('cardchosen',
          {
            container: getContainer(t),
            card: t
          }
        );
      }
    }
  }

  function fireCustomEvent(name, payload) {
    var newevent = new CustomEvent(name, {
      detail: payload
    });
    document.body.dispatchEvent(newevent);
  }

  function getContainer(elm) {
    var origin = elm.parentNode;
    if (!origin.classList.contains('cardcontainer')){
      origin = origin.parentNode;
    }
    return origin;
  }

  function animationdone(ev) {
    animating = false;
    var origin = getContainer(ev.target);
    if (ev.animationName === 'yay') {
      origin.classList.remove('yes');
    }
    if (ev.animationName === 'nope') {
      origin.classList.remove('nope');
    }
    if (origin.classList.contains('list')) {
      if (ev.animationName === 'nope' ||
          ev.animationName === 'yay') {
        origin.querySelector('.current').remove();
        if (!origin.querySelector('.card')) {
          fireCustomEvent('deckempty', {
            origin: origin.querySelector('button'),
            container: origin,
            card: null
          });
        } else {
          origin.querySelector('.card').classList.add('current');
        }
      }
    }
  }
  document.body.addEventListener('animationend', animationdone);
  document.body.addEventListener('webkitAnimationEnd', animationdone);
  document.body.addEventListener('click', animatecard);
  window.addEventListener('DOMContentLoaded', function(){
    document.body.classList.add('tinderesque');
  });
})();
