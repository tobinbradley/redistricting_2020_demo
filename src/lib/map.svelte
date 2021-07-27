<script>
  import { colors, district, geography } from '$lib/store'
  import gl from 'maplibre-gl'
  import { onMount } from 'svelte'

  const stops = []
  $colors.forEach((color, index) => {
    stops.push([index + 1, color])
  })

  const mapStyle = {
    "version": 8,
    "sources": {
      "geography": {
        "type": "geojson",
        "data": $geography
      }
    },
    "layers": [
      {
        "id": "background",
        "type": "background",
        "paint": {
          "background-color": "white"
        }
      },
      {
        id: "geography",
        source: "geography",
        type: "fill",
        paint: {
          "fill-color": {
            "property": "district",
            "type": "categorical",
            "stops": stops
          },
          "fill-outline-color": "white"
        }
      }
    ]
  }

  const mapOptions = {
    container: 'map',
    style: mapStyle,
    attributionControl: false,
    minZoom: 8,
    maxBounds: [[-82.641, 34.115], [-79.008, 36.762]],
    zoom: 9.3,
    center: [-80.84, 35.23]
  }

  onMount(() => {
    const map = new gl.Map(mapOptions)

    const popup = new gl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 25
    })

    map.on('mousemove', 'geography', function (e) {
      const msg = `
        <h3 class="text-xl font-bold text-center">
          ${e.features[0].properties.precinct}
        </h3>
        Population: ${e.features[0].properties.population}
      `
      popup
        .setLngLat(e.lngLat)
        .setHTML(msg)
        .addTo(map)
    })

    map.on('mouseleave', 'geography', function (e) {
      popup.remove()
    });

    map.on('click', 'geography', function (e) {
      const index = $geography.features.findIndex(f => f.properties.precinct == e.features[0].properties.precinct)

      $geography.features[index].properties.district = $district
      map.getSource('geography').setData($geography)
    })
  })


</script>

<style>
  #map {
    width: 100%;
    height: 700px;
  }
</style>

<div id="map"></div>
