"use client";

import styles from "./index.module.scss";
import { Button, Input } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "@mantine/form";

const SearchContent = () => {
  
  const [query, setQuery] = useState<string>("");
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      query: "",
    },
  });
  
  const handleSearch = () => {
    router.push(`/search/?search=${query}`);
  };
  
  return (
    <form
      className={styles.search}
      onSubmit={form.onSubmit(() => handleSearch())}
    >
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
    </form>
  );
};

export default SearchContent;