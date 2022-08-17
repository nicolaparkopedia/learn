import vue from "@vitejs/plugin-vue";

export default ({command}) => ({
    base: command === "serve" ? "" : "/build/",
    publicDir: "fake_dir_so_nothing_gets_copied",
    sourcemap: true,
    build: {
        manifest: true,
        outDir: "./public/build/",
        rollupOptions: {
            input: "src/main.js"
        }
    },
    plugins: [
        vue()
    ],
    server: {
        port: 3001,
        hmr: {
            host: "localhost"
        }
    }
});
