# react-redux-hapi

This is an example server that uses Hapi for the server and generating HTML from
React/Redux which then get picked up client side.

I thought I'd save this even though it doesn't do much and isn't any sort of
new or novel approach. But it is likely to be something that I look back on in
the future to remember how I did something or to copy/paste some part from.

### Prereqs

- npm 5
- node 8


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
NODE_ENV=production npm start
```
