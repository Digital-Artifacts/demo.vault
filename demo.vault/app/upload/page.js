'use client';

import { useCreateAsset, Player } from "@livepeer/react"
import { useState, useRef, useMemo } from 'react';
import Button from "@/components/Button";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import { DemoNFT_Address, abi} from "@/constants/demonft";
import TestAsset from '../../mock/asset.json';

export default function Upload() {
    const { address } = useAccount();

    // Testing asset for minting function
    const [testAsset, setTestAsset] = useState(TestAsset)

    const { config } = usePrepareContractWrite({
        // Nft contract address
        address: "0x31b4BC9806410B4D0689821D9ac0a108388054e8",
        abi: abi,
        functionName: 'mintNFT',
        args: [
            address,
            testAsset[0]?.storage.ipfs,
        ],
    })

    const {
        data: contractWriteData,
        isSuccess,
        write,
        error: contractWriteError,
    } = useContractWrite(config)

    const [video, setVideo] = useState(null)
    const fileInput = useRef(null)
    // Player
    const [url, setUrl] = useState('')

    const {
        mutate: createAsset,
        data: assets,
        status,
        progress,
        error,
    } = useCreateAsset(
        video 
        ? {
            sources: [
                {
                    name: video.name,
                    file: video,
                    storage: {
                        ipfs: true,
                        metadata: {
                            name: 'interesting video',
                            description: 'a great description',
                        }
                    }
                }
            ]
        } 
        : null,
    )

    const chooseAsset = async () => {
        // When user clicks the button, open the file input dialog
        fileInput.current?.click();
    }

    const onChange = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setVideo(file);
    }

    const uploadAsset = async () => {
        await createAsset?.();
    }

    const progressFormatted = useMemo(
        () =>
          progress?.[0].phase === 'failed'
            ? 'Failed to process video.'
            : progress?.[0].phase === 'waiting'
            ? 'Waiting'
            : progress?.[0].phase === 'uploading'
            ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
            : progress?.[0].phase === 'processing'
            ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
            : null,
        [progress],
    )

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <ConnectButton />
            {video ? <p>{video.name}</p> : <p>Select a video file to upload.</p>}
            <Button onClick={video ? uploadAsset : chooseAsset}>
                {video ? 'Upload the asset' : 'Choose an asset'}
            </Button>
            <input 
                type="file"
                ref={fileInput}
                className="hidden"
                onChange={onChange}
            />
            <p>{progressFormatted}</p>
            {
                assets?.map((asset) => (
                    <div key={asset.id}>
                        <div>
                            <div>Asset Name: {asset?.name}</div>
                            <div>Asset Description: {asset?.storage?.metadata?.description}</div>
                            <div>Playback URL: {asset?.playbackUrl}</div>
                            <div>IPFS CID: {asset?.storage?.ipfs?.gatewayUrl ?? 'None'}</div>
                        </div>
                    </div>
                ))
            }
            {/* Player */}
            <p>IPFS URL</p>
            <input type='text' placeholder='ipfs://' onChange={(e) => setUrl(e.target.value)} />
            {url && <p>Provided value is not a valid identifier</p>}
            {
                url && (
                    <Player 
                    title={url}
                    src={url}
                    autoPlay
                    muted
                    autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link'}}
                    />
                )
            }
            {/* Mint NFT */}
            {
                address && testAsset
                ?
                <button onClick={async () => write()}>Mint NFT</button>
                : null
            }
            {
                contractWriteData?.hash && isSuccess
                ? (
                    <a
                        target="_blank"
                        href={`https://mumbai.polygonscan.com/tx/${contractWriteData.hash}`}
                    >
                        <Button>View Mint Transaction</Button>
                    </a>
                )
                : contractWriteError 
                ? <p>{contractWriteError.message}</p>
                : null
            }
        </div>
    )
}