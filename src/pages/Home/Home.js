// CSS
import styles from './Home.module.css'
import { HiSearch } from "react-icons/hi";

// hooks
import { useNavigate, Link } from 'react-router-dom';
import { useState } from "react";
import { useFetchDocuments } from '../../hooks/useFetchDocuments';


// components
import PostDetails from '../../components/PostDetails';

const Home = () => {
  const [query, setQuery] = useState('');
  const {documents: posts, loading} = useFetchDocuments('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if(query) {
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <div className={styles.home}>
      <h1>Picks recentes</h1>
      <form onSubmit={handleSubmit} className={styles.serch_form}>
        <input 
          type="text"  
          placeholder='Busque por tags de seu interesse...' 
          onChange={(e) => setQuery(e.target.value)}
        />
        <div>
        <button className={styles.search_btn}><HiSearch/></button>
        </div>
      </form>
      
      <div>
        {loading && <p>Carregando...</p> }
        {posts && posts.map((post)=> <PostDetails key={post.id} post={post} />
        )}
        {posts && posts.length === 0 && (
          <div className={styles.nopost}>
            <p>Nenhum pick encontrado 😥</p>
            <Link to='/posts/create' className={styles.btn}>Criar primeiro post</Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home