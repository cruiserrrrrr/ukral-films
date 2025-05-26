"use client";

import styles from "./index.module.scss";
import { Button, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "@mantine/form";

const SearchContent = () => {
  
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      query: "",
    },
  });
  
  const handleSearch = () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    router.push(`/search/?search=${query}`);
    
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  };
  
  return (
    <form
      className={styles.search}
      onSubmit={form.onSubmit(() => handleSearch())}
    >
      {isLoading ? (
        <div className={styles.loaderContainer}>
          <div className={styles.loader}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
      ) : (
        <>
          <Input
            size="md"
            radius="xl"
            placeholder="Искать фильм"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={styles.input}
            ref={searchInputRef}
          />
          <Button
            variant="default"
            color="dark"
            size="md"
            radius="xl"
            onClick={handleSearch}
          >
            <IconSearch size={24} stroke={1.5} color={"white"} />
          </Button>
        </>
      )}
    </form>
  );
};

export default SearchContent;