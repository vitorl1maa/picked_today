import styles from "./Search.module.css";

// hooks
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery";

// components
import PostDetails from "../../components/PostDetails";
import { Link } from "react-router-dom";

const Search = () => {
  const query = useQuery();
  const search = query.get("q");

  const { documents: posts } = useFetchDocuments("posts", search);

  return (
    <div className={styles.search_container}>
      <h1>Resultados encontrados para: {search}</h1>
      <div className="post-list">
        {posts && posts.length === 0 && (
          <>
            <p>Não foram encontrados picks a partir de sua busca😥...</p>
            <div className={styles.back_btn}>
            <span className={styles.btn}>
              <Link to="/" >
                 <span>Voltar</span>
              </Link>
            </span>

            <Link to='/posts/create' className={styles.btn}>
                <span>Criar Pick</span>
            </Link>

            </div>
          </>
        )}
        {posts && posts.map((post) => <PostDetails key={post.id} post={post} />)}
      </div>
    </div>
  );
};

export default Search;