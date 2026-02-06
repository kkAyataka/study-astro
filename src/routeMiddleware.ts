import { defineRouteMiddleware } from '@astrojs/starlight/route-data';

export const onRequest = defineRouteMiddleware((context) => {
	// ドキュメントのパス名を分解
	const pathComps = context.url.pathname.split('/');
	const currentBase = (() => {
		if (import.meta.env.BASE_URL && pathComps.length >= 3) {
			// baseが指定されている場合は["", base, topGroup]の最低3要素を要求
			return pathComps.slice(0, 3).join("/") + "/";
		} else if (!import.meta.env.BASE_URL && pathComps.length >= 2) {
			// baseがない場合は2要素
			return pathComps.slice(0, 2).join("/") + "/";
		} else {
			// 要素が足りない場合（indexページ）は空
			return "";
		}
	})();

	const { pagination } = context.locals.starlightRoute;
	if (currentBase) {
		// サイドバーから同一階層ないにないドキュメントを取り除く
		context.locals.starlightRoute.sidebar = context.locals.starlightRoute.sidebar.filter(
			(entry) =>
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
	} else {
		// currentBaseが空なら全て空にする
		context.locals.starlightRoute.sidebar = [];
		pagination.next = undefined;
		pagination.prev = undefined;
	}
});
