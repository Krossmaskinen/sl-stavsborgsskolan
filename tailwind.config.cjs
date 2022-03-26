module.exports = {
	mode: 'jit',
	content: ['./src/**/*.{html,js,ts,svelte}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				sl: {
					primary: '#2870f0',
					secondary: '#f4f4f4',
					accent: '#0c71bf',
					neutral: '#20252c',
					'base-100': '#454545',
					info: 'rgb(10, 71, 194)',
					success: '#2CAF7D',
					warning: '#FBC851',
					error: '#EC6A8F'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
