const { resolve } = require("path");
const { defineConfig } = require("vite");

module.exports = defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        modules: resolve(__dirname, "modules.html"),
        //  bookmarks: resolve(__dirname, "pages/bookmarks/bookmarks.html"),
        //  users: resolve(__dirname, "pages/users/users.html"),
      },
    },
  },
});
