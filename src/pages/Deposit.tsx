import { BigNumber } from "ethers";
import React from "react";
import {
  useContractWrite,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from "wagmi";
import configAddress from "../config/config";
import stakingAbi from "../contracts/staking-abi.json";

export default function Deposit() {
  const { config } = usePrepareContractWrite({
    addressOrName: configAddress.stakingAddress,
    contractInterface: stakingAbi,
    functionName: "deposit",
    args: BigNumber.from(`${1e20}`),
    onError(err) {
      window.alert(err?.message);
    },
  });

  const { write, data, isLoading, error } = useContractWrite(config);

  console.log(write);

  return (
    <div>
      <button
        className="bg-green-400 text-white p-2"
        onClick={() => !!write && write()}
      >
        Deposit
      </button>
      {isLoading && <div>Check Wallet</div>}
      {/* {isSuccess && <div>Transaction: {JSON.stringify(data)}</div>} */}
    </div>
  );
}
