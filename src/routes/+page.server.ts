export async function load() {
	type X = string;
	const x: X = '';
	m.nested.no.matter.how.much.i.like({
		param: m.hello.world()
	});
	return {
		name: 'TypeScript'
	};
}

let i = 0;

export const actions = {
	async test() {
		return ++i;
	}
};
