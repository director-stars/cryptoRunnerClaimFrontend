import { useCallback, useState, useEffect } from 'react'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { useClaim } from '../hooks/useContract'
import useRefresh from './useRefresh'
import { 
  getSharedTokenAmount,
  getTotalClaimed,
  claimBnb,
  saveTwitterInfo,
  getTwitterInfo,
  getClaimAmount,
  getAvailableReward,
  claimReward,
  saveLastClaimAmount,
  getLastClaimAmount
} from '../util/cryptoRunnerUtils'

export const useGetSharedTokenAmount = () => {
  const [amount, setAmount] = useState(0);
  const claimContract = useClaim();
  useEffect(() => {
    const fetchSharedToken = async () => {
      const supply = await getSharedTokenAmount(claimContract);
      setAmount(supply);
    }
    fetchSharedToken();
  },[claimContract]);
  return amount;
}

export const useGetClaimAmount = () => {
  const { account } = useWallet();
  const [amount, setAmount] = useState(0);
  const claimContract = useClaim();
  useEffect(() => {
    const fetchClaimAmount = async () => {
      const supply = await getClaimAmount(claimContract, account);
      setAmount(supply);
    }
    fetchClaimAmount();
  },[claimContract, account]);
  return amount;
}

export const useGetAvailableReward = () => {
  const { account } = useWallet();
  const [available, setAvailable] = useState(false);
  const claimContract = useClaim();
  useEffect(() => {
    const fetchAvailableReward = async () => {
      const supply = await getAvailableReward(claimContract, account);
      setAvailable(supply);
    }
    fetchAvailableReward();
  },[claimContract, account]);
  return available;
}

export const useGetTotalBNBClaimed = () => {
  const { account } = useWallet();
  const [amount, setAmount] = useState(0);
  const claimContract = useClaim();
  useEffect(() => {
    const fetchTotalClaimed = async () => {
      let supply = 0
      if(account)
        supply = await getTotalClaimed(claimContract, account);
      setAmount(supply);
    }
    fetchTotalClaimed();
  },[claimContract, account]);
  return amount;
}

export const useClaimBnb = () => {
  const { account } = useWallet()
  const claimContract = useClaim();
  const handleClaimBnb = useCallback(
    async (claimAmount) => {
      try {
        await saveLastClaimAmount(claimAmount, account);
        const result = await claimBnb(claimContract, account)
        return result
      } catch (e) {
        return e
      }
    },
    [account, claimContract],
  )
  return { onClaimBnb: handleClaimBnb }
}

export const useClaimReward = () => {
  const { account } = useWallet()
  const claimContract = useClaim();
  const handleClaimReward = useCallback(
    async () => {
      try {
        const result = await claimReward(claimContract, account)
        return result
      } catch (e) {
        return e
      }
    },
    [account, claimContract],
  )
  return { onClaimReward: handleClaimReward }
}

export const useSaveTwitterInfo = () => {
  const { account } = useWallet()
  const handleSaveInfo = useCallback(
    async (twitterName) => {
      try {
        const result = await saveTwitterInfo(account, twitterName)
        return result
      } catch (e) {
        return e
      }
    },
    [account],
  )
  return { onSaveTwitterInfo: handleSaveInfo }
}

export const useGetTwitterInfo = () => {
  const { account } = useWallet()
  const [name, setName] = useState(false);
  useEffect(() => {
    const fetchTwitterName = async () => {
      let supply = false
      if(account)
        supply = await getTwitterInfo( account );
      setName(supply);
    }
    fetchTwitterName();
  },[account]);
  return name;
}

export const useGetLastClaimAmount = () => {
  const { account } = useWallet()
  const [lastClaimAmount, setLastClaimAmount] = useState(0);
  useEffect(() => {
    const fetchClaimAmount = async () => {
      let supply = 0
      if(account)
        supply = await getLastClaimAmount( account );
      setLastClaimAmount(supply);
    }
    fetchClaimAmount();
  },[account]);
  return lastClaimAmount;
}