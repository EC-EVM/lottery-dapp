import { useState } from "react";
import { abi, bytecode } from "../../../lottery/artifacts/contracts/Lottery.sol/Lottery.json";
import { parseEther } from "viem";
import { useDeployContract } from "wagmi";

export const DeployLottery = () => {
  const [tokenName, setTokenName] = useState("LotteryToken");
  const [tokenSymbol, setTokenSymbol] = useState("LT0");
  const [purchaseRatio, setPurchaseRatio] = useState(1);
  const [betPrice, setBetPrice] = useState("1");
  const [betFee, setBetFee] = useState("0.2");

  const { data, isError, error, isPending, isSuccess, deployContract } = useDeployContract();
  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Deploy Lottery Contract</h2>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter tokenName:</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={tokenName}
            onChange={e => setTokenName(e.target.value)}
          />
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter tokenSymbol:</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={tokenSymbol}
            onChange={e => setTokenSymbol(e.target.value)}
          />
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter purchaseRatio:</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={purchaseRatio}
            onChange={e => setPurchaseRatio(Number(e.target.value))}
          />
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter betPrice:</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={betPrice}
            onChange={e => setBetPrice(e.target.value)}
          />
        </div>

        <div className="form-control w-full max-w-xs my-4">
          <label className="label">
            <span className="label-text">Enter betFee:</span>
          </label>
          <input
            type="text"
            className="input input-bordered w-full max-w-xs"
            value={betFee}
            onChange={e => setBetFee(e.target.value)}
          />
        </div>

        <button
          className="btn btn-active btn-neutral"
          disabled={isPending}
          onClick={() =>
            deployContract({
              abi: abi,
              bytecode: bytecode as `0x${string}`,
              args: [tokenName, tokenSymbol, purchaseRatio, parseEther(betPrice), parseEther(betFee)],
            })
          }
        >
          Deploy
        </button>
        {isSuccess && (
          <div>
            Transaction hash:{" "}
            <a href={`https://sepolia.etherscan.io/tx/${data}`} target="_blank">
              {data}
            </a>
          </div>
        )}
        {isError && <div>Error deploying contract: {error.message}</div>}
      </div>
    </div>
  );
};
