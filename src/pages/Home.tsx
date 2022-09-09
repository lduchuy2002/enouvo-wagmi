import { useAccount, useBalance } from 'wagmi'
import BalanceOf from '../components/BalanceOf'
import Transfer from '../components/Transfer'

export default function Home() {
  const { address } = useAccount()
  const { data } = useBalance({
    addressOrName: address,
  })

  return (
    <div>
      <div>Your address: {address}</div>
      <div>
        Your balance: {data?.formatted ?? ''} {data?.symbol ?? ''}
      </div>
      <BalanceOf />
      <Transfer />
    </div>
  )
}
