import styles from "./SearchBar.module.css";
import { useState } from "react";
import toast from "react-hot-toast";

export interface SearchBarProps {
  onSubmit: (query: string) => void;
}

export default function SearchBar({ onSubmit }: SearchBarProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = value.trim();

    if (!query) {
      toast("Please enter search query");
      return;
    }

    onSubmit(query);
  };

  return (
    <header className={styles.header}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          className={styles.input}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Search movies..."
        />
        <button className={styles.button}>Search</button>
      </form>
    </header>
  );
}