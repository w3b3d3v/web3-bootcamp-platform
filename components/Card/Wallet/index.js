import React, { useEffect, useState } from 'react'
import { Button } from '../../Button'

import { toast } from 'react-toastify'
import { getUserFromFirestore, updateUserWalletInFirestore } from '../../../lib/user';
import { auth } from '../../../firebase/initFirebase';
import { useSession } from 'next-auth/react';

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
        params: ['Sign In Message - Logging in Web3Dev', accounts[0]],
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
        <div className="flex flex-col items-center rounded-lg bg-white-100 shadow-xl dark:bg-black-200 px-6 py-5 text-center gap-y-6  h-52 justify-center">
              <p className="text-base text-black-200 dark:text-gray-100 m-0 p-0">
                ✅ Carteira Conectada
              </p>
              <p className="lg:text-base text-xs leading-5 text-gray-500 dark:text-gray-400 m-0 p-0">
                Endereço da carteira: {user?.wallet.substring(0, 4)+'...'+user?.wallet.substring(user?.wallet.length-10)}
              </p>
              <div className="pt-4">
                <a className='cursor-pointer' id='disconnect-wallet' onClick={() => handleDisconnect()}>Desconectar</a>
              </div>
        </div>
      ) : (
        <div className="flex flex-col  rounded-lg bg-white-100 shadow-xl dark:bg-black-200 px-6 py-5 text-center gap-y-6 h-52 justify-center">

              <p className="text-base text-black-200 dark:text-gray-100 p-0 m-0">
                ❌ Conecte sua carteira ETH
              </p>
              <p className="lg:text-base text-xs leading-5 text-gray-500 dark:text-gray-400 p-0 m-0">
                Você ganhará NFTs de conclusão ! Além disso, você
                precisará de uma carteira para trabalhar com o material do
                projeto.
              </p>
              
                <Button ref={ref} id='connect-wallet' onClick={() => handleConnectWallet()}>
                  Conectar carteira
                </Button>
              
        </div>
      )}
    </>
  )
}
