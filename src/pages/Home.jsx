import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate } from "react-router-dom";
import useGetAllPosts from "../hooks/useGetAllPosts";

const Home = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('cat'); // Extract category from URL

  const { posts, isLoading, error } = useGetAllPosts(category); // Pass category to the hook

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  };

  const handleReadMore = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div className='home'>
      <div className='posts'>
        {posts.map((post) => (
          <div className='post' key={post.id}>
            <div className='img'>
              <img src={post.imageURL} alt='' />
            </div>
            <div className='content'>
              <Link className='link' to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p>{getText(post.desc)}</p>
              <button onClick={() => handleReadMore(post.id)}>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home