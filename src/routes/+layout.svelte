<script>
	import { onMount } from 'svelte';
	import './global.css';

	onMount(() => {
		// used during tests to wait for the sveltekit hydration
		document.body.setAttribute('data-kit-started', '');
	});
</script>

<slot />
