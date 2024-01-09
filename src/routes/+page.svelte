<script lang="ts">
	m.hello.world();
	const some = {
		some: m.hello.world
	};
	let param = '';
</script>

a
<input bind:value={param} />

<h1>
	{some.some({
		name: 'lkdjldks'
	})}
</h1>
<h1>{m.hello.world()}!</h1>
<h1>
	{#key param}
		{console.log(param)}
		{m.nested.no.matter.how.much.i.like({
			param
		})}!
	{/key}
</h1>
<h1>
	{m.greeting({
		name: 'test'
	})}!
</h1>
