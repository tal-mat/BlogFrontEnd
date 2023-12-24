const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/unsplash', // Your proxy endpoint, you can change it if needed
        createProxyMiddleware({
            target: 'https://api.unsplash.com',
            changeOrigin: true,
            pathRewrite: {
                '^/unsplash': '', // Remove the /unsplash prefix when forwarding the request
            },
        })
    );
};
