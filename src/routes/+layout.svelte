<script lang="ts">
	import '../app.css';
	import '@fontsource/inter/100.css';
	import '@fontsource/inter/200.css';
	import '@fontsource/inter/300.css';
	import '@fontsource/inter/400.css';
	import '@fontsource/inter/500.css';
	import '@fontsource/inter/600.css';
	import '@fontsource/inter/700.css';
	import '@fontsource/inter/800.css';
	import '@fontsource/inter/900.css';

	let { children } = $props();
</script>

<svelte:head>
	<title>Generate Certificate</title>
</svelte:head>

{@render children()}
