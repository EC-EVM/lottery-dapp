import { useState } from "react";
import { abi } from "../../../lottery/artifacts/contracts/Lottery.sol/Lottery.json";
import { formatEther } from "viem";
import { useReadContract } from "wagmi";

export const CheckOwnerPool = () => {
  const [lotteryAddress, setLotteryAddress] = useState("");

  const { data: ownerPool } = useReadContract({
    address: lotteryAddress,
    abi: abi,
    functionName: "ownerPool",
  });
  console.log(ownerPool);
  console.log(typeof ownerPool);

  return (
    <div className="card w-96 bg-primary text-primary-content mt-4">
      <div className="card-body">
        <h2 className="card-title">Check Owner Pool</h2>
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

        {ownerPool !== undefined && <div>Pool: {ownerPool ? formatEther(ownerPool as bigint) : 0}</div>}
      </div>
    </div>
  );
};
