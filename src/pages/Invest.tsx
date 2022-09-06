import { BigNumber } from 'ethers'
import { useEffect, useState } from 'react'
import { useAccount, useContractRead } from 'wagmi'
import config from '../config/config'
import stakingAbi from '../contracts/staking-abi.json'

export default function Invest() {
  const [stake, setStake] = useState('')
  const [rewards, setRewards] = useState('')

  const { address } = useAccount()

  const { error, isLoading } = useContractRead({
    addressOrName: config.stakingAddress,
    contractInterface: stakingAbi,
    functionName: 'getDepositInfo',
    args: [address],
    onSuccess: ({ _stake, _rewards }) => {
      setStake(_stake.toNumber())
      setRewards(_rewards.toNumber())
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div>
      <div>Your current stake: {stake} ETH</div>
      <div>Your current reward: {rewards} ETH</div>
    </div>
  )
}
