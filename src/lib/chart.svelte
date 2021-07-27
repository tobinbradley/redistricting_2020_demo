<script>
  import { population, colors } from '$lib/store'
  import Chart from 'chart.js/auto/auto.js'
  import { onMount } from 'svelte'

  const popMean = $population.reduce((a, b) => a + b, 0) / $colors.length
  let myChart

  $: if ($population && myChart) {
    myChart.data.datasets[0].data = $population
    myChart.update()
  }

  let data = {
    labels: ["1", "2", "3", "4", "5", "6"],
    datasets: [
      {
        data: $population,
        backgroundColor: $colors,
        order: 1,
        label: " Population"
      },
      {
        data: [popMean, null, null, null, null, popMean],
        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "#bada55",
        borderWidth: 5,
        borderDash: [5, 5],
        label: ' Target',
        type: "line"
      }
    ]
  }

  onMount(() => {
    const ctx = document.getElementById("myChart").getContext("2d");
    myChart = new Chart(ctx, {
      type: "bar",
      legend: false,
      data: data,
      options: {
        spanGaps: true,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: false
          }
        },
        scales: {
          y: {
            min: 120000
          }
        }
      }
    })
  })
</script>

<style>
  #myChart {
    width: 100% !important;
  }
</style>

<canvas class="my-10" id="myChart" height="200"></canvas>
