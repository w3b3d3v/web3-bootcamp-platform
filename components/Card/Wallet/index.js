import React from 'react'
import Button from '../../Button'

import { useWeb3 } from '@3rdweb/hooks'

import { toast } from 'react-toastify'

export default function WalletCard() {
  const { connectWallet, address, error } = useWeb3()

  const toastParameters = {
    position: 'top-right',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  }

  // verify if user has metamask, if not show a toast, if yes, connect to the wallet

  const handleConnectWallet = () => {
    if (window.ethereum) {
      connectWallet('injected')
        .then(() => {
          toast.success('Conectado com sucesso!', toastParameters)
        })
        .catch((error) => {
          toast.error('Algo deu errado', toastParameters)
        })
    } else {
      toast.error('Por favor instale a Metamask', toastParameters)
    }
  }

  return (
    <>
      {address ? (
        <div className="rounded-lg bg-white-100 shadow-xl dark:bg-black-200">
          <div className="flex">
            <div className="px-6 py-5">
              <p className="text-base font-medium leading-none text-black-200 dark:text-gray-100">
                ✅ Carteira Conectada
              </p>
              <p className="pt-2 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Você ganhará NFTs por completar tarefas! Além disso, você
                precisará de uma carteira para trabalhar com o material do
                projeto.
              </p>
              <div className="pt-4">
                <Button>
                  {address.substr(0, 5) + '...' + address.substr(-5, 5)}
                </Button>
              </div>
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
