module.exports = {
    transformIgnorePatterns: [
        'node_modules/(?!' + 
            [
                'node-fetch',
                'fetch-blob',
                'data-uri-to-buffer',
                'jest-runtime',
                'formdata-polyfill'
            ].join('|') +
        ')',
    ],
}