import { useAccount, useBalance } from 'wagmi'
import {
  Allowance,
  Approve,
  BalanceOf,
  TotalSupply,
  Transfer,
  TransferFrom,
} from '../components'

export default function Home() {
  const { address } = useAccount()
  const { data } = useBalance({
    addressOrName: address,
  })

  return (
    <div>
      <div>Your address: {address}</div>
      <div className="mb-4">
        Your balance: {data?.formatted ?? ''} {data?.symbol ?? ''}
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="aspect-square flex items-center justify-center border-2">
          <BalanceOf />
        </div>
        <div className="aspect-square flex items-center justify-center border-2">
          <Transfer />
        </div>
        <div className="aspect-square flex items-center justify-center border-2">
          <Approve />
        </div>
        <div className="aspect-square flex items-center justify-center border-2">
          <TransferFrom />
        </div>
        <div className="aspect-square flex items-center justify-center border-2">
          <TotalSupply />
        </div>
        <div className="aspect-square flex items-center justify-center border-2">
          <Allowance />
        </div>
        {/* <div className="aspect-square flex items-center justify-center border-2">
          <Name />
        </div>
        <div className="aspect-square flex items-center justify-center border-2">
          <Symbol />
        </div>
        <div className="aspect-square flex items-center justify-center border-2">
          <Decimals />
        </div> */}
      </div>
    </div>
  )
}
