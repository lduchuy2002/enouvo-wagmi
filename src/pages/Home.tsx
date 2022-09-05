import { useAccount } from 'wagmi'

export default function Home() {
  const { address } = useAccount()

  return (
    <div>
      <div>You're connected now</div>
      <div>Your address: {address}</div>
    </div>
  )
}
