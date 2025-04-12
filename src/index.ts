#!/usr/bin/env node

import { Command } from 'commander';
import SwaggerParser from '@apidevtools/swagger-parser';
import type { OpenAPIV3 } from 'openapi-types';
import * as fs from 'fs/promises';
import * as path from 'path';
import {
    generateMcpServerCode,
    generatePackageJson,
    generateTsconfigJson,
    generateGitignore
} from './generator.js';

interface CliOptions {
  input: string;
  output: string;
  serverName?: string;
  serverVersion?: string;
  baseUrl?: string;
}

const program = new Command();

program
  .name('openapi-mcp-generator')
  .description('Generates a buildable MCP server project (TypeScript) from an OpenAPI specification')
  // Ensure these option definitions are robust
  .requiredOption('-i, --input <file_or_url>', 'Path or URL to the OpenAPI specification file (JSON or YAML)')
  .requiredOption('-o, --output <directory>', 'Path to the directory where the MCP server project will be created (e.g., ./petstore-mcp)')
  .option('-n, --server-name <name>', 'Name for the generated MCP server package (default: derived from OpenAPI info title)')
  .option('-v, --server-version <version>', 'Version for the generated MCP server (default: derived from OpenAPI info version or 0.1.0)')
  .option('-b, --base-url <url>', 'Base URL for the target API. Required if not specified in OpenAPI `servers` or if multiple servers exist.')
  .version('2.0.0'); // Match package.json version

// Parse arguments explicitly from process.argv
// This is generally the most reliable way
program.parse(process.argv);

// Retrieve the options AFTER parsing
const options = program.opts<CliOptions>();

async function main() {
  // Use the parsed options directly
  const outputDir = options.output;
  const inputSpec = options.input; // Use the parsed input value

  const srcDir = path.join(outputDir, 'src');
  const serverFilePath = path.join(srcDir, 'index.ts');
  const packageJsonPath = path.join(outputDir, 'package.json');
  const tsconfigPath = path.join(outputDir, 'tsconfig.json');
  const gitignorePath = path.join(outputDir, '.gitignore');

  try {
    // Use the correct inputSpec variable
    console.error(`Parsing OpenAPI spec: ${inputSpec}`);
    const api = await SwaggerParser.dereference(inputSpec) as OpenAPIV3.Document;
    console.error('OpenAPI spec parsed successfully.');

    // Use options directly for name/version/baseUrl determination
    const serverNameRaw = options.serverName || api.info.title || 'my-mcp-server';
    const serverName = serverNameRaw.toLowerCase().replace(/[^a-z0-9_-]/g, '-');
    const serverVersion = options.serverVersion || api.info.version || '0.1.0';

    console.error('Generating server code...');
    // Pass inputSpec to generator function if needed for comments, otherwise just options
    const serverTsContent = generateMcpServerCode(api, options, serverName, serverVersion);

    console.error('Generating package.json...');
    const packageJsonContent = generatePackageJson(serverName, serverVersion);

    console.error('Generating tsconfig.json...');
    const tsconfigJsonContent = generateTsconfigJson();

    console.error('Generating .gitignore...');
    const gitignoreContent = generateGitignore();

    console.error(`Creating project directory structure at: ${outputDir}`);
    await fs.mkdir(srcDir, { recursive: true });

    await fs.writeFile(serverFilePath, serverTsContent);
    console.error(` -> Created ${serverFilePath}`);
    await fs.writeFile(packageJsonPath, packageJsonContent);
    console.error(` -> Created ${packageJsonPath}`);
    await fs.writeFile(tsconfigPath, tsconfigJsonContent);
    console.error(` -> Created ${tsconfigPath}`);
    await fs.writeFile(gitignorePath, gitignoreContent);
    console.error(` -> Created ${gitignorePath}`);

    console.error("\n---");
    console.error(`MCP server project '${serverName}' successfully generated at: ${outputDir}`);
    console.error("\nNext steps:");
    console.error(`1. Navigate to the directory: cd ${outputDir}`);
    console.error(`2. Install dependencies: npm install`);
    console.error(`3. Build the TypeScript code: npm run build`);
    console.error(`4. Run the server: npm start`);
    console.error("   (This runs the built JavaScript code in build/index.js)");
    console.error("---");

  } catch (error) {
    console.error('\nError generating MCP server project:', error);
    try {
        await fs.rm(outputDir, { recursive: true, force: true });
        console.error(`Cleaned up partially created directory: ${outputDir}`);
    } catch (cleanupError) {
        console.error(`Failed to cleanup directory ${outputDir}:`, cleanupError);
    }
    process.exit(1);
  }
}

main();