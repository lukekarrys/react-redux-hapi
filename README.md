# react-redux-hapi

This is an example server that uses Hapi for the server and generating HTML from
React/Redux which then get picked up client side.

### Prereqs

- npm 5

### Development

```sh
npm install
npm run dev
```

### Production
Make sure any production config values are set in [`client/config/production.js`](./client/config/production.js).

```sh
npm install
NODE_ENV=production npm run build
NODE_ENV=production PORT=4000 npm start
```
