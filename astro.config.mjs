// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    fonts: [
        {
            name: "IBM Plex Mono",
            cssVariable: "--font-ibm-plex-mono",
            provider: fontProviders.google(),
            weights: [
                400,
                700
            ]
        },
        {
            name: "Comfortaa",
            cssVariable: "--font-comfortaa",
            provider: fontProviders.google(),
            weights: [
                300,
                700
            ]
        }
    ]
});
