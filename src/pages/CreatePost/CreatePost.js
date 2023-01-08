import styles from "./CreatePost.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from "../../hooks/useInsertDocument";

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  const {user} = useAuthValue();

  const {insertDocument, response} = useInsertDocument('posts');

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

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    })

    // redirect to home page
    navigate('/');
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Pick</h2>
      <p>Poste algo sobre você ou sobre o seu dia 🤩!</p>
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
        
        {!response.loading && <button className={styles.btn}>Cadastrar</button>}
        {response.loading && <button className={styles.btn}>Aguarde...</button>}
        {response.error && <p className={styles.error}>{response.error}</p>}
        {formError && <p className={styles.error}>{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost