import { Transaction } from "@iota/iota-sdk/transactions";
import { adminCapID } from "../config/constants";
import { DeepBookClient } from "deepbook-v3-iota";
import { IotaClient } from "@iota/iota-sdk/client";
import type { Keypair } from '@iota/iota-sdk/cryptography';
import { getSigner, getDeepbookClient } from '../utils/utils';

const createBalanceManager = async (client: DeepBookClient) => {
  const tx = new Transaction();

  client.balanceManager.createAndShareBalanceManager()(tx);

  let resolvedKeypair: Keypair = getSigner();

  const response = await client.client.signAndExecuteTransaction({
    transaction: tx,
    signer: resolvedKeypair,
    options: {
      showEffects: true,
      showObjectChanges: true,
    }
  });

  console.dir(response, { depth: null });
}

(async () => {
  const client: DeepBookClient = getDeepbookClient();

  // Comment out if it already exists
  await createBalanceManager(client);
})();
