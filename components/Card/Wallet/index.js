import React, { useEffect, useState } from 'react'
import { Button } from '../../Button'

import { toast } from 'react-toastify'
import { getUserFromFirestore, updateUserWalletInFirestore } from '../../../lib/user';
import { auth } from '../../../firebase/initFirebase';
import { useSession } from 'next-auth/react';
import { useTranslation } from "react-i18next"

export default function WalletCard() {
  const [userAddress, setUserAddress] = useState();
  const [user, setUser] = useState();
  const { data: session } = useSession();
  const ref = React.createRef();
  const { t } = useTranslation();

  const toastParameters = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  const handleConnectWallet = async () => {
    if(window.ethereum) {
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      await window.ethereum.request({
        method: 'personal_sign',
        params: ['Sign In Message - Logging in WEB3DEV', accounts[0]],
      })
      const address = accounts.pop();
      if(address && auth.currentUser) await updateUserWalletInFirestore(address, auth.currentUser?.uid);
      setUserAddress(address);
      toast.success(t('walletConnectedSuccess'), toastParameters);
    } else {
      toast.error(t('installMetamask'), toastParameters);
    }
  };
  const handleDisconnect = async() => {
    if(auth.currentUser) await updateUserWalletInFirestore(null, auth.currentUser?.uid);
    setUserAddress('');
    toast.success(t('walletDisconnectedSuccess'), toastParameters)
  }
  useEffect(async () => {
    if(auth.currentUser) {
      const userSession = await getUserFromFirestore(auth.currentUser);
      setUser(userSession);
    }
  }, [auth.currentUser, userAddress])

  const walletAddress = user?.wallet
  ? `${user.wallet.substring(0, 4)}...${user.wallet.substring(user.wallet.length - 10)}`
  : '';

  return (
    <>
      {user?.wallet ? (
        <div className="flex flex-col items-center rounded-lg px-6 py-5 text-center gap-y-6 h-52 justify-center">
          <p className="text-base m-0 p-0">
            {t('walletConnected')}
          </p>
          <p className="lg:text-base text-xs leading-5  m-0 p-0">
            {`${t('walletAddress')}: ${walletAddress}`}
          </p>
          <div className="pt-4">
            <a className='cursor-pointer' id='disconnect-wallet' onClick={() => handleDisconnect()}>{t('disconnectWallet')}</a>
          </div>
        </div>
      ) : (
        <div className="flex flex-col  rounded-lg  shadow-xl d px-6 py-5 text-center gap-y-6 h-52 justify-center">
          <p className="text-base p-0 m-0">
            {t('connectYourETHWallet')}
          </p>
          <p className="lg:text-base text-xs leading-5 p-0 m-0">
            {t('earnCompletionNFTs')}
          </p>
          <Button ref={ref} id='connect-wallet' onClick={() => handleConnectWallet()}>
            {t('connectWalletButton')}
          </Button>      
        </div>
      )}
    </>
  )
}
