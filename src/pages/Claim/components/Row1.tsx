import React, { useEffect, useCallback, useState } from "react";
import { makeStyles } from "@mui/styles";
import Bg from "src/assets/images/bg2.png";
import { Theme, Typography, Button } from "@mui/material";
import { BigNumber } from "bignumber.js";
import clsx from "clsx";
import { useWalletModal, useModal, ToastContainer } from "@pancakeswap-libs/uikit";
import { useWallet } from '@binance-chain/bsc-use-wallet'
import Countdown from "react-countdown";
import { useGetSharedTokenAmount, useGetTotalBNBClaimed, useClaimBnb, useGetTwitterInfo, useGetClaimAmount, useGetAvailableReward, useClaimReward } from 'src/hooks/useCryptoRunnerClaim'
import TwitterInfoModal from './TwitterInfoModal'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    background: `url(${Bg})`,
    position: "relative",
    backgroundSize: "100%",
    backgroundPositionX: "center",
    backgroundPositionY: "bottom",
    minHeight: "calc(100vh - 80px)",
    backgroundRepeat: "no-repeat",
  },
  bg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  btnsDiv: {
    display: "grid",
    gap: 20,
    gridAutoFlow: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  text: {
    position: "relative",
    // fontFamily: "'Orbitron', sans-serif",
    fontWeight: 600,
    [theme.breakpoints.down("lg")]: {
      marginTop: 20,
    },
  },
  alignCenter1: {
    textAlign: "center",
  },
  content: {
    margin: 'auto',
    textAlign: 'center'
  },
  twitterInfo: {
    display: "inline-flex",
    width: "100%",
    justifyContent: "center",
    columnGap: "30px"
  }
}));

interface Props {}

const Row1: React.FC<Props> = () => {
  const classes = useStyles();

  const { account, connect, reset } = useWallet()
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(connect, reset, account);
  const accountEllipsis = account ? `${account.substring(0, 4)}...${account.substring(account.length - 4)}` : null;
  useEffect(() => {
    // console.log(account)
    if (!account && window.localStorage.getItem('accountStatus')) {
      connect('injected')
    }
  }, [account, connect])

  const [pendingTx, setPendingTx] = useState(false)
  const [pendingTx1, setPendingTx1] = useState(false)
  const [claimResult, setClaimResult] = useState(false)
  const [modalType, setModalType] = useState('insert')
  const [toasts, setToasts] = useState([]);
  const [twitterInfoResult, setTwitterInfoResult] = useState('');
  const sharedTokenAmount = useGetSharedTokenAmount();
  const availableReward = useGetAvailableReward();
  const totalBnbClaimed = useGetTotalBNBClaimed();
  const twitterInfo = useGetTwitterInfo();
  const claimAmount = useGetClaimAmount();
  const { onClaimBnb } = useClaimBnb()
  const handleClaimBnb = useCallback(
    async (_twitterInfo) => {
      const result = await onClaimBnb(claimAmount);
      if(result.status){
        if(!_twitterInfo){
          setClaimResult(true);
          setModalType('create')
        }
        else{
          setClaimResult(false);
        }
      }
    },
    [onClaimBnb],
  )

  const { onClaimReward } = useClaimReward()
  const handleClaimReward = useCallback(
    async () => {
      const result = await onClaimReward();
    },
    [onClaimReward],
  )

  const [onPresentResult] = useModal(<TwitterInfoModal type={modalType} setTwitterInfoResult={setTwitterInfoResult}/>);

  const handleRemove = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id));
  };

  useEffect(() => {
    if(claimResult) {
      onPresentResult()
      setClaimResult(false);
    }
    if(twitterInfo) {
      setModalType('update')
    }
    if(twitterInfoResult != ''){
      console.log('twitterInfoResult : ', twitterInfoResult)
      const now = Date.now();
      const randomToast = {
        id: `id-${now}`,
        title: twitterInfoResult,
        description:"",
        type: "success",
      };
      setToasts((prevToasts) => [randomToast, ...prevToasts]);
      setTwitterInfoResult('');
    }
  }, [claimResult, onPresentResult, setModalType, twitterInfo])

  return (
    <div className={classes.root}>
      <img src={Bg} alt="" className={classes.bg} />
      <Typography
        variant="h2"
        color="textSecondary"
        align="center"
        className={clsx(classes.text, "styleFont")}
      >
        <p></p>
        Claim BNB
      </Typography>
      <div className={classes.content}>
        {account ? (
          
          <>
            <div className={classes.twitterInfo}>
              <Typography
                variant="h5"
                color="textSecondary"
                align="center"
                style={{ marginTop: "30px",cursor: "pointer", textDecoration: "underline" }}
                className={clsx(classes.text, "styleFont")}
                onClick={() => {
                  onPresentAccountModal();
                }}
              >
                {accountEllipsis}
              </Typography>
              {(twitterInfo)?(
                <Typography
                  variant="h6"
                  color="secondary"
                  align="center"
                  style={{ marginTop: "30px",cursor: "pointer" }}
                  className={clsx(classes.text, "styleFont")}
                  onClick={() => {
                    onPresentResult();
                  }}
                >
                  Twitter
                </Typography>
              ):(
                (totalBnbClaimed !== 0 && totalBnbClaimed.toString() !== '0')?(
                  <Typography
                    variant="h6"
                    color="secondary"
                    align="center"
                    style={{ marginTop: "30px",cursor: "pointer" }}
                    className={clsx(classes.text, "styleFont")}
                    onClick={() => {
                      setModalType('create')
                      onPresentResult();
                    }}
                  >
                    Twitter
                  </Typography>
                ):(<></>)
              )}
            </div>
            
            <Typography
              variant="h6"
              color="textSecondary"
              align="center"
              style={{ marginTop: "25px", marginBottom: "25px" }}
              className={clsx(classes.text, "styleFont")}
            >
              Available Claim Amount ({ (new BigNumber(claimAmount / (10**18))).toFixed()}) BNB
            </Typography>
            {(claimAmount != 0)?(
              <Button
                variant="contained"
                color="secondary"
                disabled={pendingTx}
                style={{ maxWidth: 300 }}
                onClick={async () => {
                  setPendingTx(true)
                  await handleClaimBnb(twitterInfo);
                  setPendingTx(false)
                }}
              >
                { pendingTx? "Pending Claiming..." : "Claim BNB" }
              </Button>
            ):(<></>)}
            <Typography
              variant="h4"
              color="secondary"
              align="center"
              style={{ marginTop: "30px", marginBottom: "30px" }}
              className={clsx(classes.text, "styleFont")}
            >
              {(availableReward)?(
                <>Available Token Amount ({(new BigNumber(sharedTokenAmount / (10**9))).toFixed()}) RUN</>
              ):(
                <>Available Token Amount (0) RUN</>
              )}              
            </Typography>
            {(availableReward)?(
              <Button
                variant="contained"
                color="secondary"
                disabled={pendingTx1}
                style={{ maxWidth: 300 }}
                onClick={async () => {
                  setPendingTx1(true)
                  await handleClaimReward();
                  setPendingTx1(false)
                }}
              >
                { pendingTx1? "Pending Claiming..." : "Claim Reward" }
              </Button>
            ):(<></>)}
            <Typography
              variant="h4"
              color="secondary"
              align="center"
              style={{ marginTop: "30px", marginBottom: "30px" }}
              className={clsx(classes.text, "styleFont")}
            >
              Total BNB claimed ({(new BigNumber(totalBnbClaimed / (10**18))).toFixed()}) BNB
            </Typography>
          </>
        ) : (
          <Button
            variant="contained"
            color="secondary"
            style={{ maxWidth: 300 }}
            onClick={() => {
              onPresentConnectModal();
            }}
          >
            Connect Wallet
          </Button>
        )}
        <ToastContainer toasts={toasts} onRemove={handleRemove} />
      </div>
    </div>
  );
};

export default Row1;
