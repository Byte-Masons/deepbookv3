// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { Transaction } from "@iota/iota-sdk/transactions";
import { adminCapID } from "../config/constants";
import { DeepBookClient } from "deepbook-v3-iota";
import { IotaClient } from "@iota/iota-sdk/client";
import type { Keypair } from '@iota/iota-sdk/cryptography';
import { getSigner } from '../utils/utils';

(async () => {
  // Update constant for env
  const env = "testnet";

  // Initialize with balance managers if needed
  const balanceManagers = {
    MANAGER_1: {
      address: "",
      tradeCap: "",
    },
  };

  const iotaTestnetUrl = "https://api.testnet.iota.cafe";
  const clientAddress = "0x69d0ed97ad0620655ed5877f397f28d561e09b97f27f876a846b680ea97e3efc";

  const dbClient = new DeepBookClient({
    address: clientAddress,
    env: env,
    client: new IotaClient({
      //url: getFullnodeUrl(env),
      url: iotaTestnetUrl,
    }),
    balanceManagers: balanceManagers,
    adminCap: adminCapID[env],
  });

  const tx = new Transaction();

  dbClient.deepBookAdmin.createPoolAdmin({
    baseCoinKey: "DEEP",
    quoteCoinKey: "IOTA",
    tickSize: 0.00001,
    lotSize: 0.1,
    minSize: 1,
    whitelisted: false,
    stablePool: false,
  })(tx);

  let resolvedKeypair: Keypair = getSigner();

  const response = await dbClient.client.signAndExecuteTransaction({
    transaction: tx,
    signer: resolvedKeypair,
    options: {
      showEffects: true,
      showObjectChanges: true,
    }
  });

  console.dir(response, { depth: null });
})();
