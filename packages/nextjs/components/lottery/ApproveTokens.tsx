import { useState } from "react";
import { abi } from "../../../lottery/artifacts/contracts/LotteryToken.sol/LotteryToken.json";
import { useWriteContract } from "wagmi";

const MAXUINT256 = 115792089237316195423570985008687907853269984665640564039457584007913129639935n;

export const ApproveTokens = () => {
  const [lotteryAddress, setLotteryAddress] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const { data, isError, error, isPending, isSuccess, writeContract } = useWriteContract();
  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Approve Tokens</h2>

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
            <span className="label-text">Enter the address for the token:</span>
          </label>
          <input
            type="text"
            placeholder="0x...."
            className="input input-bordered w-full max-w-xs"
            value={tokenAddress}
            onChange={e => setTokenAddress(e.target.value)}
          />
        </div>

        <button
          className="btn btn-active btn-neutral"
          disabled={isPending}
          onClick={() => {
            console.log({ tokenAddress, lotteryAddress });
            writeContract({
              abi: abi,
              address: tokenAddress,
              functionName: "approve",
              args: [lotteryAddress, MAXUINT256],
            });
          }}
        >
          Approve
        </button>
        {isSuccess && (
          <div>
            Transaction hash:{" "}
            <a href={`https://sepolia.etherscan.io/tx/${data}`} target="_blank">
              {data}
            </a>
          </div>
        )}
        {isError && <div>Error approving: {error.message}</div>}
      </div>
    </div>
  );
};
