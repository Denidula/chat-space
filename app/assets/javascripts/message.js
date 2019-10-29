$(document).on('turbolinks:load', function(){

  $(function(){
    function buildMessage(message){
      var content = message.content ? `${message.content}` : "";
      var img = message.image ? `<img src = ${message.image}>` : "";
      var html = `<div class="message">
                    <div class="upper-message">
                    <div class="upper-message__user-name">
                      ${message.user_name}
                    </div>
                    <div class="upper-message__date">
                      ${message.date}
                    </div>
                    </div>
                    <div class="lower-message">
                    <p class="lower-message__content">
                      <div>
                      ${content}
                      </div>
                      ${img}
                    </p>
      
                    </div>
                  </div>`
      return html;
    }
  
    $('#new_message').on('submit', function(e){
      e.preventDefault();
      var message = new FormData(this);
      var url = $(this).attr('action');
      $.ajax({
        url: url,
        type: "POST",
        data: message,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildMessage(data);
        $('.right-main').append(html)
        $("form")[0].reset();
  
        $(function() {
          var target = $('.message').last();
          var position = target.offset().top + $('.right-main').scrollTop();
          $('.right-main').animate({
            scrollTop: position
          }, 300, 'swing');
        })
      })
      .fail(function(data){
        alert('エラーでございま〜す。');
      })
      .always(function(data){
        $('.form__submit').prop('disabled', false);
      })
  
    })
  });
  
});

