import addresses from '../config/constants/contracts'

const chainId = process.env.REACT_APP_CHAIN_ID

export const getCryptoRunnerTokenAddress =() => {
  return addresses.cryptoRunner[chainId];
}

export const getClaimAddress =() => {
  return addresses.claim[chainId];
}
