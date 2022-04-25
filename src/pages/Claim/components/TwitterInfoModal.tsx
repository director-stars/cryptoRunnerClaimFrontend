import BigNumber from 'bignumber.js'
import React, { useCallback, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, Modal, Text, Input, Image } from '@pancakeswap-libs/uikit'
import ModalActions from 'src/components/ModalActions'
import Spacer from 'src/components/Spacer'
import styled from 'styled-components'
import { useSaveTwitterInfo, useGetLastClaimAmount } from 'src/hooks/useCryptoRunnerClaim'

interface TwitterModalProps {
  onDismiss?: () => void
  type: string
  setTwitterInfoResult: any
}

const TwitterInfoModal: React.FC<TwitterModalProps> = ({ onDismiss, type, setTwitterInfoResult }) => {
 
  const [twitterName, setTwitterName] = useState('')
  const [pendingTx, setPendingTx] = useState(false)
  const [nameStatus, setNameStatus] = useState(false);
  const { onSaveTwitterInfo } = useSaveTwitterInfo();
  // const history = useHistory();
  const lastClaimAmount = useGetLastClaimAmount();
  
  const handleSaveTwitterInfo = useCallback(
    async (name) => {
      if(name.includes('@'))
        name = name.substring(1);
      const result = await onSaveTwitterInfo(name);
      setTwitterInfoResult(result);
      const twitterText = "I just claimed "+(new BigNumber(lastClaimAmount / (10**18))).toFixed()+" BNB playing cryptorunner join me to play on https://game.CryptoRunner.io";
      // console.log(twitterText)
      const encodedString = encodeURIComponent(twitterText);
      window.open('https://twitter.com/intent/tweet?text='+encodedString, '_blank');
      
    },
    [onSaveTwitterInfo, lastClaimAmount]
  )

  const vaildTwitterName = new RegExp('^@?[a-zA-Z0-9_]{1,15}$');

  const handleInfoChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if(vaildTwitterName.test(e.currentTarget.value)){
        setTwitterName(e.currentTarget.value)
      }
      else
        setTwitterName('')
    },
    [setTwitterName],
  )

  useEffect(() => {
    if(twitterName === '')
      setNameStatus(false);
    else
      setNameStatus(true)
  }, [twitterName])

  const title = (type == 'create')? "Share twitter Info for Reward" : "Update twitter Info";

  return (
    <StyledModal title={title} onDismiss={onDismiss}>
      <StyledInput type="text" min="0" scale="md" placeholder='@username' isSuccess={nameStatus} isWarning={!nameStatus} onChange={handleInfoChange}/>
      <Spacer />
      
      <StyledText color="secondary" fontSize="14px">I just claimed { (new BigNumber(lastClaimAmount / (10**18))).toFixed()} BNB playing cryptorunner join me to play on <a href="http://game.cryptorunner.io" target="_blank">http://game.cryptorunner.io</a></StyledText>
      {/* <StyledText1 color="tribe" fontSize="14px">I just claimed (claim amount) BNB playing CryptoRunner. </StyledText1>
      <StyledText1 color="tribe" fontSize="14px">Join me to play on http://game.cryptorunner.io <Image src="/twitter_logo.jpg" width={30} height={30}></Image></StyledText1> */}
      <ModalActions>
        <StyledButton
          fullWidth
          disabled={pendingTx || !nameStatus}
          onClick={async () => {
            setPendingTx(true)
            await handleSaveTwitterInfo(twitterName)
            setPendingTx(false)
            onDismiss()
          }}
        >
          {pendingTx ? 'Pending Share tweet' : 'Share tweet'}
        </StyledButton>
      </ModalActions>
    </StyledModal>
  )
}

const StyledInput = styled(Input)`
  max-width: 500px;
  text-align: right;
  // border-radius: 0px;
  margin-top: 30px;
`

const StyledButton = styled(Button)`
  border-radius: 0px;
  border-radius: 0px;
  color: #000;
  font-family: "Orbitron", sans-serif !important;
`

const StyledModal = styled(Modal)`
    font-family: "Orbitron", sans-serif !important;
    max-width: 400px;
`

const StyledDiv = styled.div`
  color: #4f8dff;
  // text-align: center;
  text-decoration: underline;
`

const StyledText = styled(Text)`
  max-width: 350px;
  & a{
    color: #4f8dff;
  }
`
const StyledText1 = styled(Text)`
  max-width: 350px;
  display: flex;
  column-gap: 10px;
  font-style: italic;
  line-height: 30px;
`
const HR = styled.hr`
  border-top: 1px solid;
  border-style: dashed;
  margin: 10px 0px;
`

export default TwitterInfoModal
