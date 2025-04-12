# OpenAPI to MCP Generator (openapi-mcp-generator)

[![npm version](https://img.shields.io/npm/v/openapi-mcp-generator.svg)](https://www.npmjs.com/package/openapi-mcp-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub repository](https://img.shields.io/badge/GitHub-harsha--iiiv/openapi--mcp--generator-blue.svg)](https://github.com/harsha-iiiv/openapi-mcp-generator)

A command-line tool that generates a complete, buildable Model Context Protocol (MCP) server project in TypeScript from an OpenAPI specification. This tool helps you quickly create an MCP server using **stdio transport** that acts as a bridge between LLMs (Large Language Models) and your API.

## Features

-   **Automatic Tool Generation**: Converts each API operation in your OpenAPI spec into an MCP tool within the generated server.
-   **Complete Project Setup**: Generates a full Node.js project structure (`package.json`, `tsconfig.json`, `src/index.ts`, `.gitignore`).
-   **TypeScript & Build Ready**: Creates a TypeScript project configured for building into JavaScript for execution.
-   **Stdio Transport**: Generated server uses standard input/output for communication with the MCP client (e.g., an LLM).
-   **Runtime Argument Validation**: Integrates Zod for validating tool arguments at runtime based on the OpenAPI schema.

## Installation

```bash
# Install globally from npm
npm install -g openapi-mcp-generator

# Or with yarn
yarn global add openapi-mcp-generator

# Or with pnpm
pnpm add -g openapi-mcp-generator
```

## Usage

Generate an MCP server project from an OpenAPI specification:

```bash
openapi-mcp-generator -i <path_or_url_to_openapi> -o <output_directory_path> [options]
```

### Command Line Options

| Option           | Alias | Description                                                                                         | Default                                      |
| :--------------- | :---- | :-------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `--input`        | `-i`  | Path or URL to the OpenAPI specification file (JSON or YAML).                                       | **(Required)**                               |
| `--output`       | `-o`  | Path to the directory where the MCP server project will be created.                                 | **(Required)**                               |
| `--name`         | `-n`  | Name for the generated MCP server package (`package.json`).                                         | Derived from OpenAPI title or `my-mcp-server` |
| `--version`      | `-v`  | Version for the generated MCP server package (`package.json`).                                      | Derived from OpenAPI version or `0.1.0`      |
| `--base-url`     | `-b`  | Base URL for the target API. Required if not in OpenAPI `servers` or if multiple servers specified. | Derived from OpenAPI `servers` if possible   |
| `--help`         | `-h`  | Show help information.                                                                              |                                              |

### Examples

**Generate from a local OpenAPI file:**

```bash
openapi-mcp-generator -i ./specs/my-api.yaml -o ./my-api-mcp-server
```

**Generate from a remote OpenAPI URL, specifying name and base URL:**

```bash
openapi-mcp-generator \
  -i https://petstore3.swagger.io/api/v3/openapi.json \
  -o ./petstore-mcp \
  -n petstore-server \
  -b https://petstore3.swagger.io/api/v3
```

## Generated Project Structure

The tool generates the following structure in the specified output directory:

```
<output_directory>/
├── .gitignore          # Standard Node.js gitignore
├── package.json        # Dependencies and scripts for the generated server
├── tsconfig.json       # TypeScript configuration for building
└── src/
    └── index.ts        # The generated MCP server source code
```

## Using the Generated Server

After generating your MCP server project:

1.  **Navigate to the generated directory:**
    ```bash
    cd <output_directory>
    # e.g., cd ./petstore-mcp
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This installs `@modelcontextprotocol/sdk`, `axios`, `zod`, `json-schema-to-zod`, and `typescript`.

3.  **(Optional) Implement Authentication/Configuration:**
    *   The generator sets the `API_BASE_URL` constant in `src/index.ts` if provided or derived.
    *   You will need to **manually edit `src/index.ts`** to add any necessary API authentication (e.g., setting `Authorization` headers in the `AxiosRequestConfig` using environment variables or other secure methods). Look for the `// Add Authentication logic here if needed` comment within the `CallTool` handler.

4.  **Build the server code:**
    ```bash
    npm run build
    ```
    This compiles the TypeScript code from `src/` into JavaScript in the `build/` directory.

5.  **Start the server:**
    ```bash
    npm start
    ```
    This runs the compiled JavaScript server (`node build/index.js`), which will listen for MCP requests on standard input/output.

## Requirements

-   Node.js v18.0.0 or higher (for both the generator and the generated server)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request to the [GitHub repository](https://github.com/harsha-iiiv/openapi-mcp-generator).

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/amazing-feature`)
3.  Commit your changes (`git commit -m 'Add some amazing feature'`)
4.  Push to the branch (`git push origin feature/amazing-feature`)
5.  Open a Pull Request

## License

[MIT](https://opensource.org/licenses/MIT)
```