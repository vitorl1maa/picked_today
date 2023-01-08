import styles from "./Login.module.css";
import Dogs from '../../assets/images/dogs-view.jpg';
import {SiPhotobucket} from 'react-icons/si';

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from '../../hooks/useAuthentication';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {login, error: authError, loading} = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('')

    const user = {
      email,
      password
    }

    const res = await login(user);

    console.log(user);
  };

  useEffect(()=> {
    if (authError) {
      setError(authError);
    }
  }, [authError]);
  return (
    <div className={styles.container_login}>
      <div>
        <SiPhotobucket />
      <h2>Bem-vindo(a) ao Picked Today!</h2>
      <p>Entre com suas credenciais</p>
      <form onSubmit={handleSubmit} className={styles.form_login}>
        <label>
          <span>E-mail:</span>
          <input 
            type="email" 
            name='email'
            required
            placeholder='E-mail de usuário'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>Senha:</span>
          <input 
            type="password" 
            name='password'
            required
            placeholder='Digite sua senha'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span className={styles.link_reset_password}><Link to='#'>Esqueceu sua senha ?</Link></span>
        </label>
        {!loading && <button className={styles.btn}>Entrar</button>}
        {loading && <button className={styles.btn} disabled>Aguarde...</button>}
        {error && <p className={styles.error}>{error}</p>}
      </form>
      </div>

      <div className={styles.dogs_login}>
        <img src={Dogs} alt="" />
      </div>
    </div>
  )
}

export default Login