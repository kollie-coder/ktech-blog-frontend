import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Menu from "../components/Menu";
import { format } from "timeago.js";
import { collection, doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { firestore } from "../firebase/firebase";



const Single = () => {
  
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  }

  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postRef = doc(firestore, 'posts', id);
        const postSnap = await getDoc(postRef);
        if (postSnap.exists()) {
          const postData = { id: postSnap.id, ...postSnap.data() };
          setPost(postData);
          
          // Fetch user data based on createdBy field
          const userRef = doc(firestore, "users", postData.createdBy);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            setUser(userSnap.data());
          } else {
            throw new Error("User not found");
          }

          // Fetch related posts
          const relatedPostsQuery = query(
            collection(firestore, "posts"),
            where("cat", "==", postData.cat),
            limit(3)
          );
          const relatedPostsSnap = await getDocs(relatedPostsQuery);
          const relatedPostsData = relatedPostsSnap.docs
                  .filter(doc => doc.id !== id )
                  .map(doc => ({ id: doc.id, ...doc.data() }));
                  setRelatedPosts(relatedPostsData);

        } else {
          throw new Error('Post not found');
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!post) {
    return <p>No post found</p>;
  }


  return (
    <div className="single">
      <div className="content">

        {post.imageURL && <img src={post.imageURL} alt={post.title} />}
       
        <div className="user">
          {/*post.userImg &&*/ } 
          <img
            src="https://images.pexels.com/photos/7008010/pexels-photo-7008010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt=""
          />
          <div className="info">
            <span> { user ? user.username : 'Unknown user'} </span>
            <p>Posted {format(post.createdAt)} </p>
          </div>
          
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} >
                <img src={Edit} alt="" />
              </Link>
              <img src={Delete} alt="" />
            </div>
        </div>
        <h1> {post.title} </h1>
        <p> {getText(post.desc)} </p>
        </div>
        {/* other posts may like */}
      <Menu relatedPosts={relatedPosts} />
    
    </div>
  );
};

export default Single;