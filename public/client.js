document.addEventListener("DOMContentLoaded", function() {
  // get canvas element and create context
  var board  = document.getElementById('board');
  //  var context = canvas.getContext('2d');
  var width   = window.innerWidth;
  var height  = window.innerHeight;
  var socket  = io.connect();

  $("#board form").submit(function(e){
    e.preventDefault();
    var postit = {
      text: $("#input-text").val(),
      title:$("#input-title").val()
    }

    socket.emit('create_postit', {
                                  postit: postit
                                  }
                  );
  })

  $("button.edit").click(function(e){
    
    console.log("button")
  })
  // draw line received from server
  socket.on('create_postit', function (data) {
    var postit = data.postit;
    var html = "<li><a><h2>"+ postit.title +"</h2><p>" +postit.text+"</p></a></li><button class='edit'>Edit</button>"
    $('#board').append(html)
  });



    });
