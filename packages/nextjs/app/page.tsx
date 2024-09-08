"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { ApproveTokens } from "~~/components/lottery/ApproveTokens";
import { BetTokens } from "~~/components/lottery/BetTokens";
import { BurnTokens } from "~~/components/lottery/BurnTokens";
import { BuyTokens } from "~~/components/lottery/BuyTokens";
import { CheckLotteryState } from "~~/components/lottery/CheckLotteryState";
import { CloseBets } from "~~/components/lottery/CloseBets";
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
          <CloseBets></CloseBets>
          <BuyTokens></BuyTokens>
          <ApproveTokens></ApproveTokens>
          <BurnTokens></BurnTokens>
          <BetTokens></BetTokens>
        </div>
      </div>
    </>
  );
};

function PageBody() {
  return (
    <>
      <p className="text-center text-lg"></p>
      <WalletInfo></WalletInfo>
      {/* <BuyTokens></BuyTokens> */}
    </>
  );
}

function WalletInfo() {
  const { address, isConnecting, isDisconnected, chain } = useAccount();
  if (address)
    return (
      <div>
        <p>Your account address is {address}</p>

        <p>Connected to the network {chain?.name}</p>
        {/*
        <WalletAction></WalletAction>
        <WalletBalance address={address as `0x${string}`}></WalletBalance>

        <TokenInfo address={address as `0x${string}`}></TokenInfo>
        */}
        {/*
        <ApiData address={address as `0x${string}`}></ApiData>
        <DelegateVotes address={address as `0x${string}`}></DelegateVotes>
        <DeployTokenizedBallot></DeployTokenizedBallot>
        <CastVotes></CastVotes>
        <ViewVotes></ViewVotes>
        */}
      </div>
    );
  if (isConnecting)
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  if (isDisconnected)
    return (
      <div>
        <p>Wallet disconnected. Connect wallet to continue</p>
      </div>
    );
  return (
    <div>
      <p>Connect wallet to continue</p>
    </div>
  );
}

export default Home;
