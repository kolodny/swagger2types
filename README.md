# swagger2types

<p align="center">
	<a href="http://npmjs.com/package/swagger2types"><img alt="📦 npm version" src="https://img.shields.io/npm/v/swagger2types?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

A TypeScript utility that converts Swagger/OpenAPI specifications into pure TypeScript types for type-safe API route handling. The generated types are completely erased at runtime, adding zero overhead to your JavaScript bundle.

## Overview

`swagger2types` transforms your Swagger/OpenAPI specs into a structured TypeScript interface that provides:

- **Request/Response type mapping** for each endpoint
- **Type-safe route definitions** with body, query, header, and parameter types
- **Zero runtime cost** - all types are erased during compilation

## Installation

```bash
npm install swagger2types
```

## Usage

### CLI Usage

```bash
# From a local file
swagger2types ./api-spec.json > generated/my-api.ts

# From a URL
swagger2types https://api.example.com/swagger.json > generated/my-api.ts

# From stdin
cat api-spec.json | swagger2types > generated/my-api.ts
```

### Programmatic Usage

```typescript
import { generate } from 'swagger2types';
import { writeFileSync } from 'fs';

const spec = {
  // Your Swagger/OpenAPI spec
  openapi: '3.0.0',
  // ... rest of spec
};

const generated = await generate(spec);
writeFileSync('./generated/my-api.ts', generated);
```

## Types only

This library only generates TypeScript types that are meant to get fully erased at runtime. You will need to implement your own API calling logic using fetch, axios, or any HTTP client of your choice. [Examples of how to do that are provided in this repo](./examples/esm/swagger-utils.ts).

### Why not bundle a small client?

The goal of this library is to provide the minimal amount of type declarations needed to express your API surface in TypeScript. How that's used is up to you. This simplifies what the responsibilities of this library are. Going from types to making a request is an opinionated path and can change as you level of comfort with Type Level Programming changes, this library doesn't need to change. The only real changes to this library will be to improve the fidelity of the types generated from the OpenAPI spec, for example if we're not handling an edge case of a [Swagger discriminator](https://swagger.io/docs/specification/v3_0/data-models/inheritance-and-polymorphism/#discriminator).

## Generated Type Structure

The tool generates a `Routes` type that maps each API endpoint to its request and response types:

```typescript
export type Routes = {
  ['GET /users']: {
    Request: {
      query?: { page?: number; limit?: number };
    };
    Response: User[];
  };
  ['POST /users/${userId}/posts']: {
    Request: {
      params: { userId: string };
      body: CreatePostRequest;
    };
    Response: Post;
  };
  // ... more routes
};
```

## But Why?

### Optimized for API Structure

Other generators try to provide a client library that exposes idiomatic TypeScript methods for each API endpoint. While this feels like the right approach, it obscures the underlying API structure. Most of the time, you already know the endpoints you want to call and you're forced to hunt down which api method maps to some endpoint (eg `GET /api/users/{userId}` maps to `client.getUser(userId)`).

`swagger2types` keeps things simple by preserving the actual API structure in the type system. You work with routes directly as they appear in your API documentation.

### Zero Runtime Cost

Other libraries generate runtime JavaScript code for each endpoint, which adds up quickly. For example, using `swagger-typescript-api` to generate the Github API client produces over 1MB of compiled JavaScript code (over 200KB minified). This is actual runtime code that ships to your users, not just TypeScript interfaces (the full TypeScript code is actually close to 4MB).

`swagger2types` generates only TypeScript types with zero runtime footprint. If you opt to use the helpers from [the example](./examples/esm/swagger-utils.ts) with the [instantiated clients](./examples/esm/clientTypes/fetch.ts), the entire library's impact on your bundle is under 1KB, regardless of how large your API spec is. Whether your API has 10 endpoints or 1,000, the compiled JavaScript bundle size remains unchanged since types are erased during compilation.

**This library only generates types and no runtime code. You will need to implement your own API calling logic using fetch, axios, or any HTTP client of your choice. [Examples of how to do that are provided in this repo](./examples/esm/swagger-utils.ts).**

#### Comparison of Bundle Sizes

The examples folder has a [vite-project](./examples/vite-project/) that has a [swagger2types](./examples/vite-project/src/swagger2types.tsx) lazy loaded React component as well as a version that uses [swagger-typescript-api](./examples/vite-project/src/swagger-typescript-api.tsx). Looking at the built output of both versions, you can see the difference in bundle sizes:

```
$ npm run build

> vite-project@0.0.0 build
> vite build

vite v7.0.2 building for production...
✓ 38 modules transformed.
dist/index.html                                   0.39 kB │ gzip:  0.27 kB
dist/assets/none-lRNKPwMV.js                      0.51 kB │ gzip:  0.27 kB
dist/assets/swagger2types-BkBWp9Hm.js             1.66 kB │ gzip:  0.89 kB
dist/assets/swagger-typescript-api-t86z52Ap.js  183.91 kB │ gzip: 19.89 kB
dist/assets/index-DaW9oWXJ.js                   188.93 kB │ gzip: 59.62 kB
✓ built in 850ms
```

In this example, the `swagger2types` version is only 1.66 kB minified and 0.89 kB gzipped, while the `swagger-typescript-api` version is 183.91 kB minified and 19.89 kB gzipped. The runtime cost for `swagger2types` remains the same (under 1kB) no matter how many APIs you add (or how large they are).

### Flexibility

Other libraries make many choices for you - which HTTP client to use, how to handle errors, how to wrap responses, etc. This library leaves those choices up to you. You can use any HTTP client you want and handle errors and responses in whatever way makes sense for your application.

The [examples](./examples/esm/clientTypes/) folder contains some example clients you can use as a starting point.

### Framework Agnostic

Since `swagger2types` only generates types, it works seamlessly with any JavaScript framework or library. Use it with React, Vue, Angular, Express, Next.js, ESM, CJS, Bun, or any other technology without compatibility concerns.

### Easy Integration with Existing Code

Adding type safety to existing API calls is straightforward - no need to refactor your codebase to use a specific client library. You can gradually adopt these types in your existing fetch/axios calls with minimal changes to your code structure.

## How to use this library

In practice, you would typically:

1. Generate whatever types from your Swagger/OpenAPI spec using the `generate` function or via the cli.
2. Copy the base types and the specific flavor client generator from [this helper](./examples/esm/swagger-utils.ts). Treat this file as a TypeScript magic black box. If the flavor you want to use is not supported, you can create your own helper by following the same pattern (ChatGPT should have no trouble with this).
3. Create a `clients.ts` file that imports the generated types and uses the helper to create type-safe clients for your APIs. You'll essentially be copying [this file](./examples/esm/clientTypes/fetch.ts) and modifying it to suit your needs.
4. You'll import your copy of that `client.ts` file in your application code to use the type-safe API clients.

Here's a quick demo of what this gives you:

![Demo](./assets/demo.gif)

## How It Works

1. **Spec Processing**: Accepts a Swagger/OpenAPI specification object with proper TypeScript typing
2. **Code Generation**: Uses `swagger-typescript-api` with a custom EJS template to generate TypeScript types
3. **Route Mapping**: Creates a structured `Routes` type that maps each endpoint to its request/response types
4. **Type Extraction**: Removes export statements and re-exports only the `Routes` type

## Features

### Request Type Composition

Each route's request type includes relevant properties:

- `params` - Path parameters
- `query` - Query parameters
- `headers` - Required headers
- `body` - Request body

## Development

```bash
# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Test individual module systems
npm run test:esm
npm run test:cjs

# Clean build artifacts
npm run clean
```

## Examples

The `examples/` directory contains working examples:

- **ESM Example** [`examples/esm/`](./examples/esm/)): ESM usage with various APIs. [generated fetch client](./examples/esm/clientTypes/fetch.ts) includes some examples of how to use the generated types with fetch.
- **CJS Example** [`examples/cjs](./examples/cjs/): ES Module usage with GitHub API, includes `generated.ts` output.

The generated `Routes` type for the Github spec contains over 1,000 API endpoints with full type safety for parameters, request bodies, headers, response types, and more.

## Example of Type-Safe API Requests

The [fetcher clients](./examples/esm/clientTypes/fetch.ts) allow making type safe API to various APIs like GitHub, Petstore, and Star Wars API. Here's a quick example of how to use the generated types with a fetch client:

```typescript
export const petFetcher = clientFromFetch<Petstore>({
  baseUrl: 'https://petstore.swagger.io/v2/',
});
export const starWarsFetcher = clientFromFetch<StarWars>({
  baseUrl: 'https://swapi.profiq.com',
});

petFetcher('GET /pet/${petId}', {
  params: { petId: 1 },
}).then((pet) => console.log({ pet }));

starWarsFetcher('GET /api/people/${id}', {
  params: { id: 1 },
}).then((person) => console.log({ person }));
```

[Play around with this example in stackblitz](https://stackblitz.com/github/kolodny/swagger2types?file=examples%2Fesm%2FclientTypes%2Ffetch.ts)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.
