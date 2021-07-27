<script>
  import { colors, district } from '$lib/store'


</script>

<div class="grid grid-cols-6">
  {#each $colors as color, index}
    <label class="text-center py-1 text-white"
      style="background: {color}"
    >
      <input class="mr-1" type="radio" name="district" bind:group={$district} value="{index + 1}" >{index + 1}
    </label>
  {/each}

  </div>
