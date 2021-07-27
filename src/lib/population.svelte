<script>
  import { population, colors } from '$lib/store'
  import Indicator from '$lib/indicator.svelte'

</script>

<h3 class="text-xl text-center mb-1">Population Check</h3>
<Indicator pass={
  (Math.max(...$population) - Math.min(...$population))
  /
  ($population.reduce((a, b) => a + b, 0) / $colors.length)
  <= 0.1
} />
