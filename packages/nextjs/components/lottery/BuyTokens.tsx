import { useState } from "react";
import { abi } from "../../../lottery/artifacts/contracts/Lottery.sol/Lottery.json";
import { parseEther } from "viem";
import { useWriteContract } from "wagmi";

export const BuyTokens = () => {
  const [lotteryAddress, setLotteryAddress] = useState("");
  const [amount, setAmount] = useState(1);
  const [purchaseRatio, setPurchaseRatio] = useState(1);

  const { data, isError, error, isPending, isSuccess, writeContract } = useWriteContract();
  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Buy Tokens</h2>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter the address for the lottery:</span>
          </label>
          <input
            type="text"
            placeholder="0x...."
            className="input input-bordered w-full max-w-xs"
            value={lotteryAddress}
            onChange={e => setLotteryAddress(e.target.value)}
          />
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter the amount:</span>
          </label>
          <input
            type="text"
            placeholder="2"
            className="input input-bordered w-full max-w-xs"
            value={amount}
            onChange={e => setAmount(Number(e.target.value))}
          />
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter the purchase ratio:</span>
          </label>
          <input
            type="text"
            placeholder="2"
            className="input input-bordered w-full max-w-xs"
            value={purchaseRatio}
            onChange={e => setPurchaseRatio(Number(e.target.value))}
          />
        </div>

        <button
          className="btn btn-active btn-neutral"
          disabled={isPending}
          onClick={() => {
            const value = parseEther(amount.toString()) / BigInt(purchaseRatio);
            writeContract({
              abi: abi,
              address: lotteryAddress,
              functionName: "purchaseTokens",
              value: BigInt(value),
            });
          }}
        >
          Purchase
        </button>
        {isSuccess && (
          <div>
            Transaction hash:{" "}
            <a href={`https://sepolia.etherscan.io/tx/${data}`} target="_blank">
              {data}
            </a>
          </div>
        )}
        {isError && <div>Error purchasing: {error.message}</div>}
      </div>
    </div>
  );
};
