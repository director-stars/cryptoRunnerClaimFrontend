import React from 'react'
import { ModalProvider } from '@pancakeswap-libs/uikit'
import * as bsc from '@binance-chain/bsc-use-wallet'
import { Provider } from 'react-redux'
import getRpcUrl from 'src/util/getRpcUrl'
import { ThemeContextProvider } from 'src/contexts/ThemeContext'
import { BlockContextProvider } from 'src/contexts/BlockContext'
import { RefreshContextProvider } from 'src/contexts/RefreshContext'

const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl()
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
  return (
    <ThemeContextProvider>
      <bsc.UseWalletProvider
        chainId={chainId}
        connectors={{
          walletconnect: { rpcUrl },
          bsc,
        }}
      >
        <BlockContextProvider>
          <RefreshContextProvider>
            <ModalProvider>{children}</ModalProvider>
          </RefreshContextProvider>
        </BlockContextProvider>
      </bsc.UseWalletProvider>
    </ThemeContextProvider>
  )
}

export default Providers
