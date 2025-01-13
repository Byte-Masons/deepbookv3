import { Transaction } from '@mysten/sui/transactions';
import { publishPackage } from './utils';

// Create a new transaction block
const tx = new Transaction();

// Path to your DeepBook Move package
const packagePath = '../../packages/token';

// Optional: Path to custom config
const configPath = './sui.config.js';

// Publish the package
publishPackage(tx, packagePath);
