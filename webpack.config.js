const path = require('path');

module.exports = {
    mode: 'production',
    entry: ['./typescript.ts'],
    output: {
      filename: 'main.es5.js',
      path: path.resolve(__dirname, 'public'),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    targets: {
                      browsers: [
                        '> 1%',
                        'last 2 versions',
                        'Firefox ESR',
                        'ie 11',
                      ],
                    },
                  },
                ],
              ],
            },
          },
        }, {
          test: /\.ts$/,
          use: {
            loader: 'ts-loader',
            options: {
              compilerOptions: {
                transpileOnly: true,
                noImplicitAny: true,
                noEmitOnError: true,

                module: 'es6',
                target: 'es5',
                allowJs: true,
                checkJs: true,
              },
            },
          },
          include: '/',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
  };
