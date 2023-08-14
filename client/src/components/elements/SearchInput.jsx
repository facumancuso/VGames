import styles from "../styles/SearchInput.module.css";

function SearchInput({ value, onChange }) {
  return (
    <div className={styles.searchInput}>
      <input
        id="search"
        type="text"
        name="search"
        onChange={onChange}
        value={value}
      />
    </div>
  );
}

export default SearchInput;