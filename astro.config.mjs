// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import markdoc from '@astrojs/markdoc';

const REPO = 'https://github.com/LibreriadeSatoshi/moodle-help-docs';
const MOODLE = 'https://campus.ismos.xyz';

// https://astro.build/config
export default defineConfig({
	site: 'https://docs.ismos.xyz',
	integrations: [
		starlight({
			title: {
				es: 'ISMOS Docs',
				en: 'ISMOS Docs',
			},
			description: 'Guías de ayuda para la plataforma de cursos de ISMOS.',
			// ISMOS mark, Ink on light and Paper on dark (same shapes as the web's Logo.astro).
			logo: {
				light: './src/assets/logo-light.svg',
				dark: './src/assets/logo-dark.svg',
				alt: 'ISMOS',
			},
			// ISMOS design system on top of Starlight; fonts are self-hosted from public/fonts/ismos.
			customCss: ['./src/styles/custom.css'],
			components: {
				// Light when the device states no preference (ISMOS); Starlight defaults to dark.
				ThemeProvider: './src/components/ThemeProvider.astro',
			},
			expressiveCode: {
				// ISMOS: radius 4, hairline frame, no drop shadow.
				styleOverrides: {
					borderRadius: '4px',
					borderColor: 'var(--ism-hairline)',
					frames: { shadowColor: 'transparent', frameBoxShadowCssValue: 'none' },
				},
			},
			head: [
				{
					// Applies the saved audience filter before first paint, so the cards
					// for the other profile never flash on screen.
					tag: 'script',
					content:
						"try{var a=localStorage.getItem('lds-audience');if(a)document.documentElement.dataset.audience=a}catch(e){}",
				},
			],
			defaultLocale: 'root',
			locales: {
				root: { label: 'Español', lang: 'es' },
				en: { label: 'English', lang: 'en' },
			},
			social: [
				{ icon: 'github', label: 'GitHub', href: 'https://github.com/LibreriadeSatoshi' },
				{ icon: 'external', label: 'Campus', href: MOODLE },
			],
			editLink: { baseUrl: `${REPO}/edit/main/` },
			lastUpdated: true,
			sidebar: [
				{
					label: 'Acceso',
					translations: { en: 'Access' },
					items: [{ autogenerate: { directory: 'acceso' } }],
				},
				{
					label: 'Cuenta',
					translations: { en: 'Account' },
					items: [{ autogenerate: { directory: 'cuenta' } }],
				},
				{
					label: 'Profesores',
					translations: { en: 'Teachers' },
					items: [{ autogenerate: { directory: 'profesores' } }],
				},
			],
		}),
		markdoc(),
	],
});
