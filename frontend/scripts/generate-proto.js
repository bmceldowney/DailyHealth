import protobuf from 'protobufjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const protoPath = path.resolve(__dirname, '../../backend/proto/health.proto');
const outputPath = path.resolve(__dirname, '../src/proto');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}

// Load and parse the proto file
protobuf.load(protoPath, (err, root) => {
  if (err) {
    console.error('Error loading proto file:', err);
    process.exit(1);
  }

  // Generate JavaScript code
  const jsCode = root.toJSON();
  fs.writeFileSync(
    path.join(outputPath, 'health_pb.js'),
    `export default ${JSON.stringify(jsCode, null, 2)};`
  );

  // Generate TypeScript definitions
  const tsCode = `export interface HealthRequest {
  name: string;
}

export interface HealthResponse {
  status: string;
  message: string;
}

export interface HealthService {
  getHealthStatus(request: HealthRequest): Promise<HealthResponse>;
}`;

  fs.writeFileSync(path.join(outputPath, 'health_pb.d.ts'), tsCode);

  console.log('Proto files generated successfully!');
}); 