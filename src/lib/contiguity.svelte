<script>
  import { contiguity } from '$lib/store'
  import Indicator from '$lib/indicator.svelte'
</script>

<h3 class="text-xl text-center mb-1">Contiguity Check</h3>
<Indicator pass={$contiguity === 6} />
