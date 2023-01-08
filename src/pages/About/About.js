// CSS
import styles from './About.module.css';

import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre nós</h2>

      <p>Esse projeto consiste em um blog com React no front-end e Firebase no back-end 😁.</p>
      <Link to='/posts/create' className={styles.btn}>Criar Post</Link>
    </div>
  )
}

export default About