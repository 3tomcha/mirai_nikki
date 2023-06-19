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
  const goalContractAddress = "0xECb1b04200A789A5A90F5292eed35A26D644B48B"
  const [isParticipated, _setIsParticipated] = useState<boolean>();
  const [verifier, _setVerifier] = useState<string>();
  const [hasVerified, _setHasVerified] = useState<boolean>(false);

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
    try {
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
    } catch (error) {
      console.error('Participation error:', error);
    }

  }

  const setIsParticipated = async () => {
    if (!accounts) {
      return;
    }
    const provider = new ethers.BrowserProvider((window as any).ethereum);
    const goalContract = new ethers.Contract(goalContractAddress, GoalContractAbi, provider) as unknown as GoalContract;
    const res = await goalContract.participant().catch((err) => {
      console.log(err);
    });
    if (!res) {
      return false;
    }
    console.log(res);
    console.log(accounts[0]);
    console.log(res.toLowerCase() === accounts[0].toLowerCase());

    if (res.toLowerCase() != "0x0000000000000000000000000000000000000000" && res.toLowerCase() === accounts[0].toLowerCase()) {
      _setIsParticipated(true);
    }
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

  const fetchVerifier = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const goalContract = new ethers.Contract(goalContractAddress, GoalContractAbi, provider) as unknown as GoalContract;
    const res = await goalContract.verifier().catch((err) => {
      console.log(err);
    });
    console.log(res);
    if (res) {
      _setVerifier(res);
    }
  }

  const fetchHasVerified = async (address: string) => {
    const provider = new ethers.BrowserProvider(ethereum);
    const goalContract = new ethers.Contract(goalContractAddress, GoalContractAbi, provider) as unknown as GoalContract;
    const res = await goalContract.hasVerified(address).catch((err) => {
      console.log(err);
    });
    if (res) {
      _setHasVerified(res);
    }
  }



  return {
    init,
    connectMetamask,
    success,
    participate,
    addVerifier,
    isParticipated,
    setIsParticipated,
    accounts,
    verifier,
    fetchVerifier,
    fetchHasVerified,
    hasVerified
  }
}