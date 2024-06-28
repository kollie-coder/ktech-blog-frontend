import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { firestore } from '../firebase/firebase';

const useGetAllPosts = (category) => { // Accept category as a parameter
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            setIsLoading(true);
            try {
           const postsCollection = collection(firestore, 'posts');
           let postsQuery = postsCollection;

            if (category) {
            postsQuery = query(postsCollection, where('cat', '==', category));
            }

           const postsSnapshot = await getDocs(postsQuery);
           const postsList = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
           setPosts(postsList);
           console.log(posts)
        } catch (error) {
           setError(error) 
        } finally {
            setIsLoading(false);
           }
        };
        
        fetchPosts();
    }, [category]);

  return { posts, isLoading, error }
}

export default useGetAllPosts