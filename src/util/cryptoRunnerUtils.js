/* eslint-disable no-await-in-loop */
import Web3 from 'web3'
import { getWeb3 } from './web3'

const API_URL = process.env.REACT_APP_API_URL;

export const getSharedTokenAmount = async(claimContract) => {
  try{
    return await claimContract.methods.rewardAmount().call();
  } catch (err) {
    return 0;
  }
}

export const getAvailableReward = async(claimContract, account) => {
  try{
    return await claimContract.methods.rewardAvailable(account).call();
  } catch (err) {
    return 0;
  }
}

export const getClaimAmount = async(claimContract, account) => {
  try{
    return await claimContract.methods.claimAmount(account).call();
  } catch (err) {
    return 0;
  }
}

export const getTotalClaimed = async(claimContract, account) => {
  try{
    return await claimContract.methods.totalClaimed(account).call();
  } catch (err) {
    return 0;
  }
}

export const claimBnb = async (claimContract, account) => {
  try {
    const result = claimContract.methods.claim().send({ from: account });
    return result;
  } catch (err) {
    console.error('err')
    return err
  }
}

export const claimReward = async (claimContract, account) => {
  try {
    const result = claimContract.methods.reward().send({ from: account });
    return result;
  } catch (err) {
    console.error('err')
    return err
  }
}

export const saveTwitterInfo = async(account, twitterName) => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', '*');

  headers.append('GET', 'POST', 'OPTIONS');

  const res = await fetch(`${API_URL}/api/saveTwitterInfo`, {
      method: "POST",
      headers,
      body: JSON.stringify({
          account,
          twitterName
      })
  });
  const response = await res.json();
  return response.result
}

export const getTwitterInfo = async(account) => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', '*');

  headers.append('GET', 'POST', 'OPTIONS');
  const res = await fetch(`${API_URL}/api/getTwitterInfo?account=${account}`, {
    method: "Get",
    headers
  });
  let response
  try{
    response = await res.json();
    // console.log(response)
  }
  catch(e){
    console.log(e)
    response = false;
  }
  // console.log('response : ', response)
  return response;
}

export const saveLastClaimAmount = async(claimAmount, account) => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', '*');

  headers.append('GET', 'POST', 'OPTIONS');
  const res = await fetch(`${API_URL}/api/saveLastClaimAmount`, {
    method: "POST",
    headers,
    body: JSON.stringify({
        account,
        claimAmount
    })
  });
  const response = await res.json();
  return response.result
}

export const getLastClaimAmount = async(account) => {
  const headers = new Headers();

  headers.append('Content-Type', 'application/json');
  headers.append('Accept', 'application/json');

  headers.append('Access-Control-Allow-Origin', '*');
  headers.append('Access-Control-Allow-Credentials', 'true');
  headers.append('Access-Control-Allow-Headers', '*');

  headers.append('GET', 'POST', 'OPTIONS');
  const res = await fetch(`${API_URL}/api/getLastClaimAmount?account=${account}`, {
    method: "Get",
    headers
  });
  let response
  try{
    response = await res.json();
    // console.log(response)
  }
  catch(e){
    console.log(e)
    response = false;
  }
  // console.log('response : ', response)
  return response;
}