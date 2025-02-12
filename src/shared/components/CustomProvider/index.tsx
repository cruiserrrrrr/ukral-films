'use client';

import { ReactNode, Suspense } from 'react';
import { createTheme, MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from '@/services/redux/store';

interface ICustomProvider {
	children: ReactNode;
}

export const CustomProvider = (props: ICustomProvider) => {
	const { children } = props;
	
	const theme = createTheme({
		black: '#ededed',
		white: '#0a0a0a',
		primaryColor: 'darkPurple',
		colors: {
			midnightGreen: ['#001f26', '#003847', '#005c6d', '#007f93', '#00a3b9', '#00c7df', '#26dbf3', '#6febfc', '#b3f9ff', '#e6feff'],
			jasper: ['#330000', '#660000', '#990000', '#cc0000', '#ff0000', '#ff3333', '#ff6666', '#ff9999', '#ffcccc', '#ffeeee'],
			saffron: ['#4d3900', '#7f5c00', '#b27f00', '#e5a200', '#ffb800', '#ffcc33', '#ffdf66', '#ffec99', '#fff5cc', '#fff9e6'],
			paynesGray: ['#0f1d26', '#1e394d', '#2d5673', '#3c729a', '#4b8fc0', '#5cabe1', '#7cb9e8', '#a3d1f3', '#cce7f8', '#e6f3fc'],
			verdigris: ['#0d2b2c', '#1b5658', '#298484', '#37b1b0', '#45dfdb', '#61f2ee', '#80f9f5', '#a6fdfc', '#c7ffff', '#e5ffff'],
			ultraViolet: ['#1a1420', '#33273f', '#4d3a5f', '#674c7e', '#81609d', '#9b74bc', '#b58edb', '#cfb0fa', '#e3d0ff', '#f5eaff'],
			darkPurple: ['#120922', '#241144', '#361866', '#471f88', '#5927aa', '#6b2fcc', '#8145e4', '#9765fa', '#b28bff', '#ccafff'],
			maize: ['#403200', '#806500', '#c09600', '#ffcc00', '#ffd633', '#ffe066', '#ffec99', '#fff5cc', '#fff9e6', '#fffdf3'],
			floralWhite: ['#3d3218', '#7a6430', '#b79648', '#e4c860', '#ffe78c', '#ffefad', '#fff6cf', '#fff9e6', '#fffbf3', '#fffdf8'],
			bittersweet: ['#4d0000', '#990000', '#e50000', '#ff3333', '#ff6666', '#ff9999', '#ffcccc', '#ffe6e6', '#fff3f3', '#fff9f9'],
			biceBlue: ['#0f274d', '#1e4e99', '#2d75e5', '#3c9cff', '#5cb5ff', '#7ccfff', '#99e0ff', '#cceeff', '#e6f7ff', '#f3fbff'],
			eerieBlack: ['#0d0d0d', '#1a1a1a', '#262626', '#333333', '#404040', '#4d4d4d', '#595959', '#666666', '#737373', '#808080'],
		},
		defaultRadius: 'md',
	})
	
	return (
		<Suspense>
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<MantineProvider
						withGlobalClasses
						withCssVariables
						forceColorScheme={'dark'}
						theme={theme}
					>
						<ModalsProvider>
							<Notifications />
							{children}
						</ModalsProvider>
					</MantineProvider>
				</PersistGate>
			</Provider>
		</Suspense>
	);
};