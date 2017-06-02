$(document).ready(function() {
  $("#scrape-btn").on("click", function() {
    $('.modal').modal();
    $.post('/api/scrape', {}, function (result) {
      console.log("Got result back")
      console.log(result)
      $("#modal-header").text("Finished scraping")
      $("#modal-contents").text("Found " + result.nUpserted + " new articles")
      $("#modal-progress-bar").remove()
      $("#go-to-saved-btn").removeClass("disabled")
      $("#go-to-saved-btn").addClass("modal-action modal-close waves-effect waves-green")
    })
  })
})
