import React, { useState } from "react";
import styles from "./Form.module.css";

const Form = ({ imageURL, addComment,name,userId,sort,handleSort }) => {
  const [inputText, setInputText] = useState("");
  const handleInputText = (e) => {
    setInputText(e.target.value);
  };


  const handleSubmit=(e)=>{
    e.preventDefault();
    if(inputText.trim().length>0){
      const newComment={
        id:Math.random()*1000000,
        name:name || "Rup",
        image:imageURL,
        text:inputText,
        likes:0,
        dislikes:0,
        time:Date.now(),
        replies:[],
        userId:"1234"
      }
      addComment(newComment);
      setInputText("");
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.imageContainer}>
        {imageURL && <img src={imageURL} className={styles.userPic} alt={name||"alternate"} loading="lazy" />}
      </div>
      <input
        maxLength={200}
        value={inputText}
        onChange={handleInputText}
        className={styles.input}
        type="text"
        placeholder="Join The Discussion..."
      />
      {sort && <button className={styles.button} onClick={handleSort}>sort by {sort}</button>}
    </form>
  );
};

export default Form;
