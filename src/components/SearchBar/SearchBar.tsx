import styles from "./SearchBar.module.css";
import toast from "react-hot-toast";

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  async function action(formData: FormData) {
    const query = String(formData.get("query") ?? "").trim();

    if (!query) {
      toast("Please enter your search query.");
      return;
    }

    onSubmit(query);
  }

  return (
    <header className={styles.header}>
      <form className={styles.form} action={action}>
        <input
          className={styles.input}
          name="query"
          type="text"
          placeholder="Search movies..."
          autoComplete="off"
        />

        <button className={styles.button} type="submit">
          Search
        </button>
      </form>
    </header>
  );
}