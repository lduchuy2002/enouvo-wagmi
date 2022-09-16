import { useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import config from '../config/config'
import erc20ABI from '../contracts/erc20_abi.json'

export default function Approve() {
  const [spender, setSpender] = useState<string>('')
  const [amount, setAmount] = useState<string>('')

  const { config: configWriteMethod } = usePrepareContractWrite({
    addressOrName: config.erc20Address,
    contractInterface: erc20ABI,
    functionName: 'approve',
    args: [spender, amount],
    overrides: {
      gasLimit: '10000000',
    },
  })

  const { data, write: approve } = useContractWrite(configWriteMethod)

  const handleButtonClick = () => {
    if (!approve) {
      return
    }

    approve()
  }

  return (
    <div className="flex items-start gap-2">
      <button
        onClick={handleButtonClick}
        className="bg-green-400 text-white p-2"
      >
        Approve:
      </button>
      <div className="flex flex-col">
        <input
          type="text"
          value={spender}
          onChange={(e) => setSpender(e.target.value)}
          className=" border-2 p-2"
          placeholder="spender"
        />
        <input
          type="text"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className=" border-2 p-2"
          placeholder="amount"
        />
      </div>
      {data && (
        <div>
          Approve successfully, check the transaction{' '}
          <a
            href={`https://goerli.etherscan.io/tx/${data.hash}`}
            className="text-blue-400"
            target="_blank"
          >
            here
          </a>
        </div>
      )}
    </div>
  )
}
