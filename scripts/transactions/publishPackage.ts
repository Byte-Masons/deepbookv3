import { getFullnodeUrl, IotaClient } from "@iota/iota-sdk/client";
import { Transaction } from "@iota/iota-sdk/transactions";
// import { Ed25519Keypair } from "@iota/iota-sdk/keypairs/ed25519";
// import { execSync } from "child_process";
import { hasGas, requestGasFromFaucet, publishPackage } from "../utils/utils";

const NETWORK = "localnet";
// const MNEMONIC =
//     "company antique divert potato anchor involve unhappy sail social replace grunt robust";
// const keypair = Ed25519Keypair.deriveKeypair(MNEMONIC);
// const MY_ADDRESS = keypair.getPublicKey().toIotaAddress();

// create a new IotaClient object pointing to the network you want to use
const iotaClient = new IotaClient({ url: getFullnodeUrl(NETWORK) });

(async () => {
    // Gets gas from the faucet if needed
    if (!(await hasGas(NETWORK))) {
        await requestGasFromFaucet(NETWORK);
    }

    // Publish the package
    const tx = new Transaction();
    const packagePath = '../packages/deepbook';

    publishPackage(tx, packagePath);
    
})();

/*//////////////////////////////////////////////////////////////
                            TRANSACTION
//////////////////////////////////////////////////////////////*/

// const tx = new Transaction();

// const { modules, dependencies } = JSON.parse(
//     execSync(
//         `iota move build --dump-bytecode-as-base64 --with-unpublished-dependencies --path ../deepbookv3/packages/deepbook`,
//         {
//             encoding: "utf-8",
//         }
//     )
// );
// const upgradeCap = tx.publish({
//     modules,
//     dependencies,
// });
// tx.transferObjects([upgradeCap], MY_ADDRESS);

// const result = await iotaClient.signAndExecuteTransaction({
//     signer: keypair,
//     transaction: tx,
//     options: {
//         // showEffects: true,
//         showObjectChanges: true,
//     },
// });
// console.log(result);
