import { useEffect, useState } from 'react'
import { AbiItem } from 'web3-utils'
import { ContractOptions } from 'web3-eth-contract'
import useWeb3 from './useWeb3'
import { getClaimAddress, getCryptoRunnerTokenAddress } from '../util/addressHelpers'
import cryptoRunner from '../config/abi/cryptoRunner.json'
import claim from '../config/abi/claim.json'

const useContract = (abi: AbiItem, address: string, contractOptions?: ContractOptions) => {
  const web3 = useWeb3()
  const [contract, setContract] = useState(new web3.eth.Contract(abi, address, contractOptions))

  useEffect(() => {
    setContract(new web3.eth.Contract(abi, address, contractOptions))
  }, [abi, address, contractOptions, web3])

  return contract
}

export const useCryptoRunner = () => {
  const abi = (cryptoRunner as unknown) as AbiItem
  return useContract(abi, getCryptoRunnerTokenAddress());
}

export const useClaim = () => {
  const abi = (claim as unknown) as AbiItem
  return useContract(abi, getClaimAddress());
}

export default useContract
