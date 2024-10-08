// 'use client'

// import React, {useState, useRef, useMemo} from "react"
// import { Button } from "@/components/ui/button"
// import Source from "react-map-gl/dist/esm/components/source"
// import { Layer, useMap } from "react-map-gl"
// import Map from "@/components/custom/MapBox"
// import {point} from '@turf/helpers'

// const createBezierCurve = (start, end, color) => {
//     const numberOfPoints = 100; // Jumlah titik pada garis melengkung
//     const curvePoints = [];
//     const controlPoint = [
//         (start[0] + end[0]) / 2, // Kontrol titik di tengah antara start dan end
//         (start[1] + end[1]) / 2 + Math.max(start[1], end[1]) // Tambahkan offset vertikal
//     ];

//     for (let i = 0; i <= numberOfPoints; i++) {
//         const t = i / numberOfPoints;
//         const x =
//             (1 - t) * (1 - t) * start[0] +
//             2 * (1 - t) * t * controlPoint[0] +
//             t * t * end[0];
//         const y =
//             (1 - t) * (1 - t) * start[1] +
//             2 * (1 - t) * t * controlPoint[1] +
//             t * t * end[1];
//         curvePoints.push([x, y]);
//     }

//     return {
//         type: "Feature",
//         geometry: {
//             type: "LineString",
//             coordinates: curvePoints,
//         },
//         properties: {
//             color: color
//         }
//     };
// };

// export default function MapBoxComponents({coordinates}){
//      console.log(coordinates)
//      const [dataGeoJson, setDataGeoJson] = useState({})
//      const { current: playgroundMap } = useMap('playgroundMap')
//      const [centerMap, setCenterMap] = useState([106.8165941, -6.268303])
//      const result = useMemo(() => ([{
//           _id: "2HUM21g47EquchXZItZqWfcq6LSC3Q5j",
//           lat: -6.268303,
//           lon: 106.8165941,
//           address: "JAKARTA RAYA, KOTA JAKARTA PUSAT, TANAHABANG, GELORA"
//      }]), [])

//      // console.log(playgroundMap)
     
//      // if (playgroundMap && centerMap) {
//      // setTimeout(() => {
//      //      playgroundMap.flyTo({
//      //      center: centerMap,
//      //      zoom: 12.5,
//      //      duration: 12000,
//      //      bearing: 130,
//      //      pitch: 75
//      //      })
//      // }, 2000)
//      // }

//       const createCurvedLines = (data) => {
//         return data.map((v, i) => {
//             const start = point([v.source_lon, v.source_lat]);
//             const end = point([v.destination_lon, v.destination_lat]);
//           //   const line = arc(start, end, { steps: 100, offset: 10 });
//           console.log(createBezierCurve(start, end, v.color), ':::bezier')
//           return createBezierCurve(start, end, v.color)
//         });
//     };

//     const createMarkers = (data) => {
//         return data.reduce((acc, v) => {
//             acc.push({
//                 type: "Feature",
//                 geometry: {
//                     type: "Point",
//                     coordinates: [v.source_lon, v.source_lat]
//                 },
//                 properties: {
//                     color: v.color
//                 }
//             });
//             acc.push({
//                 type: "Feature",
//                 geometry: {
//                     type: "Point",
//                     coordinates: [v.destination_lon, v.destination_lat]
//                 },
//                 properties: {
//                     color: v.color
//                 }
//             });
//             return acc;
//         }, []);
//     };

//      const lines = useMemo(() => createCurvedLines(coordinates), [coordinates])
//      const markers = useMemo(() => createMarkers(coordinates), [coordinates]);

//     const geojson = {
//         type: 'FeatureCollection',
//         features: lines
//     };

//     const geojsonMarkers = {
//         type: 'FeatureCollection',
//         features: markers
//     };

// //     console.log(geojson)

//      // const geojson = {
//      //      type: 'FeatureCollection',
//      //      features: [
//      //           {
//      //                type: 'Feature', 
//      //                geometry: {
//      //                     type: 'Point', 
//      //                     coordinates: [-122.4, 37.8]
//      //                }}
//      //      ]
//      // };
//      const lineLayerStyle = {
//         id: 'curved-lines',
//         type: 'line',
//         paint: {
//             'line-color': ['get', 'color'],
//             'line-width': 2
//         }
//     };

//     const markerLayerStyle = {
//         id: 'markers',
//         type: 'circle',
//         paint: {
//             'circle-radius': 5,
//             'circle-color': ['get', 'color']
//         }
//     };

//      return (
//           <Map
//                id="playgroundMap"
//                initialViewState={{
//                     latitude: 37.5,//-1.2448863,
//                     longitude: -110.3,//118.3804682,
//                     zoom: 1.5
//                }}
//                height='600px'
//                mapStyle={'mapbox://styles/mapbox/dark-v11'}
//                projection={'globe'}
//                terrain={{
//                     source: "raster-dem",
//                     exaggeration: 1.5,
//                }}
//                fog={{
//                     color: 'rgb(220, 159, 159)', // Pink fog / lower atmosphere
//                     'high-color': 'rgb(36, 92, 223)', // Blue sky / upper atmosphere
//                     'horizon-blend': 0.04 // Exaggerate atmosphere (default is .1)
//                }}
//                fullscreen={true}
//           >
//                <Source id="curved-lines" type="geojson" data={geojson}>
//                     <Layer {...lineLayerStyle} />
//                </Source>
//                <Source id="markers" type="geojson" data={geojsonMarkers}>
//                     <Layer {...markerLayerStyle} />
//                </Source>
//           </Map>
//      )
// }


'use client'

import React, { useState, useMemo, useEffect } from "react";
import { Source, Layer, useMap } from "react-map-gl";
import Map from "@/components/custom/MapBox";
import { point } from '@turf/helpers';

// Fungsi untuk membuat titik-titik pada garis melengkung menggunakan interpolasi Bezier
const createBezierCurve = (start, end, color) => {
    const numberOfPoints = 100; // Jumlah titik pada garis melengkung
    const curvePoints = [];
    const controlPoint = [
        (start[0] + end[0]) / 2, // Kontrol titik di tengah antara start dan end
        (start[1] + end[1]) / 2 + Math.max(start[1], end[1]) // Tambahkan offset vertikal
    ];

    for (let i = 0; i <= numberOfPoints; i++) {
        const t = i / numberOfPoints;
        const x =
            (1 - t) * (1 - t) * start[0] +
            2 * (1 - t) * t * controlPoint[0] +
            t * t * end[0];
        const y =
            (1 - t) * (1 - t) * start[1] +
            2 * (1 - t) * t * controlPoint[1] +
            t * t * end[1];
        curvePoints.push([x, y]);
    }

    return {
        type: "Feature",
        geometry: {
            type: "LineString",
            coordinates: curvePoints,
        },
        properties: {
            color: color
        }
    };

     return curvePoints; 
};

export default function MapBoxComponents({ coordinates }) {
     const { current: playgroundMap } = useMap('playgroundMap');
     const [centerMap, setCenterMap] = useState([106.8165941, -6.268303]);

     // const [progress, setProgress] = useState(0);

//     const createCurvedLines = (data) => {
//         return data.map((v, i) => {
//             const start = [v.source_lon, v.source_lat];
//             const end = [v.destination_lon, v.destination_lat];
//             return {
//                 coordinates: createBezierCurve(start, end),
//                 color: v.color
//             };
//         });
//     };

//      useEffect(() => {
//         const animate = () => {
//             setProgress((prev) => (prev + 0.1) % 1);
//             requestAnimationFrame(animate);
//         };

//         requestAnimationFrame(animate);
//     }, []);

    const createCurvedLines = (data) => {
        return data.map((v, i) => {
            const start = [v.source_lon, v.source_lat];
            const end = [v.destination_lon, v.destination_lat];
            return createBezierCurve(start, end, v.color);
        });
    };

    const createMarkers = (data) => {
        return data.reduce((acc, v) => {
            acc.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [v.source_lon, v.source_lat]
                },
                properties: {
                    color: v.color
                }
            });
            acc.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [v.destination_lon, v.destination_lat]
                },
                properties: {
                    color: v.color
                }
            });
            return acc;
        }, []);
    };

    const lines = useMemo(() => createCurvedLines(coordinates), [coordinates]);
    const markers = useMemo(() => createMarkers(coordinates), [coordinates]);

    const geojsonLines = {
        type: 'FeatureCollection',
        features: lines
    };

//      const geojsonLines = {
//         type: 'FeatureCollection',
//         features: lines.map(line => ({
//             type: "Feature",
//             geometry: {
//                 type: "LineString",
//                 coordinates: line.coordinates.slice(0, Math.floor(progress * line.coordinates.length) + 1)
//             },
//             properties: {
//                 color: line.color
//             }
//         }))
//     };

    const geojsonMarkers = {
        type: 'FeatureCollection',
        features: markers
    };

    const lineLayerStyle = {
        id: 'curved-lines',
        type: 'line',
        paint: {
            'line-color': ['get', 'color'],
            'line-width': 2
        }
    };

    const markerLayerStyle = {
        id: 'markers',
        type: 'circle',
        paint: {
            'circle-radius': 5,
            'circle-color': ['get', 'color']
        }
    };

    return (
        <Map
            id="playgroundMap"
            initialViewState={{
                latitude: 0,
                longitude: 0,
                zoom: 1.5
            }}
            height='600px'
            mapStyle='mapbox://styles/mapbox/streets-v11'
            projection='globe'
            terrain={{
                source: "raster-dem",
                exaggeration: 1.5,
            }}
            fog={{
                color: 'rgb(220, 159, 159)', // Pink fog / lower atmosphere
                'high-color': 'rgb(36, 92, 223)', // Blue sky / upper atmosphere
                'horizon-blend': 0.04 // Exaggerate atmosphere (default is .1)
            }}
            fullscreen={true}
        >
            {/* <Source id="curved-lines" type="geojson" data={geojsonLines}>
                <Layer {...lineLayerStyle} />
            </Source> */}
            <Source id="markers" type="geojson" data={geojsonMarkers}>
                <Layer {...markerLayerStyle} />
            </Source>
        </Map>
    );
}
