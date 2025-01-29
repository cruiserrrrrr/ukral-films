'use client';

import { ReactNode, Suspense } from 'react';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';

interface ICustomProvider {
	children: ReactNode;
}

export const CustomProvider = (props: ICustomProvider) => {
	const { children } = props;
	return (
		<Suspense>
			<MantineProvider
				withGlobalClasses
				withCssVariables
				forceColorScheme={'dark'}
				theme={{
					black: '#ededed',
					white: '#0a0a0a',
				}}
			>
				<ModalsProvider>
					{children}
				</ModalsProvider>
			</MantineProvider>
		</Suspense>
	);
};