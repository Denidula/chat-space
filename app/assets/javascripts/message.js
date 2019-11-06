$(document).on('turbolinks:load', function(){


  $(function(){


    function buildMessage(message){

      var content = message.content ? `${message.content}` : "";
      var image = message.image ? `<img src = ${message.image}>` : "";
      
      
        var html = `<div class="message" data-id='${message.id}'>
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
                      ${image}
                    </p>
                    </div>
                  </div>`;
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
        $('.messages').append(html)
        $("form")[0].reset();
  
        $(function() {
          var target = $('.message').last();
          var position = target.offset().top + $('.messages').scrollTop();
          $('.messages').animate({
            scrollTop: position
          }, 300, 'swing');
        })
      })
      .fail(function(data){
        alert('エラーです。');
      })
      .always(function(data){
        $('.form__submit').prop('disabled', false);
      })
  
    })
    
    
    if (document.URL.match("/messages")) {
      setInterval(reloadMessages, 5000);
    }

    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      
      var last_message_id = $('.message:last').data('id');
      

      $.ajax({
        //ルーティングで設定した通り/groups/id番号/api/messagesとなるよう文字列を書く
        url: "api/messages",
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'GET',
        dataType: 'json',
        //dataオプションでリクエストに値を含める
        data: {id: last_message_id}
      })
      .done(function(messages) {
        

          messages.forEach(function(message){
            insertHTML = buildMessage(message);
            $('.messages').append(insertHTML);
            $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
          });

          
      })
      .fail(function() {
        alert('error');
      });

    };

    

  });
  

});

