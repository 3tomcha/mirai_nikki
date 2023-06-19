import { ethers } from 'ethers';
import { useState } from 'react';
import { GoalContract } from '../../types/ethers-contracts/GoalContract';
import { GoalToken } from '../../types/ethers-contracts/GoalToken';
import GoalContractAbi from "../abi/GoalContract.json"
import GoalTokenAbi from "../abi/GoalToken.json"

export default function useContract() {
  const [ethereum, setEthereum] = useState<any>();
  const [accounts, setAccounts] = useState<any>();
  const [success, setSuccess] = useState<boolean>(false);
  const goalTokenAddress = "0xF00125Fa190be6f186e50aA44bC35bb8F508Dd6e"
  const goalContractAddress = "0x27b3Be34a3Fd6d0401CE6bc08E8ffDBec36920dE"
  const [isParticipated, _setIsParticipated] = useState<boolean>(false);

  const init = () => {
    if ((window as any).ethereum) {
      setEthereum((window as any).ethereum)
      setSuccess(true);
    } else {
      window.alert("Metamaskをインストールしてください");
      setSuccess(false);
    }
  }

  const connectMetamask = async () => {
    const res = (window as any).ethereum && await (window as any).ethereum.request({ method: "eth_requestAccounts" });
    if (res) {
      setAccounts(res);
    }
  }

  const participate = async () => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    console.log(provider);
    const signer = await provider.getSigner();
    const goalContract = new ethers.Contract(goalContractAddress, GoalContractAbi, signer) as unknown as GoalContract;
    const goalToken = new ethers.Contract(goalTokenAddress, GoalTokenAbi, signer) as unknown as GoalToken;
    // approveする
    await goalToken.approve(goalContractAddress, 10).catch((err) => {
      console.log(err);
    });
    await goalContract.participate(10).catch((err) => {
      console.log(err);
    });
    alert(`約束しました。次は証人のウォレットアドレスを入力！`)
  }

  const setIsParticipated = async () => {
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const goalContract = new ethers.Contract(goalContractAddress, GoalContractAbi, provider) as unknown as GoalContract;
    const res = await goalContract.participant().catch((err) => {
      console.log(err);
    });
    if (!res) {
      return false;
    }
    _setIsParticipated(res === accounts[0]);
  }

  const addVerifier = async (address: string) => {
    const provider = new ethers.BrowserProvider(ethereum);
    console.log(provider);
    const signer = await provider.getSigner();
    const goalContract = new ethers.Contract(goalContractAddress, GoalContractAbi, signer) as unknown as GoalContract;
    await goalContract.addVerifier(address).catch((err) => {
      console.log(err);
    });
    alert(`証人は${address}です。達成したら証人に報告してね。`)
  }

  return {
    init,
    connectMetamask,
    success,
    participate,
    addVerifier,
    isParticipated,
    setIsParticipated,
    accounts
  }
}