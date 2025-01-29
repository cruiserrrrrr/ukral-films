import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import { Button, Input, Modal } from '@mantine/core';
import { IconSearch } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useForm } from '@mantine/form';

interface ISearchModal {
	isOpen: boolean;
	onClose: () => void;
}

const SearchModal = (props: ISearchModal) => {
	
	const { isOpen, onClose } = props;
	
	const [query, setQuery] = useState<string>('');
	const [isActive, setIsActive] = useState<boolean>(false);
	const router = useRouter();
	
	const form = useForm({
		mode: 'uncontrolled',
		initialValues: {
			query: '',
		},
	});
	
	useEffect(() => {
		if (isOpen) {
			setIsActive(true);
			document.body.style.overflow = 'hidden';
		} else {
			setIsActive(false);
			document.body.style.overflow = 'auto';
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
				radius: 'lg',
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
				/>
				<Button
					variant="default"
					color="dark"
					size="lg"
					radius="xl"
					className={styles.button}
					onClick={handleSearch}
				>
					<IconSearch size={24} stroke={1.5} color={'white'} />
				</Button>
			</form>
			<div className={styles.result}>
			
			</div>
		</Modal>
	);
};
export default SearchModal;