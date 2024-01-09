import MagicString from 'magic-string';
import { walk } from 'zimmerframe';
import { parse } from 'acorn';

/**
 * @returns {import("vite").Plugin}
 */
export function nested_inlang() {
	return {
		name: 'vite-plugin-inlang-nested',
		transform(code, id) {
			try {
				const ast = parse(code, {
					ecmaVersion: 'latest',
					sourceType: 'module'
				});
				const magic_string = new MagicString(code);
				walk(
					ast,
					{},
					{
						// @ts-expect-error
						MemberExpression(node) {
							const { start, end } = node;
							const call_expression = code.substring(start, end);
							if (call_expression.startsWith('m.')) {
								const [, ...parts] = call_expression.split('.');
								magic_string.overwrite(start, end, `m.${parts.join('_')}`);
							}
						}
					}
				);
				return {
					code: magic_string.toString(),
					map: magic_string.generateMap()
				};
			} catch {}
		}
	};
}
