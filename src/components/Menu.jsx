import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


 
  const Menu = ({ relatedPosts }) => {
 

   { /*const posts = [
      {
      id: 1,
      title: "React",
      desc: "React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript libraryfor building user interfaces based on components.",
      img: "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      title: "React",
      desc: "React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript libraryfor building user interfaces based on components.",
      img: "https://images.pexels.com/photos/160107/pexels-photo-160107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      title: "React",
      desc: "React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript libraryfor building user interfaces based on components.",
      img: "https://images.pexels.com/photos/14553730/pexels-photo-14553730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
     id: 4,
     title: "React",
      desc: "React (also known as React.js or ReactJS) is a free and open-source front-end JavaScript libraryfor building user interfaces based on components.",
      img: "https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
        ];*/}

        
  return (
    <div className='menu'>
        <h1>Other posts you may like</h1>
    {relatedPosts.map((post) => (
          <div className="post" key={post.id}>
          {post.imageURL && <img src={post.imageURL} alt={post.title} />}
          <h2>{post.title}</h2>
          <Link to={`/post/${post.id}`}>
            <button>Read More</button>
          </Link>
           
            </div>
         ))}
        </div>
  )
}

export default Menu