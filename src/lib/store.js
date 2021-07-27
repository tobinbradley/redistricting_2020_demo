import { writable, readable, derived } from 'svelte/store'
import geog from '$lib/data/geography.json'
import dissolve from '@turf/dissolve'

export let district = writable(1)

export const colors = readable([
  '#DB2777',
  '#7C3AED',
  '#2563EB',
  '#059669',
  '#D97706',
  '#DC2626'
])

export let geography = writable(geog)

export let contiguity = derived(geography, $geography =>
  dissolve($geography, {propertyName: 'district'}).features.length
)

export let population = derived(geography, $geography => {
  const pops = [0,0,0,0,0,0]
  $geography.features.forEach(feature => {
    pops[feature.properties.district - 1] += feature.properties.population
  })
  return pops
})

population.subscribe(value => {
  console.log(value)
})
