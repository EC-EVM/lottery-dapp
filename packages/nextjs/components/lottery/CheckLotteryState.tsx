import { useState } from "react";
import { abi } from "../../../lottery/artifacts/contracts/Lottery.sol/Lottery.json";
import { useReadContract } from "wagmi";

export const CheckLotteryState = () => {
  const [lotteryAddress, setLotteryAddress] = useState("");

  const { data: betsOpen } = useReadContract({
    address: lotteryAddress,
    abi: abi,
    functionName: "betsOpen",
  });

  const { data: betsClosingTime } = useReadContract({
    address: lotteryAddress,
    abi: abi,
    functionName: "betsClosingTime",
  });

  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Check Lottery State</h2>
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
        {betsOpen !== undefined && <div>State: {betsOpen ? "open" : "closed"}</div>}
        {betsOpen == true && betsClosingTime !== undefined && (
          <div>Closing Time: {new Date(Number(betsClosingTime) * 1000).toLocaleString()}</div>
        )}
      </div>
    </div>
  );
};
