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
  const goalContractAddress = "0xE046BCd01A8A69811F6F459110d908121f8275a8"
  const goalTokenAddress = "0x94391Aa1286d68911Aa11512778bFB1cd4674Cf7"

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
    const res = ethereum && await ethereum.request({ method: "eth_requestAccounts" });
    if (res) {
      setAccounts(res);
    }
  }

  const participate = async () => {
    const provider = new ethers.BrowserProvider(ethereum);
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
    addVerifier
  }
}