// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0
import { Transaction } from "@mysten/sui/transactions";
import { prepareMultisigTx } from "../utils/utils";
import { adminCapOwner, adminCapID } from "../config/constants";
import { DeepBookClient } from "@mysten/deepbook-v3";
import { getFullnodeUrl, SuiClient } from "@mysten/sui/client";

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
    client: new SuiClient({
      //url: getFullnodeUrl(env),
      url: iotaTestnetUrl,
    }),
    balanceManagers: balanceManagers,
    adminCap: adminCapID[env],
  });

  const tx = new Transaction();

  dbClient.deepBookAdmin.createPoolAdmin({
    baseCoinKey: "TYPUS",
    quoteCoinKey: "SUI",
    tickSize: 0.00001,
    lotSize: 0.1,
    minSize: 1,
    whitelisted: false,
    stablePool: false,
  })(tx);

  let res = await prepareMultisigTx(tx, env, adminCapOwner[env]);

  console.dir(res, { depth: null });
})();
