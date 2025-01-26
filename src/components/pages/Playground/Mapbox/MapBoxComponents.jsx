'use client'

import React, { useState, useEffect } from "react";
import { Source, Layer, useMap } from "react-map-gl";
import Map from "@/components/custom/MapBox";
import * as turf from '@turf/turf'

// Fungsi untuk membuat titik-titik pada garis melengkung menggunakan interpolasi Bezier
const createBezierCurve = (start, end) => {
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

    return curvePoints;
};

export default function MapBoxComponents({ coordinates }) {
    const { current: mapBox } = useMap("playgroundMap");
    const [animatedLine, setAnimatedLine] = useState({});

    useEffect(() => {
        if (!coordinates.length) return;

        // console.log(datas, '::datas')

        coordinates.forEach((v, index) => {
            const start = [v.source_lon, v.source_lat];
            const end = [v.destination_lon, v.destination_lat];
            const bezierCurve = createBezierCurve(start, end);

            // Mulai animasi
            animateLine(bezierCurve, v.color, index);
        });
    }, [coordinates]);

   const animateLine = (curvePoints, color, index) => {
    let currentIndex = 0; // Indeks saat ini pada array koordinat
    const segmentLength = 20; // Panjang garis yang ditampilkan dalam animasi

    function frame() {
        if (currentIndex < curvePoints.length) {
            // Hitung segmen yang akan ditampilkan
            const start = Math.max(0, currentIndex - segmentLength);
            const segment = curvePoints.slice(start, currentIndex + 1);

            // Set state dengan garis animasi baru
            setAnimatedLine((prev) => ({
                ...prev,
                [index]: {
                    type: "Feature",
                    geometry: {
                        type: "LineString",
                        coordinates: segment,
                    },
                    properties: { color },
                },
            }));

            currentIndex++; // Pindah ke titik berikutnya
            requestAnimationFrame(frame); // Lanjutkan animasi
        } else {
            // Reset animasi setelah selesai
            setTimeout(() => {
                currentIndex = 0; // Kembali ke awal
                frame();
            }, 500); // Tambahkan jeda sebelum memulai ulang
        }
    }

    frame(); // Mulai animasi
};


    const geojsonLines = {
        type: "FeatureCollection",
        features: Object.values(animatedLine),
    };

    const geojsonMarkers = {
        type: "FeatureCollection",
        features: coordinates.reduce((acc, v) => {
            acc.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [v.source_lon, v.source_lat],
                },
                properties: { color: v.color },
            });
            acc.push({
                type: "Feature",
                geometry: {
                    type: "Point",
                    coordinates: [v.destination_lon, v.destination_lat],
                },
                properties: { color: v.color },
            });
            return acc;
        }, []),
    };

    const lineLayerStyle = {
        id: "curved-lines",
        type: "line",
        paint: {
            "line-color": ["get", "color"],
            "line-width": 2,
        },
    };

    const markerLayerStyle = {
        id: "markers",
        type: "circle",
        paint: {
            "circle-radius": 5,
            "circle-color": ["get", "color"],
        },
    };

    return (
        <Map
            id="playgroundMap"
            initialViewState={{
                latitude: 0,
                longitude: 0,
                zoom: 1.5,
            }}
            height="100vh"
            mapStyle="mapbox://styles/mapbox/streets-v11"
            projection="globe"
            terrain={{
                source: "raster-dem",
                exaggeration: 1.5,
            }}
            fog={{
                color: "rgb(220, 159, 159)", // Pink fog / lower atmosphere
                "high-color": "rgb(36, 92, 223)", // Blue sky / upper atmosphere
                "horizon-blend": 0.04, // Exaggerate atmosphere (default is .1)
            }}
            fullscreen={true}
        >
            <Source id="markers" type="geojson" data={geojsonMarkers}>
                <Layer {...markerLayerStyle} />
            </Source>
            <Source id="curved-lines" type="geojson" data={geojsonLines}>
                <Layer {...lineLayerStyle} />
            </Source>
        </Map>
    );
}

