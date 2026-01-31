import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
	// ドキュメントのパス名から最上位の要素を取得
	// e.g. `/root/sub/` returns `/root/`
	const currentBase = context.url.pathname.split('/').slice(0, 3).join('/') + '/';

	const { pagination } = context.locals.starlightRoute;

	// サイドバーから同一階層ないにないドキュメントを取り除く
	context.locals.starlightRoute.sidebar = context.locals.starlightRoute.sidebar.filter(
		(entry) =>
            //(entry.type === 'link') ||
			entry.type === 'group' &&
			entry.entries.some(
				(subEntry) => subEntry.type === 'link' && subEntry.href.startsWith(currentBase)
			)
	);

    // カテゴリを跨ぐページネーションリンクは作成しない
	if (pagination.prev && !pagination.prev.href.startsWith(currentBase)) {
		pagination.prev = undefined;
	}
	if (pagination.next && !pagination.next.href.startsWith(currentBase)) {
		pagination.next = undefined;
	}
});
