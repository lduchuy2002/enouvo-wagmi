import { useState } from 'react'
import { useContractRead } from 'wagmi'
import config from '../config/config'
import erc20ABI from '../contracts/erc20_abi.json'

export default function Allowance() {
  const [tokenOwner, setTokenOwner] = useState<string>('')
  const [spender, setSpender] = useState<string>('')
  const [response, setResponse] = useState<string>('')

  const { data } = useContractRead({
    addressOrName: config.erc20Address,
    contractInterface: erc20ABI,
    functionName: 'allowance',
    args: [tokenOwner, spender],
  })

  const handleButtonClick = () => {
    setResponse(String(Number(data) / Math.pow(10, 18)))
  }

  return (
    <div className="flex items-start gap-2">
      <button
        onClick={handleButtonClick}
        className="bg-green-400 text-white p-2"
      >
        Allowance:
      </button>
      <div className="flex flex-col">
        <input
          type="text"
          value={tokenOwner}
          onChange={(e) => setTokenOwner(e.target.value)}
          className=" border-2 p-2"
          placeholder="tokenOwner"
        />
        <input
          type="text"
          value={tokenOwner}
          onChange={(e) => setSpender(e.target.value)}
          className=" border-2 p-2"
          placeholder="spender"
        />
      </div>
      {response && <div>{response} EVA</div>}
    </div>
  )
}
