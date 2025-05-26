/** @type {import('@remix-run/dev').AppConfig} */
export default {
    appDirectory: "app",
    assetsBuildDirectory: "public/build",
    publicPath: "/build/",
    serverBuildPath: "build/index.js", // 👈 needed by remix-serve
    serverModuleFormat: "cjs",         // 👈 remix-serve requires CommonJS
};