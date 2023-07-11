import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
	styles: {
		global: {
			body: {
				bg: '#172B4D',
				color: 'white',
			},
			'*': {
				'&::-webkit-scrollbar': {
					w: '2',
					h: '1.5',
				},
				'&::-webkit-scrollbar-track': {
					backgroundColor: 'transparent',
				},
				'&::-webkit-scrollbar-thumb': {
					backgroundColor: '#1C939A',
					borderRadius: '4',
				},
			},
		},
	},
	breakpoints: {
		sm: '25rem',
		md: '40rem',
		lg: '55rem',
		xl: '75rem',
		'2xl': '96rem',
	},
});

export default theme;
