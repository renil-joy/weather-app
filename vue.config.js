module.exports = {
    pwa: {
        workboxPluginMode: "GenerateSW",
        workboxOptions: {
            navigateFallback: '/index.html',
            runtimeCaching: [
                {
                    urlPattern: new RegExp('^https://maps.googleapis.com/maps/api/geocode/json'),
                    handler: 'networkFirst',
                    options: {
                        networkTimeoutSeconds: 20,
                        cacheName: 'api-googlecache',
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }

                },
                {
                    urlPattern: new RegExp('^https://api.darksky.net/forecast/'),
                    handler: 'networkFirst',
                    options: {
                        networkTimeoutSeconds: 20,
                        cacheName: 'api-darkskycache',
                        cacheableResponse: {
                            statuses: [0, 200]
                        }
                    }

                }
            ]
        }
    }
}