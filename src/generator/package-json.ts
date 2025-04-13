/**
 * Generates the content of package.json for the MCP server
 * 
 * @param serverName Server name
 * @param serverVersion Server version
 * @param includeWebDeps Whether to include web server dependencies
 * @returns JSON string for package.json
 */
export function generatePackageJson(
    serverName: string, 
    serverVersion: string,
    includeWebDeps: boolean = false
): string {
    const packageData: any = {
        name: serverName,
        version: serverVersion,
        description: `MCP Server generated from OpenAPI spec for ${serverName}`,
        private: true,
        type: "module",
        main: "build/index.js",
        files: [ "build", "src" ],
        scripts: {
            "start": "node build/index.js",
            "build": "tsc && chmod 755 build/index.js",
            "typecheck": "tsc --noEmit",
            "prestart": "npm run build"
        },
        engines: {
            "node": ">=20.0.0"
        },
        dependencies: {
            "@modelcontextprotocol/sdk": "^1.9.0",
            "axios": "^1.8.4",
            "dotenv": "^16.4.5",
            "zod": "^3.24.2",
            "json-schema-to-zod": "^2.4.1"
        },
        devDependencies: {
            "@types/node": "^18.19.0",
            "typescript": "^5.8.3"
        }
    };
    
    // Add web server dependencies if needed
    if (includeWebDeps) {
        packageData.dependencies = {
            ...packageData.dependencies,
            "express": "^4.18.2",
            "cors": "^2.8.5",
            "uuid": "^11.1.0"
        };
        
        packageData.devDependencies = {
            ...packageData.devDependencies,
            "@types/express": "^4.17.21",
            "@types/cors": "^2.8.17",
            "@types/uuid": "^10.0.0"
        };
        
        // Add a script to start in web mode
        packageData.scripts["start:web"] = "node build/index.js --transport=web";
    }
    
    return JSON.stringify(packageData, null, 2);
}