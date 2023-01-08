import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts } = useFetchDocuments("posts", null, uid);

  const { deleteDocument } = useDeleteDocument("posts");

  console.log(uid);
  console.log(posts);

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus picks</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Nenhum pick encontrado 😕...</p>
          <Link to="/posts/create" className={styles.btn}>
            Criar primeiro pick
          </Link>
        </div>
      ) : (
        <div className={styles.post_header}>
          <span>Título</span>
          <span>Ações</span>
        </div>
      )}

      {posts &&
        posts.map((post) => (
          <div className={styles.post_row} key={post.id}>
            <p>{post.title}</p>
            <div className={styles.actions}>
              <Link to={`/posts/${post.id}`} className={styles.btn}>
                <span>Ver</span>
              </Link>
              <Link to={`/posts/edit/${post.id}`} className={styles.btn}>
                <span>Editar</span>
              </Link>
              <button
                onClick={() => deleteDocument(post.id)}
                className={styles.btn_delete}
              >
                <span>Excluir</span>
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Dashboard;