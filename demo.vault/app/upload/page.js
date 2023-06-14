'use client';

import { useCreateAsset, Player, useAsset, useUpdateAsset } from "@livepeer/react"
import { useState, useRef, useMemo, useEffect } from 'react';
import Button from "@/components/Button";
import Navbar from "@/components/Navbar";
// import TestAsset from '../../mock/asset.json';

export default function Upload() {
    // creating asset
    const [video, setVideo] = useState(null)
    const fileInput = useRef(null)
    //updating asset
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [assetId, setAssetId] = useState("")
    const [returnVideo, setReturnVideo] = useState("")

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

    const { data: asset } = useAsset({
        assetId,
    })

    const {
        data: updatedAsset,
        mutate: updateAsset,
        statusUpdate,
        errorUpdate,
    } = useUpdateAsset({
        assetId,
        name: name,
        storage: {
            ipfs: true,
            metadata: {
                name: name,
                description: description,
            },
        }
    })

    return (
        <>
            <Navbar />
            <div className="flex flex-col justify-center items-center">
                <div className="border-2 m-5 p-10">
                    <h1 className='font-bold'>Step 1</h1>
                    <h1>Upload video into Livepeer</h1>
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
                                    <div>Playback URL: {asset?.playbackUrl}</div>
                                    <div>Asset id: {asset?.id}</div>
                                </div>
                            </div>
                        ))
                    }
                </div>


                {/* Update Asset with IPFS metadata info */}
                <div className='border-2 m-3 p-10'>
                    <h1 className='font-bold'>Step 2</h1>
                    <h1>Update the metadata info</h1>
                    <form className='flex flex-col'>
                        <label>Enter Asset id</label>
                        <input className="border-2" type="text" value={assetId} onChange={(e) => {
                            setAssetId(e.target.value)
                        }}/>
                        <label>Enter NFT name</label>
                        <input className="border-2" type="text" value={name} onChange={(e) => setName(e.target.value)}/>
                        <label>Enter NFT description</label>
                        <input className="border-2" type="text" value={description} onChange={(e) => setDescription(e.target.value)}/>
                        <Button
                            disabled={statusUpdate === 'loading'}
                            onClick={() => {
                                updateAsset?.();
                            }}
                        >Upload to IPFS
                        </Button>
                    </form>
                    {
                        updatedAsset &&
                        <>
                            <div>Asset name: {updatedAsset?.name}</div>
                            <div>Asset description: {updatedAsset?.description}</div>
                            <div>IPFS url: {updatedAsset?.storage?.ipfs?.url}</div>
                        </>
                    }
                    {statusUpdate && <div>{statusUpdate.message}</div>}
                    {errorUpdate && <div>{errorUpdate.message}</div>}
                </div>
                {
                    asset && 
                    <pre>
                        <code>{JSON.stringify(asset?.storage?.ipfs, null, 2)}</code>
                    </pre>
                }
        
                {/* Player */}
                {
                    asset && (
                        <Player 
                        title={asset?.name}
                        playbackId={asset?.playbackId}
                        autoPlay
                        muted
                        autoUrlUpload={{ fallback: true, ipfsGateway: 'https://w3s.link'}}
                        />
                    )
                }
            </div>
        </>
    )
}