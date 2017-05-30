$(document).ready(function() {
  $(".comment-sub-btn").on("click", function(event) {
    event.preventDefault()
    const articleId = $(this).attr("id").split("commentButton")[1]
    const textFieldId = "#commentField" + articleId
    const commentText = $(textFieldId).val()
    console.log(commentText)
  })
})
