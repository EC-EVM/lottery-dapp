import { useState } from "react";
import LotteryABI from "../../../lottery/artifacts/contracts/Lottery.sol/Lottery.json";
import { parseEther } from "viem";
import { useAccount, useWaitForTransactionReceipt, useWriteContract } from "wagmi";

export function BuyTokens({ contractAddress }: { contractAddress: `0x${string}` }) {
  const [value, setValue] = useState("");
  const { address } = useAccount();

  const { writeContract, data: hash } = useWriteContract();

  const { isLoading: isBuying, isSuccess: isBuySuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleBuyTokens = () => {
    if (!address) {
      alert("Please connect your wallet first.");
      return;
    }

    writeContract({
      address: contractAddress,
      abi: LotteryABI.abi,
      functionName: "purchaseTokens",
      args: [],
      value: parseEther(value),
    });
  };

  return (
    <div className="my-2">
      <h3 className="text-lg font-bold mb-2">Buy Tokens:</h3>
      <div className="flex flex-col">
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder="Enter ETH amount"
          className="input input-bordered w-full mb-2"
        />
        <button onClick={handleBuyTokens} disabled={isBuying || !value} className="btn btn-primary w-full">
          {isBuying ? "Buying..." : "Buy Tokens"}
        </button>
        {isBuySuccess && <p className="text-green-500 mt-2">Tokens purchased successfully!</p>}
      </div>
    </div>
  );

  // const { data, isError, error, isPending, isSuccess, writeContract } = useWriteContract();
  const { data, isError, error, isPending, isSuccess } = useWriteContract();
  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Buying Tokens</h2>

        {/*
        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter the address for the ballot:</span>
          </label>
          <input
            type="text"
            placeholder="0x...."
            className="input input-bordered w-full max-w-xs"
            value={ballotAddress}
            onChange={e => setballotAddress(e.target.value)}
          />
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter the index of your chosen proposal:</span>
          </label>
          <input
            type="text"
            placeholder="2"
            className="input input-bordered w-full max-w-xs"
            value={proposalIndex}
            onChange={e => setproposalIndex(e.target.value)}
          />
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter your vote amount for this proposal:</span>
          </label>
          <input
            type="text"
            placeholder="100"
            className="input input-bordered w-full max-w-xs"
            value={voteAmount}
            onChange={e => setvoteAmount(e.target.value)}
          />
        </div>
        
        <button
          className="btn btn-active btn-neutral"
          disabled={isPending}
          onClick={() =>
            writeContract({
              abi: [
                {
                  inputs: [
                    {
                      internalType: "uint256",
                      name: "proposal",
                      type: "uint256",
                    },
                    {
                      internalType: "uint256",
                      name: "amount",
                      type: "uint256",
                    },
                  ],
                  name: "vote",
                  outputs: [],
                  stateMutability: "nonpayable",
                  type: "function",
                },
              ],
              address: ballotAddress,
              functionName: "vote",
              args: [BigInt(proposalIndex), BigInt(voteAmount)],
            })
          }
        >
          Vote
        </button>
        */}
        {isSuccess && (
          <div>
            Transaction hash:{" "}
            <a href={`https://sepolia.etherscan.io/tx/${data}`} target="_blank">
              {data}
            </a>
          </div>
        )}
        {/* {isError && <div>Error voting: {error.shortMessage}</div>} */}
      </div>
    </div>
  );
}
