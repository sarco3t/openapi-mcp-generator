# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-04-12

### Added
- Runtime argument validation using Zod
- JSON Schema to Zod schema conversion
- Improved error handling and formatting
- TypeScript strict mode enabled
- Buildable project structure with proper TypeScript configuration
- Enhanced project documentation
- Better support for OpenAPI request body handling
- Support for multiple content types

### Changed
- Simplified transport layer to only support stdio transport
- Removed support for WebSocket and HTTP transports
- Updated to use @modelcontextprotocol/sdk v1.9.0
- Improved CLI interface with better error messages
- Enhanced type safety throughout the codebase
- Better handling of path parameters and query strings
- More robust OpenAPI schema processing

### Fixed
- Path parameter resolution in URLs
- Content-Type header handling
- Response processing for different content types
- Schema validation error messages
- Building and packaging issues

## [1.0.0] - Initial Release

### Added
- Basic OpenAPI to MCP server generation
- Support for GET, POST, PUT, DELETE methods
- Basic error handling
- Simple CLI interface
- Basic TypeScript support