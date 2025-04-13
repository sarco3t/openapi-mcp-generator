# OpenAPI to MCP Generator (openapi-mcp-generator)

[![npm version](https://img.shields.io/npm/v/openapi-mcp-generator.svg)](https://www.npmjs.com/package/openapi-mcp-generator)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub repository](https://img.shields.io/badge/GitHub-harsha--iiiv/openapi--mcp--generator-blue.svg)](https://github.com/harsha-iiiv/openapi-mcp-generator)

Generate [Model Context Protocol (MCP)](https://modelcontextprotocol.github.io/) servers from OpenAPI specifications.

This CLI tool automates the generation of MCP-compatible servers that proxy requests to existing REST APIs—enabling AI agents and other MCP clients to seamlessly interact with your APIs using either standard input/output or HTTP-based transport.

---

## ✨ Features

- 🔧 **OpenAPI 3.0 Support**: Converts any OpenAPI 3.0+ spec into an MCP-compatible server.
- 🔁 **Proxy Behavior**: Proxies calls to your original REST API while validating request structure and security.
- 🔐 **Authentication Support**: API keys, Bearer tokens, Basic auth, and OAuth2 supported via environment variables.
- 🧪 **Zod Validation**: Automatically generates Zod schemas from OpenAPI definitions for runtime input validation.
- ⚙️ **Typed Server**: Fully typed, maintainable TypeScript code output.
- 💬 **Stdio & Web Transport**: Communicate over stdio or HTTP (beta, SSE support).
- 🧰 **Project Scaffold**: Generates a complete Node.js project with `tsconfig.json`, `package.json`, and entry point.
- 🧪 **Built-in HTML Test Client** *(Web mode)*: Test API interactions visually in your browser.

---

## 🚀 Installation

```bash
npm install -g openapi-mcp-generator
```

> You can also use `yarn global add openapi-mcp-generator` or `pnpm add -g openapi-mcp-generator`

---

## 🛠 Usage

```bash
# Generate an MCP server (stdio)
openapi-mcp-generator --input path/to/openapi.json --output path/to/output/dir

# Generate an MCP web server (beta)
openapi-mcp-generator --input path/to/openapi.json --output path/to/output/dir --transport=web --port=3000
```

### CLI Options

| Option             | Alias | Description                                                                                         | Default                         |
|--------------------|-------|-----------------------------------------------------------------------------------------------------|---------------------------------|
| `--input`          | `-i`  | Path or URL to OpenAPI specification (YAML or JSON)                                                  | **Required**                    |
| `--output`         | `-o`  | Directory to output the generated MCP project                                                        | **Required**                    |
| `--server-name`    | `-n`  | Name of the MCP server (`package.json:name`)                                                         | OpenAPI title or `mcp-api-server` |
| `--server-version` | `-v`  | Version of the MCP server (`package.json:version`)                                                   | OpenAPI version or `1.0.0`      |
| `--base-url`       | `-b`  | Base URL for API requests. Required if OpenAPI `servers` missing or ambiguous.                       | Auto-detected if possible       |
| `--transport`      | `-t`  | Transport mode: `"stdio"` (default) or `"web"` (beta)                                                | `"stdio"`                       |
| `--port`           | `-p`  | Port for web server mode                                                                             | `3000`                          |
| `--force`          |       | Overwrite existing files in the output directory without confirmation                                | `false`                         |
---

## 🧱 Project Structure

The generated project includes:

```
<output_directory>/
├── .gitignore
├── package.json
├── tsconfig.json
└── src/
    └── index.ts
```

- Uses `axios`, `zod`, `@modelcontextprotocol/sdk`, and `json-schema-to-zod`
- Secure API key/tokens via environment variables
- Tool generation for each endpoint

---

## 📡 Transport Modes

### Stdio (Default)

Communicates with MCP clients via standard input/output. Ideal for local development or integration with LLM tools.

### Web Server Mode (Beta)

Launches a fully functional HTTP server with:

- Server-Sent Events (SSE) for bidirectional messaging
- REST endpoint for client → server communication
- In-browser test client UI
- Multi-connection support

> ⚠️ **Note**: Web mode is experimental and may have breaking changes in future updates.

---

## 🔐 Environment Variables for Authentication

Configure auth credentials in your environment:

| Auth Type   | Variable Format                                         |
|-------------|----------------------------------------------------------|
| API Key     | `API_KEY_<SCHEME_NAME>`                                  |
| Bearer      | `BEARER_TOKEN_<SCHEME_NAME>`                             |
| Basic Auth  | `BASIC_USERNAME_<SCHEME_NAME>`, `BASIC_PASSWORD_<SCHEME_NAME>` |
| OAuth2      | `OAUTH_CLIENT_ID_<SCHEME_NAME>`, `OAUTH_CLIENT_SECRET_<SCHEME_NAME>`, `OAUTH_SCOPES_<SCHEME_NAME>` |

---

## ▶️ Running the Generated Server

```bash
cd path/to/output/dir
npm install

# Run in stdio mode
npm start

# Run in web server mode (if generated with --transport=web)
npm run start:web
```

---

## ⚠️ Requirements

- Node.js v18 or later

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m "Add amazing feature"`
4. Push and open a PR

📌 Repository: [github.com/harsha-iiiv/openapi-mcp-generator](https://github.com/harsha-iiiv/openapi-mcp-generator)

---

## 📄 License

MIT License — see [LICENSE](./LICENSE) for full details.