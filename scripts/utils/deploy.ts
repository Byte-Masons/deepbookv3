import { Transaction } from '@iota/iota-sdk/transactions';
import { publishPackage } from './utils';

// Create a new transaction block
const tx = new Transaction();

// Path to your DeepBook Move package
const packagePath = '../../packages/token';

// Optional: Path to custom config
const configPath = './iota.config.js';

// Publish the package
publishPackage(tx, packagePath);
