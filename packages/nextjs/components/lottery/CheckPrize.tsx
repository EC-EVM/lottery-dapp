import { useState } from "react";
import { abi } from "../../../lottery/artifacts/contracts/Lottery.sol/Lottery.json";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";

export const CheckPrize = () => {
  const [lotteryAddress, setLotteryAddress] = useState("");
  const [bettorAddress, setBettorAddress] = useState("");

  const { data: bettorPrize } = useReadContract({
    address: lotteryAddress,
    abi: abi,
    functionName: "prize",
    args: [bettorAddress],
  });

  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Check Lottery Prize</h2>
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
            <span className="label-text">Enter the bettor's address:</span>
          </label>
          <input
            type="text"
            placeholder="0x...."
            className="input input-bordered w-full max-w-xs"
            value={bettorAddress}
            onChange={e => setBettorAddress(e.target.value)}
          />
        </div>
        {bettorPrize !== undefined && <div>Prize: {formatEther(bettorPrize as bigint)}</div>}
      </div>
    </div>
  );
};
