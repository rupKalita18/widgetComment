import React, { useState } from "react";
import styles from "./Comments.module.css";
import Form from "../form/Form";

//helperfunctions

function updateCommentText(comments, targetId, newText) {
  return comments.map((comment) => {
    if (comment.id === targetId) {
      return { ...comment, text: newText };
    }
    if (comment.replies) {
      return {
        ...comment,
        replies: updateCommentText(comment.replies, targetId, newText),
      };
    }
    return comment;
  });
}

function removeCommentAndReplies(comments, targetId) {
  return comments.filter((comment) => {
    if (comment.id === targetId) {
      return false; // Exclude the comment and its replies
    }
    if (comment.replies) {
      comment.replies = removeCommentAndReplies(comment.replies, targetId);
    }
    return true; // Include other comments
  });
}

function updateLikes(comments, targetId,str) {
  if(str==="likes"){
    return comments.map((comment) => {
      if (comment.id === targetId) {
        return { ...comment, likes: comment.likes + 1 };
      }
      if (comment.replies) {
        return { ...comment, replies: updateLikes(comment.replies, targetId,str) };
      }
      return comment;
    });
  }
  return comments.map((comment) => {
    if (comment.id === targetId) {
      return { ...comment, dislikes: comment.dislikes + 1 };
    }
    if (comment.replies) {
      return { ...comment, replies: updateLikes(comment.replies, targetId,str) };
    }
    return comment;
  });
}


const Comments = ({ 
  comment, 
  comments,
  setComments,
  usersImage,
  sort ,
  userId,
  parentName,
  userName
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying,setIsReplying]=useState(false);
  const [editedText,setEditedText]=useState("");

  const sortedReplies = [...(comment.replies || [])].sort((a, b) => {
    if(sort==="date"){
      return (b.time - a.time);
    }
    return b.likes-a.likes;
  });
  const handleEdit=()=>{
    setEditedText(comment.text);
    setIsEditing(true);
  }

  const handleLike=(str)=>{
    const updatedComments = updateLikes(comments, comment.id,str);
    setComments(updatedComments);
  }



  const handleDelete=(commentId)=>{
    const updatedComments = removeCommentAndReplies(comments, commentId);
    setComments(updatedComments);
  }


  const handleSave=()=>{
    if (editedText.trim() !== "") {
      const updatedComments = updateCommentText(
        comments,
        comment.id,
        editedText
      );
      setComments(updatedComments);
      setIsEditing(false);
    }
  }

  const addReply=(reply)=>{
    comment.replies=[...(comment.replies || []),reply];
    setComments([...comments]);
    setIsReplying(false);
  }

  const getTime=(timestamp)=>{
    const currentTime=new Date().getTime();
    const targetTime=new Date(timestamp).getTime();
    const timeDifference = currentTime - targetTime;
    const millisecondsInSecond = 1000;
    const millisecondsInMinute = millisecondsInSecond * 60;
    const millisecondsInHour = millisecondsInMinute * 60;
    const millisecondsInDay = millisecondsInHour * 24;
    const days=Math.floor(timeDifference/millisecondsInDay);
    const hour=Math.floor(timeDifference/millisecondsInHour);
    const minutes=Math.floor(timeDifference/millisecondsInMinute);
    const seconds=Math.floor(timeDifference/millisecondsInSecond);

    if(days>0){
      return `${days} ${days>1?"days":"day"} ago`;
    }
    if(hour>0){
      return `${hour} ${hour>1?"hours":"hour"} ago`
    }
    if(minutes>0){
      return `${minutes} ${minutes>1?"minutes":"minute"} ago`
    }

    return "";
    
  }


  return (
    <div className={styles.commentWrapper}>
      <div className={styles.container}>
        {comment?.image ? (
          <img
            src={comment.image}
            className={styles.image}
            alt={comment.name}
          />
        ) : (
          <div className={styles.alternativeBox}></div>
        )}
        <div>
          <div className={styles.widgets}>
            <p className={styles.user}>{userName}</p>
            <p className={styles.time}>{getTime(comment.time)}</p>
            {parentName && <p className={styles.parentName}>replied to {parentName}</p>}
          </div>
         {isEditing?(
          <div className={styles.editMode}>
              <input className={styles.input} value={editedText} onChange={(e)=>{setEditedText(e.target.value)}}/>
              <button onClick={handleSave} className={styles.save}>save</button>
          </div>
         ): (<div className={styles.commentText}>
            <p>{comment?.text}</p>
          </div>)}
        </div>
      </div>
      {!isEditing && <div className={styles.actionButtons}>
        <p onClick={()=>{handleLike("likes")}}>{comment?.likes} like</p>
        <p onClick={()=>{handleLike("dislikes")}}>{comment?.dislikes} dislike</p>
        <p onClick={()=>{setIsReplying(true)}}>reply</p>
        {userId===comment?.userId && <p onClick={()=>{handleDelete(comment.id)}}>delete</p>}
        {userId===comment?.userId && <p onClick={handleEdit}>edit</p>}
      </div>}
      {isReplying && <Form imageURL={usersImage}  addComment={addReply}  />}
      {
        comment.replies && (
          <div className={styles.replies}>
              {sortedReplies?.map((reply)=>(
                <Comments
                key={reply.id}
                comment={reply}
                comments={comments}
                setComments={setComments}
                usersImage={usersImage}
                userId={userId}
                parentName={comment.name}
                sort={sort}
                userName={userName}
              />
              ))}
          </div>
        )
      }
    </div>
  );
};

export default Comments;
