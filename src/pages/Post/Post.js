// CSS
import styles from "./Post.module.css";

// hooks
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useParams, Link } from "react-router-dom";


const Post = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {post && (
        <>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <div className={styles.post_body}>
            <p>{post.body}</p>
          </div>
          <h3>Este pick trata sobre:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
          <span className={styles.back_button}>
              <Link to="/" className={styles.btn}>
                <span>Voltar</span>
              </Link>
          </span>
        </>
      )}
    </div>
  );
};

export default Post;