"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ApproveTokens } from "~~/components/lottery/ApproveTokens";
import { BuyTokens } from "~~/components/lottery/BuyTokens";
import { CheckLotteryState } from "~~/components/lottery/CheckLotteryState";
import { DeployLottery } from "~~/components/lottery/DeployLottery";
import { OpenBets } from "~~/components/lottery/OpenBets";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Group 2</span>
            <span className="block text-4xl font-bold">Lottery dApp</span>
          </h1>
          <div className="flex justify-center items-center space-x-2 flex-col sm:flex-row">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <DeployLottery></DeployLottery>
          <CheckLotteryState></CheckLotteryState>
          <OpenBets></OpenBets>
          <BuyTokens></BuyTokens>
          <ApproveTokens></ApproveTokens>
        </div>
      </div>
    </>
  );
};

export default Home;
