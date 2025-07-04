# swagger2types

<p align="center">
	<a href="http://npmjs.com/package/swagger2types"><img alt="📦 npm version" src="https://img.shields.io/npm/v/swagger2types?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

A TypeScript utility that converts Swagger/OpenAPI specifications into pure TypeScript types for type-safe API route handling. The generated types are completely erasable at runtime, adding zero overhead to your JavaScript bundle.

## Overview

`swagger2types` transforms your Swagger/OpenAPI specs into a structured TypeScript interface that provides:

- **Type-safe route definitions** with method, path, and parameter types
- **Request/Response type mapping** for each endpoint
- **Template literal types** for parameterized paths
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

## Generated Type Structure

The tool generates a `Routes` type that maps each API endpoint to its request and response types:

```typescript
export type Routes = {
  ['GET /users']: {
    Request: {
      method?: 'GET';
      path?: '/users';
      query?: { page?: number; limit?: number };
    };
    Response: User[];
  };
  ['POST /users/${userId}/posts']: {
    Request: {
      method?: 'POST';
      path?: '/users/${userId}/posts';
      typedPath?: `/users/${string}/posts`;
      params: { userId: string };
      body: CreatePostRequest;
    };
    Response: Post;
  };
  // ... more routes
};
```

## But Why?

The goal of this project is to provide the Swagger/OpenAPI spec as a simple TypeScript type that can be used to create type-safe API requests without any runtime overhead. This allows developers to leverage the power of the TypeScript type system while working with APIs defined by Swagger/OpenAPI specifications.

Most other libraries generate the client as well but that adds unnecessary complexity and choice for example using fetch, axios, or other HTTP clients. How the response is wrapped, how errors are handled, how the request is made, etc. This library focuses solely on generating the type definitions needed to make type-safe API requests. No runtime code is generated, it's up to you to use the generated types to create your own API clients.

Another pain point is that other generators make it difficult to get a simple list of methods and paths, the service will have something like `client.getAllUsers()` and `client.getUser(id)` but doesn't expose what endpoint map to which functions. Most users coming from the backend side don't know how this translates and instead would just like to have an API along the lines of `makeRequest('GET /users')` or `makeRequest('POST /users/${userId}/posts', { body: { title: 'Hello' } })`. This library provides a simple way to do that.

Take a look at the [this utils file](./examples/esm/swagger-utils.ts) which provides some TypeScript magic to convert the generated `Routes` type into a type-safe request `prepare` function (this file does some TypeScript voodoo you don't need to understand but is required for creating type aware clients). Once you have the request parts, it's easy to use any HTTP client to make the request. For example there's a [fetch client examples](./examples//esm/clientTypes/fetch.ts), you can play around with to see how this works.

There are so many various use cases for consuming/wrapping some spec, that could be in a BFF, in an MCP, or just as some api provider in the browser. This library aims to provide a simple, type-safe way to extract the minimal necessary types from a Swagger/OpenAPI for any use case.

## How to use this library

In practice, you would typically:

1. Generate whatever types from your Swagger/OpenAPI spec using the `generate` function or via the cli.
2. Copy something like [this helper](./examples/esm/swagger-utils.ts) to your project to help you prepare requests. Treat this file as a TypeScript magic black box.
3. Create a `clients.ts` file that imports the generated types and uses the helper to create type-safe clients for your APIs. You'll essentially be copying [this file](./examples/esm/clientTypes/fetch.ts) and modifying it to suit your needs.
4. You'll import the `client.ts` file in your application code to use the type-safe API clients.

## How It Works

1. **Spec Processing**: Accepts a Swagger/OpenAPI specification object with proper TypeScript typing
2. **Code Generation**: Uses `swagger-typescript-api` with a custom EJS template to generate TypeScript types
3. **Route Mapping**: Creates a structured `Routes` type that maps each endpoint to its request/response types
4. **Type Extraction**: Removes export statements and re-exports only the `Routes` type

## Features

### Template Literal Path Types

For parameterized routes, the tool generates template literal types that preserve parameter information:

```typescript
// Original path: /users/{userId}/posts/{postId}
// Generated typedPath: `/users/${string}/posts/${string}`
```

### Request Type Composition

Each route's request type includes relevant properties:

- `method` - HTTP method (GET, POST, etc.)
- `path` - Original path string
- `typedPath` - Template literal version (for parameterized paths)
- `params` - Path parameters
- `query` - Query parameters
- `headers` - Required headers
- `body` - Request body

### Zero Runtime Cost

All generated types are pure TypeScript interfaces and type aliases. They provide compile-time safety without adding any JavaScript code to your bundle.

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
const petstoreFetcher: TypeHelper<Petstore>['Request'] = genericFetcher(
  'https://petstore.swagger.io/v2/'
);
const starWarsFetcher: TypeHelper<StarWars>['Request'] = genericFetcher(
  'https://swapi.profiq.com'
);

petstoreFetcher({
  route: 'GET /pet/${petId}',
  request: {
    params: { petId: 1 },
  },
}).then((pet) => console.log({ pet }));

starWarsFetcher({
  route: 'GET /api/people/${id}',
  request: {
    params: { id: 1 },
  },
}).then((person) => console.log({ person }));
```

[Play around with this example in stackblitz](https://stackblitz.com/github/kolodny/swagger2types?file=examples%2Fesm%2FclientTypes%2Ffetch.ts)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.
