import { useAccount, useBalance } from 'wagmi'

export default function Home() {
  const { address } = useAccount()
  const { data } = useBalance({
    addressOrName: address,
  })

  return (
    <div>
      <div>Your address: {address}</div>
      <div>
        Balance: {data?.formatted ?? ''} {data?.symbol ?? ''}
      </div>
    </div>
  )
}
