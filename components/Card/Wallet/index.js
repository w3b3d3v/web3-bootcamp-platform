import React, { useEffect, useState } from 'react'
import { Button } from '../../Button'

import { toast } from 'react-toastify'
import { getUserFromFirestore, updateUserWalletInFirestore } from '../../../lib/user';
import { auth } from '../../../firebase/initFirebase';
import { useSession } from 'next-auth/react';
import Image from 'next/image'

export default function WalletCard() {
  const [userAddress, setUserAddress] = useState();
  const [user, setUser] = useState();
  const { data: session } = useSession();
  const ref = React.createRef();

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
        params: ['Sign In Message - Logging in Web3Dev Bootcamp', accounts[0]],
      });
      const address = accounts.pop();
      if(address && auth.currentUser) await updateUserWalletInFirestore(address, auth.currentUser?.uid);
      setUserAddress(address);
      toast.success('Conectado com sucesso!', toastParameters);
    } else {
      toast.error('Por favor instale a Metamask', toastParameters);
    }
  };
  const handleDisconnect = async() => {
    if(auth.currentUser) await updateUserWalletInFirestore(null, auth.currentUser?.uid);
    setUserAddress('');
    toast.success('Desconectado com sucesso!', toastParameters)
  }
  useEffect(async () => {
    if(auth.currentUser) {
      const userSession = await getUserFromFirestore(auth.currentUser);
      setUser(userSession);
    }
  }, [auth.currentUser, userAddress])

  return (
    <>
      {user?.wallet ? (
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200 h-full flex items-center ">
          <div className="flex">
            <div className="px-6 py-5">
              <div className='flex items-center gap-2'>
                <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                  ✅ Carteira Conectada
                </p>
                <Image src="/assets/img/metamask.svg" width="28" height="28" />
              </div>
              <p className="pt-2 text-xs flex-wrap leading-5 text-gray-500 dark:text-gray-400">
                Endereço da carteira: {user?.wallet.substring(0, 4)+'...'+user?.wallet.substring(user?.wallet.length-10)}
              </p>
              <div className="pt-4">
                <a className='cursor-pointer' id='disconnect-wallet' onClick={() => handleDisconnect()}>Desconectar</a>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200 h-full flex items-center">
          <div className='flex'>
            <div className="px-6 py-5">
              <div className="flex items-center gap-2">
                <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                  ❌ Conecte sua carteira ETH
                
                </p>
                <Image src="/assets/img/metamask.svg" width="28" height="28" />
              </div>
              <p className="pt-2 text-sm leading-5 text-gray-500 dark:text-gray-400">
                Você ganhará uma NFT ao completar o bootcamp! Além disso, você
                precisará de uma carteira para trabalhar com o material do
                projeto.
              </p>
              <div className="pt-4">
                <Button ref={ref} id='connect-wallet' onClick={() => handleConnectWallet()}>
                  Conectar carteira
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
