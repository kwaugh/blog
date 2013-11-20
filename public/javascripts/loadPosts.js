function load(){
  $.getJSON('/json/morePosts', function(data){
    //alert('success' + data);
    $('body')
      .append($('<div></div>')
        .addClass('post')
        .append($('<div></div>')
          .addClass('post-heading')
          .append($('<div></div>')
            .addClass('post-title')
            .append('<a href=/' + data[0].id + '>' + data[0].subject + ' - ' + data[0].name + '</a>'))
          .append($('<div></div>')
            .addClass('post-date')
            .append(data[0].date)))
        .append($('<div></div>')
          .addClass('post-content')
          .append($('<pre></pre>')
            .append(data[0].content)))
      )
  });
}