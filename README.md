## Node-PG

This basic implementation shows how to use [node-postgres][1] with  [`npm` and webpack][2].

### Installation

- Create a new module using `npm`:

```console
npm init
```

- Add `webpack` and plugins:

```console
npm i webpack webpack-cli --save-dev
npm i webpack-dev-server --save-dev
```

- Create directories `src`, and `css`:

```console
mkdir src
mkdir css
```
- Copy `package.json` and `webpack.config.js` files from this repository into your project directory.

- In the `src` directory copy `index.html` and `index.js`

- Install `pg`:
```console
npm i pg@latest
```



- Your directory must look like:
```console
project/
|-css/
    |-style.css
|-src/
    |-app
        |-config
            |-config.js
        |-controller
            |-users.js
        |-model
            |-users.js
        |-router
            |-users.js
        |-server.js
    |-core
        |-db
            |-db.js
|-package.json
|-webpack.config.js
```

- Finally, start the dev server:
```console
npm run start

<i> [webpack-dev-server] Project is running at:
<i> [webpack-dev-server] Loopback: http://localhost:8080/
...
webpack 5.65.0 compiled successfully in 847 ms
```

- Then open `http://localhost:8080/` in your browser.

### Author

Teocci (teocci@yandex.com)

### License

The code supplied here is covered under the MIT Open Source License.


[1]: https://node-postgres.com/
[2]: https://webpack.js.org