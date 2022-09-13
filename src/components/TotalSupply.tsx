import { useState } from 'react'
import { useContractRead } from 'wagmi'
import config from '../config/config'
import erc20ABI from '../contracts/erc20_abi.json'

export default function TotalSupply() {
  const [response, setResponse] = useState<string>('')

  const { data } = useContractRead({
    addressOrName: config.erc20Address,
    contractInterface: erc20ABI,
    functionName: 'totalSupply',
  })

  const handleButtonClick = () => {
    setResponse(String(Number(data) / Math.pow(10, 18)))
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleButtonClick}
        className="bg-green-400 text-white p-2"
      >
        Total supply:
      </button>
      {response && <div>{response} EVA</div>}
    </div>
  )
}
