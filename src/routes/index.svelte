<script>
  import Selector from '$lib/selector.svelte'
  import Map from '$lib/map.svelte'
  import Contiguity from '$lib/contiguity.svelte'
  import Population from '$lib/population.svelte'
  import Popchart from '$lib/chart.svelte'

</script>

<div class="container mx-auto py-3">
  <div class="text-center text-3xl font-bold my-5">Redistricting for the Democracy 2020</div>
  <div class="grid md:grid-cols-4 gap-3">
    <div class="md:col-span-3">
      <Selector />
    </div>
    <div class="md:col-span-3 bg-gray-100">
      <Map />
    </div>
    <div class="grid gap-y-3">
      <div>
        <Popchart />
        <Contiguity />
        <Population />
      </div>
    </div>
  </div>
  <div>Copywrong because reasons</div>
</div>
