'use client';

import { Player } from '@livepeer/react';
import { useContractWrite, usePrepareContractWrite } from 'wagmi';
import { abi } from '@/constants/demonft';
import livePeerAsset_test from '../mock/livepeerAssetEx.json';


const DemoNFT_Address = "0x762353AdF1342ba85f6dDEac0446E2DA43ab84bf";

export default function Card({ address, demos }) {

    const { config } = usePrepareContractWrite({
        address: DemoNFT_Address,
        abi: abi,
        functionName: 'mintNFT',
        args: [
            address,
            demos
        ]
    })

    const {
        data: contractWriteData,
        isSuccess,
        write,
        error: contractWriteError,
    } = useContractWrite(config)
    
    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
                {/* nft player */}
                <Player
                    title={demos?.spec.nftMetadata.name}
                    src={demos?.url}
                    autoPlay
                    muted
                />
            </a>
            <div className="px-5 pb-5 pt-5">
                <a href="#">
                    {/* nft title */}
                    <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{demos?.spec?.nftMetadata.name}</h5>
                </a>
                {/* nft description */}
                <div className="flex items-center mt-3 mb-5">
                    <p>{demos?.spec?.nftMetadata.description}</p>
                </div>
                {/* nft price */}
                <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">1 ETH</span>
                    {
                        address && livePeerAsset_test && !contractWriteData
                        ?
                        <a 
                            onClick={() => write()}
                            className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >Mint NFT
                        </a> 
                        : null
                    }
                    {
                        contractWriteData?.hash && isSuccess
                        ?
                        <a 
                            target='_blank'
                            href={`https://calibration.filfox.info/en/message/${contractWriteData.hash}`}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >View Mint Transaction
                        </a>
                        : contractWriteError
                        ? <p>{contractWriteError.message}</p>
                        : null
                    }
                </div>
            </div>
        </div>
    )
}