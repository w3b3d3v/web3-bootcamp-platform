import React, {useEffect, useState} from 'react'
import Button from '../../Button'

import { toast } from 'react-toastify'
import { getUserFromFirestore, updateUserWalletInFirestore } from '../../../lib/user';
import { auth } from '../../../firebase/initFirebase';
import { useSession } from 'next-auth/react';

export default function WalletCard() {
  const [userAddress, setUserAddress] = useState();
  const [user, setUser] = useState();
  const { data: session } = useSession();

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



  useEffect(async () => {
    if(auth.currentUser) {
      const userSession = await getUserFromFirestore(auth.currentUser);
      setUser(userSession);
    }
  }, [auth.currentUser, userAddress])

  return (
    <>
      {user?.wallet ? (
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
          <div className="flex">
            <div className="px-6 py-5">
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                ✅ Carteira Conectada
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Endereço da carteira: {user?.wallet}
              </p>
              {/*<div className="pt-4">
                <a className='cursor-pointer' onClick={() => handleDisconnect()}>Desconectar</a>
              </div>*/}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
          <div className="flex">
            <div className="px-6 py-5">
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                ❌ Conecte sua carteira ETH
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Você ganhará NFTs por completar tarefas! Além disso, você
                precisará de uma carteira para trabalhar com o material do
                projeto.
              </p>
              <div className="pt-4">
                <Button onClick={() => handleConnectWallet()}>
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
