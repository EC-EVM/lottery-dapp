import { useState } from "react";
import { abi } from "../../../lottery/artifacts/contracts/Lottery.sol/Lottery.json";
import { useWriteContract } from "wagmi";

export const OpenBets = () => {
  const [lotteryAddress, setLotteryAddress] = useState("");
  const [duration, setDuration] = useState(60);

  const { data, isError, error, isPending, isSuccess, writeContract } = useWriteContract();
  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Open Bets</h2>

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
            <span className="label-text">Enter the duration (in seconds):</span>
          </label>
          <input
            type="text"
            placeholder="2"
            className="input input-bordered w-full max-w-xs"
            value={duration}
            onChange={e => setDuration(Number(e.target.value))}
          />
        </div>

        <button
          className="btn btn-active btn-neutral"
          disabled={isPending}
          onClick={() => {
            const closingTime = Math.floor(Date.now() / 1000) + Number(duration);
            writeContract({
              abi: abi,
              address: lotteryAddress,
              functionName: "openBets",
              args: [closingTime],
            });
          }}
        >
          Open
        </button>
        {isSuccess && (
          <div>
            Transaction hash:{" "}
            <a href={`https://sepolia.etherscan.io/tx/${data}`} target="_blank">
              {data}
            </a>
          </div>
        )}
        {isError && <div>Error voting: {error.message}</div>}
      </div>
    </div>
  );
};
