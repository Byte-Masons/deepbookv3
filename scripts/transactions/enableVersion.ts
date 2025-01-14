// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { Transaction } from '@iota/iota-sdk/transactions';
import { prepareMultisigTx } from '../utils/utils';
import { adminCapOwner, adminCapID } from '../config/constants';
import { DeepBookClient } from 'deepbook-v3-iota';
import { getFullnodeUrl, IotaClient } from '@iota/iota-sdk/client';

(async () => {
	// Update constant for env
	const env = 'mainnet';
	const versionToEnable = 2;

	// Initialize with balance managers if needed
	const balanceManagers = {
		MANAGER_1: {
			address: '',
			tradeCap: '',
		},
	};

	const dbClient = new DeepBookClient({
		address: '0x0',
		env: env,
		client: new IotaClient({
			url: getFullnodeUrl(env),
		}),
		balanceManagers: balanceManagers,
		adminCap: adminCapID[env],
	});

	const tx = new Transaction();

	dbClient.deepBookAdmin.enableVersion(versionToEnable)(tx);

	let res = await prepareMultisigTx(tx, env, adminCapOwner[env]);

	console.dir(res, { depth: null });
})();
