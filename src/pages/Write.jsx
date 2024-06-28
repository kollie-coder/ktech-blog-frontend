import axios from "axios";
import React, { useContext, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { PostContext } from "../context/PostContext";
import useCreatePost from "../hooks/useCreatePost";


const Write = () => {
  const { post, updatePost, clearPost, isLoading, setIsLoading } = useContext(PostContext);
  const { handleCreatePost } = useCreatePost();
  const navigate = useNavigate();

  const handlePostCreation = async () => {
    setIsLoading(true);
    try {
      await handleCreatePost(post.title, post.desc, post.cat, post.selectedFile);
      clearPost();
      alert("Post Created Successfully");
      navigate("/");
    } catch (error) {
      alert(error.message)
    } finally {
      setIsLoading(false);
    }
  };
 
 
  return (
    <div className='add'>
      <div className="content">
        <input type='text' value={post.title} placeholder='Title' onChange={e => updatePost("title", e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className='editor' theme='snow' value={post.desc} onChange={value => updatePost("desc", value)} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status: </b> Draft
          </span>
          <span>
            <b>Visibility: </b> Public
          </span>
          <input style={{ display: "none" }} type='file' id='file' onChange={e => updatePost("selectedFile", e.target.files[0])} />
          <label className="file" htmlFor='file'>Upload Image</label>
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handlePostCreation} disabled={isLoading}>
              {isLoading ? "Publishing..." : "Publish"}
            </button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          {["art", "science", "technology", "cinema", "design", "food"].map((cat) => (
            <div className="cat" key={cat}>
              <input
                type='radio'
                checked={post.cat === cat}
                name='cat'
                value={cat}
                id={cat}
                onChange={e => updatePost("cat", e.target.value)}
              />
              <label htmlFor={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Write