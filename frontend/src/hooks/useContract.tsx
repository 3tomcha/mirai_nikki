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
  const goalTokenAddress = "0x9CE4b49F94E9bbc43D72152B98cc6249087B292B"
  const goalContractAddress = "0xb932D6549d00D80Eb2fc2c16F7Eb012d841B900E"
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
      alert(`約束しました。次は見届け人のウォレットアドレスを入力！`)
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
    alert(`見届け人は${address}です。達成したら見届け人に報告してね。`)
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

  const fetchHasVerified = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    const goalContract = new ethers.Contract(goalContractAddress, GoalContractAbi, provider) as unknown as GoalContract;
    const res = await goalContract.hasVerified(accounts[0]).catch((err) => {
      console.log(err);
    });
    if (res) {
      _setHasVerified(res);
    }
  }

  const resetContract = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    console.log(provider);
    const signer = await provider.getSigner();
    const goalContract = new ethers.Contract(goalContractAddress, GoalContractAbi, signer) as unknown as GoalContract;
    const res = await goalContract.reset().catch((err) => {
      console.log(err);
    });
    if (res) {
      alert("コントラクトをリセットしました")
    }
  }

  const withdraw = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
    console.log(provider);
    const signer = await provider.getSigner();
    const goalContract = new ethers.Contract(goalContractAddress, GoalContractAbi, signer) as unknown as GoalContract;
    const res = await goalContract.withdrawTokens().catch((err) => {
      console.log(err);
    });
    if (res) {
      alert("トークンを引き出しました！")
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
    hasVerified,
    resetContract,
    withdraw
  }
}