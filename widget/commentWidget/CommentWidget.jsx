import React, { useEffect, useState } from "react";
import styles from "./CommentWidget.module.css";
import Form from "../form/Form";
import Comments from "../comments/Comments";

const CommentWidget = () => {
  const [comments, setComments] = useState([]);
  const [sort, setSort] = useState("date");
  const [sortedComments, setSortedComments] = useState([]);
  const [user,setUser]=useState({
    usersImage:"https://randomuser.me/api/portraits/men/25.jpg",
    userId:"1234",
    userName:"Rup",

  })

  const handleSort = () => {
    if (sort === "date") {
      setSort("likes");
      return;
    }
    setSort("date");
  };

  const addComment = (newComment) => {
    let newCommentList = [...comments, newComment];
    setComments(newCommentList);
  };

  useEffect(() => {
    let sorted = [...comments];
    if (sort=== 'date') {
      sorted = sorted.sort((a, b) => b.time - a.time);
    } else if (sort === 'likes') {
      sorted = sorted.sort((a, b) => b.likes - a.likes);
    }
    setSortedComments(sorted);
    if(comments?.length>0){
        localStorage.setItem('comments',JSON.stringify(comments));
    }   
  }, [comments, sort]);


  useEffect(()=>{
    let data=localStorage.getItem('comments');
    // let user=localStorage.getItem('user');
    if(data && data.length>0){
        data=JSON.parse(data);
        setComments(data);
    }
    // if(user){
    //     user=JSON.parse(user);
    //     setUser(user);
    // }

  },[])

  return (
    <div className={styles.commentWidget}>
      <Form
        name="Rup"
        addComment={addComment}
        imageURL={user.usersImage}
        handleSort={handleSort}
        sort={sort}
        userName={user.userName}
      />

      {sortedComments?.map((item) => (
        <div key={item.id} style={{ marginTop: "40px" }}>
          <Comments
            comments={sortedComments}
            comment={item}
            setComments={setComments}
            usersImage={user.usersImage}
            userId={user.userId}
            sort={sort}
            userName={user.userName}
          />
        </div>
      ))}
    </div>
  );
};

export default CommentWidget;
