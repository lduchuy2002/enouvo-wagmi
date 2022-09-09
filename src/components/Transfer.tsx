import { useEffect, useState } from 'react'
import { useContractWrite, usePrepareContractWrite } from 'wagmi'
import config from '../config/config'
import erc20ABI from '../contracts/erc20_abi.json'

export default function Transfer() {
  const [address, setAddress] = useState<string>('')
  const [amount, setAmount] = useState<string>('')
  const [response, setResponse] = useState<string>('')

  const { config: configWriteMethod } = usePrepareContractWrite({
    addressOrName: config.erc20Address,
    contractInterface: erc20ABI,
    functionName: 'transfer',
    args: [address, amount],
    overrides: {
      gasLimit: '10000000',
    },
  })

  const { data, write: transfer } = useContractWrite(configWriteMethod)

  const handleButtonClick = () => {
    if (!transfer) {
      return
    }

    transfer()
  }

  useEffect(() => {
    console.log({ data })
  }, [data])

  return (
    <div className="flex items-start gap-2">
      <button
        onClick={handleButtonClick}
        className="bg-green-400 text-white p-2"
      >
        Transfer:
      </button>
      <div className="flex flex-col">
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className=" border-2 p-2"
          placeholder="address"
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
          Transfer successfully, check the transaction{' '}
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
