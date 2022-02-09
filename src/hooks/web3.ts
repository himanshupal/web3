import { ethers } from 'ethers'
import { ref } from 'vue'

const web3 = ref<ethers.providers.Web3Provider>()
const ethereum = window.ethereum

const getAccounts = async () => {
	try {
		return await ethereum.request({
			method: 'eth_requestAccounts'
		})
	} catch (err: any) {
		console.log(err.message)
	}
}

export const useWeb3 = () => {
	const connect = async () => {
		if (ethereum) {
			console.log(await getAccounts())
			web3.value = new ethers.providers.Web3Provider(ethereum as unknown as ethers.providers.ExternalProvider)
		}
	}

	const getAddress = async () => {
		const signer = web3.value?.getSigner()
		return await signer?.getAddress()
	}

	return {
		web3,
		connect,
		getAddress
	}
}
