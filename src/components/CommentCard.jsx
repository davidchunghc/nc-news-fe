const CommentCard = ({ comment }) => {
  return (
    <div className="comment-card">
      <h5>{comment.author} </h5>
      <p>{comment.body}</p>
      <p>Votes: {comment.votes}</p>
    </div>
  );
};

export default CommentCard;
