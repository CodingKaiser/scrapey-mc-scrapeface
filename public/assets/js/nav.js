$(document).ready(function() {
  $(".comment-sub-btn").on("click", function(event) {
    event.preventDefault()
    const articleId = $(this).attr("id").split("commentButton")[1]
    const textFieldId = "#commentField" + articleId
    const commentText = $(textFieldId).val()
    console.log(commentText)
  })

  $("#scrape-btn").on("click", function() {
    $('.modal').modal();
    $.post('/api/scrape', {}, function (result) {
      console.log("Got result back")
      console.log(result)
      $("#modal-header").text("Finished scraping")
      $("#modal-contents").text("Found " + result.nInserted + " new articles")
      $("#modal-progress-bar").remove()
      $("#go-to-saved-btn").removeClass("disabled")
      $("#go-to-saved-btn").addClass("modal-action modal-close waves-effect waves-green")
    })
  })
})
