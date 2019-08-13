function load(){
  $.getJSON('/json/morePosts', function(data){
    if(data.error === 'There are no more posts'){
      $('#loadMorePosts').before('<div class="error">There are no more posts</div>');
      $('#loadMorePosts').remove();
    }
    else{
      for(var i = 0; i < data.length; i++){
        $('#loadMorePosts')
          .before($('<div class="post"></div>')
            .append($('<div class="post-heading"></div>')
              .append($('<div class="post-title"></div>')
                .append('<a href=/' + data[i]._id + '>' + data[i].subject + ' - ' + data[i].name + '</a>'))
              .append($('<div class="post-date"></div>')
                .append(data[i].date)))
            .append($('<div class="post-content"></div>')
              .append($('<pre></pre>')
                .append(data[i].content)))
          );
      }
    }
  });
}
