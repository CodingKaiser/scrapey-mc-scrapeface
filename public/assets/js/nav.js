$(document).ready(function() {
  $("#scrape-btn").on("click", function() {
    $.post('/api/scrape', {}, function (result) {
      console.log("Got result back")
    })
  })
})
