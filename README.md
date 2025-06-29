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
swagger2types ./api-spec.json

# From a URL
swagger2types https://api.example.com/swagger.json

# From stdin
cat api-spec.json | swagger2types
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
writeFileSync('./generated.ts', generated);
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

## Example Usage

Once you've generated your routes, you can use them for type-safe API interactions:

```typescript
import type { Routes } from './generated';

// Extract specific route types
type CreateReactionRoute =
  Routes['POST /orgs/${org}/teams/${teamSlug}/discussions/${discussionNumber}/reactions'];

// Type-safe request construction
const request: CreateReactionRoute['Request'] = {
  body: { content: '+1' },
  params: {
    discussionNumber: 123,
    org: 'my-org',
    teamSlug: 'my-team',
  },
};

// Type-safe response handling
const response = {} as CreateReactionRoute['Response'];
response.user.email; // Fully typed!
```

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

## Project Structure

```
swagger2types/
├── src/
│   ├── index.ts          # Main generation logic
│   ├── cli.ts            # Command-line interface
│   ├── dirname.ts        # Directory resolution (CJS)
│   └── dirname-esm.ts    # Directory resolution (ESM)
├── template/
│   └── extra.ejs         # EJS template for route generation
├── used/                 # Example usage
│   ├── cjs/              # CommonJS example with generated.ts
│   └── esm/              # ES Module example with generated.ts
└── dist/                 # Built output (created during build)
    ├── cjs/              # CommonJS build
    └── esm/              # ES Module build
```

## How It Works

1. **Spec Processing**: Accepts a Swagger/OpenAPI specification object with proper TypeScript typing
2. **Code Generation**: Uses `swagger-typescript-api` with a custom EJS template to generate TypeScript types
3. **Route Mapping**: Creates a structured `Routes` type that maps each endpoint to its request/response types
4. **Type Extraction**: Removes export statements and re-exports only the `Routes` type
5. **Comment Handling**: For specs with comment-like patterns (like GitHub's API), preprocessing is handled in usage examples

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

The `used/` directory contains working examples:

- **CJS Example** (`used/cjs/`): CommonJS usage with GitHub API, includes `generated.ts` output
- **ESM Example** (`used/esm/`): ES Module usage with GitHub API, includes `generated.ts` output

Both examples:

1. Fetch the GitHub API specification from their public endpoint
2. Clean the spec by removing comment-like patterns (`/* */`) that can break JSON parsing
3. Generate comprehensive TypeScript route definitions
4. Demonstrate usage with type-safe request/response handling

The generated `Routes` type includes over 1,000 GitHub API endpoints with full type safety for parameters, request bodies, and response types.

## License

ISC

## Contributing

Contributions are welcome! Please feel free to submit issues and pull requests.
