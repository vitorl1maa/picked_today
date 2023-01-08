import styles from "./EditPost.module.css";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";

const EditPost = () => {
  const {id} = useParams();
  const {document: post} = useFetchDocument('posts', id);

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if(post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);

      const textTags = post.tagsArray.join(' ');

      setTags(textTags);
    }

  }, [post])

  const {user} = useAuthValue();

  const {updateDocument, response} = useUpdateDocument('posts');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa vir de uma URL.')
    }

    // criar o array de tags
    const tagsArray = tags.split(' ').map((tag) =>tag.trim().toLowerCase());

    // checar todos os valores
    if(!title || !image || !tags || !body) {
      setFormError('Por favor, preencha todos os campos!');
    }

    if(formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    }

    updateDocument(id, data);

    // redirect to home page
    navigate('/dashboard');
  };

  return (
    <div className={styles.edit_post}>
      {post && (
        <>
          <h2>Editar Pick</h2>
          <h3>{post.title}</h3>
        <form onSubmit={handleSubmit} className={styles.form_post}>
          <label>
            Título:
            <input 
              type="text" 
              name="title" 
              required 
              placeholder="Viajem" 
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>

        <label>
          URL da imagem:
          <input 
            type="text" 
            name="image" 
            required 
            placeholder="Insira uma imagem que represente o seu post" 
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
          <p className={styles.preview_title}>Preview da imagem:</p>
          <img className={styles.image_preview} src={post.image} alt={post.title} />
        <label>
          Conteúdo:
          <textarea
            name="body" 
            placeholder="Insira o conteúdo do post" 
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </label>

        <label>
          Tags:
          <input 
            type="text" 
            name="tags" 
            required 
            placeholder="Insira as tags do seu post separadas por vírgula" 
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        
          {!response.loading && <button className={styles.btn}>Editar</button>}
          {response.loading && <button className={styles.btn}>Aguarde...</button>}
          {response.error && <p className={styles.error}>{response.error}</p>}
          {formError && <p className={styles.error}>{formError}</p>}
        </form>
        </>
      )}
    </div>
  )
}

export default EditPost