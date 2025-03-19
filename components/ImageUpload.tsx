'use client';

import { IKImage, ImageKitProvider, IKUpload } from "imagekitio-next";
import config from '@/lib/config';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { toast } from "sonner";

const { env: { imagekit: { publicKey, urlEndpoint } } } = config;

const authenticator = async () => {
    try {
        const res = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`)

        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Request failed with status ${res.status}: ${errorText}`)
        }

        const data = await res.json();
        const { signature, expire, token } = data;

        return { token, expire, signature };
    } catch (error: any) {
        throw new Error(`Authentication request failed: ${error.message}`)
    }
}

const ImageUpload = ({ onFileChange}: {onFileChange: (filePath: string) => void}) => {
    const ikUploadRef = useRef(null)
    const [file, setFile] = useState<{ filePath: string } | null>(null)

    const onError = (error: any) => {
        console.log(error)

        toast.error(
            "Image upload failed", {
            description: `Your image could not be uploaded. Please try again.`,
        })
    }

    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);

        toast.success(
            "Image uploaded successfully", {
            description: `${res.filePath} uploaded successfully!`,
        })
    }

    return (
        <ImageKitProvider publicKey={publicKey} urlEndpoint={urlEndpoint} authenticator={authenticator}>
            <IKUpload ref={ikUploadRef} onError={onError} onSuccess={onSuccess} fileName="test-upload.png" />
            <button onClick={(e) => {
                e.preventDefault();
                if(ikUploadRef.current) {
                    // @ts-ignore
                    ikUploadRef.current?.click();
                }
            }}>
                <Image src="" alt={""} />
                <p>Upload a File</p>
                {file && <p>{file.filePath}</p>}

            </button>

            {file && (
                <IKImage
                    alt={file.filePath}
                    path={file.filePath}
                    width={500}
                    height={500}
                />
            )}
        </ImageKitProvider>
    )
}

export default ImageUpload