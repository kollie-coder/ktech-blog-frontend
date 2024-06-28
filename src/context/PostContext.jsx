import React, { createContext, useState } from 'react'

export const PostContext = createContext();

export const PostProvider = ({children}) => {
    const [post, setPost] = useState({
        title: "",
        desc: "",
        cat: "",
        selectedFile: null,
        imageURL: ""
      });

      const [isLoading, setIsLoading] = useState(false);

      const updatePost = (key, value) => {
        setPost((prevPost) => ({ ...prevPost, [key]: value }));
      };
    
      const clearPost = () => {
        setPost({
          title: "",
          desc: "",
          cat: "",
          selectedFile: null,
          imageURL: ""
        });
      };

      return (
        <PostContext.Provider value={{ post, updatePost, clearPost, isLoading, setIsLoading }}>
      {children}
    </PostContext.Provider>
      );

};