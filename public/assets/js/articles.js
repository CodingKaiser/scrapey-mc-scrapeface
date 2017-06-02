$(document).ready(function() {
  $(".comment-sub-btn").on("click", function(event) {
    event.preventDefault()
    var submittedComment = {}
    const articleId = $(this).attr("id").split("commentButton")[1]
    const textFieldId = "#commentField" + articleId
    const commentText = $(textFieldId).val()
    console.log(commentText)
    submittedComment['_article'] = articleId
    submittedComment['contents'] = commentText
    $.post('/api/comment', submittedComment, function (response) {
      console.log(response)
      location.reload()
    })
  })

  $(".del-comment-btn").on("click", function(event) {
    event.preventDefault()
    const commentId = $(this).attr("data-comment-id")
    console.log(commentId)
    var commentToDel = { commentId: commentId }
    $.ajax({
      url: '/api/comment',
      type: 'DELETE',
      data: commentToDel
    }).then(function(response) {
      console.log(response)
      location.reload()
    })
  })
})
