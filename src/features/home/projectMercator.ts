import { mapProjection } from './routeMapGeometry'

/** Same Mercator as the generated outline (d3-geo geoMercator, center 0,0). */
export function projectMercator({ lat, lon }: { lat: number; lon: number }): [number, number] {
  const lambda = (lon * Math.PI) / 180
  const phi = (lat * Math.PI) / 180
  return [
    mapProjection.scale * lambda + mapProjection.translateX,
    mapProjection.translateY - mapProjection.scale * Math.log(Math.tan(Math.PI / 4 + phi / 2)),
  ]
}
