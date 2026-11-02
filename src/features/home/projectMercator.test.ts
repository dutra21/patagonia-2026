import { geoMercator } from 'd3-geo'
import { describe, expect, it } from 'vitest'
import { trip } from '../../data/trip'
import { projectMercator } from './projectMercator'
import { mapProjection, mapSize } from './routeMapGeometry'

describe('projectMercator', () => {
  const d3 = geoMercator().scale(mapProjection.scale).translate([mapProjection.translateX, mapProjection.translateY])

  it('matches the projection used to draw the outline', () => {
    for (const place of Object.values(trip.places)) {
      const [x, y] = projectMercator(place.coords)
      const [dx, dy] = d3([place.coords.lon, place.coords.lat]) ?? [Number.NaN, Number.NaN]
      expect(x, place.id).toBeCloseTo(dx, 3)
      expect(y, place.id).toBeCloseTo(dy, 3)
    }
  })

  it('places every city inside the drawing', () => {
    for (const place of Object.values(trip.places)) {
      const [x, y] = projectMercator(place.coords)
      expect(x, place.id).toBeGreaterThan(0)
      expect(x, place.id).toBeLessThan(mapSize.width)
      expect(y, place.id).toBeGreaterThan(0)
      expect(y, place.id).toBeLessThan(mapSize.height)
    }
  })
})
