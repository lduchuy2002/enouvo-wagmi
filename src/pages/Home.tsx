import { Link } from 'react-router-dom'
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
      <div className="mt-4">
        <Link className="bg-green-400 text-white p-2" to="/invest">
          Go to invest now!
        </Link>
      </div>
    </div>
  )
}
