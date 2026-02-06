// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://github.com/kkayataka',
	base: '/study-astro',
	integrations: [
		starlight({
			title: 'Study Astro',
			social: [{ icon: 'github', label: 'GitHub', href: 'https://github.com/kkayataka/study-astro' }],
			lastUpdated: true,
			sidebar: [
				{
					label: 'Guides',
					autogenerate: { directory: 'guides' },
				},
				// Reference
				{
					label: 'Sub1',
					autogenerate: { directory: 'reference/sub1' },
				},
				{
					label: 'Sub2',
					autogenerate: { directory: 'reference/sub2' },
				},
			],
			customCss: [
				'./src/styles/custom.css',
			],
			components: {
				// Override the default `SocialIcons` component.
				Sidebar: './src/components/Sidebar.astro',
      		},
			routeMiddleware: `./src/routeMiddleware.ts`
		}),
	],
});
