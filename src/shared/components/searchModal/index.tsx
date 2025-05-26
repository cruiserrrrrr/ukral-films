import styles from "./index.module.scss";
import { useEffect, useRef, useState } from "react";
import { Button, Input, Modal } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useForm } from "@mantine/form";

interface ISearchModal {
  isOpen: boolean;
  onClose: () => void;
}

const SearchModal = (props: ISearchModal) => {
  
  const { isOpen, onClose } = props;
  
  const [query, setQuery] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      query: "",
    },
  });
  
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
    if (isOpen) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [isOpen]);
  
  if (!isOpen) return null;
  
  const handleSearch = () => {
    router.push(`/search/?search=${query}`);
    onClose();
  };
  
  return (
    <Modal
      opened={isActive}
      onClose={onClose}
      title="Поиск"
      centered
      overlayProps={{
        backgroundOpacity: 0.3,
        blur: 10,
        radius: "lg",
      }}
      className={styles.modal}
      onSubmit={handleSearch}
    >
      <form
        className={styles.search}
        onSubmit={form.onSubmit(() => handleSearch())}
      >
        <Input
          size="lg"
          radius="xl"
          placeholder="Искать"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
          ref={searchInputRef}
        />
        <Button
          variant="default"
          color="dark"
          size="lg"
          radius="xl"
          onClick={handleSearch}
        >
          <IconSearch size={24} stroke={1.5} color={"white"} />
        </Button>
      </form>
    </Modal>
  );
};
export default SearchModal;