import styles from "../styles/Logo.module.css";
function Logo() {
  return (
    <img
      className={styles.logo}
      alt="Google"
      src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
    />
  );
}

export default Logo;