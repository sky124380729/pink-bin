import React, { FC, useRef, ChangeEvent, useState } from 'react'
import axios from 'axios'
import UploadList from './uploadList'
import Button from '../Button/button'
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface UploadFile {
    uid: string
    size: number
    name: string
    status?: UploadFileStatus
    percent?: number
    raw?: File
    response?: any
    error?: any
}
export interface UploadProps {
    action: string
    defaultFileList?: UploadFile[]
    beforeUpload?: (file: File) => boolean | Promise<File>
    onProgress?: (percentage: number, file: File) => void
    onSuccess?: (data: any, file: File) => void
    onError?: (err: any, file: File) => void
    onChange?: (file: File) => void
    onRemove?: (file: UploadFile) => void
}
const Upload: FC<UploadProps> = (props) => {
    const { action, defaultFileList, beforeUpload, onProgress, onSuccess, onError, onChange, onRemove } = props
    const fileInput = useRef<HTMLInputElement>(null)
    const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
    const updateFileList = (uploadFile: UploadFile, updateObj: Partial<UploadFile>) => {
        setFileList((prevList) => {
            return prevList.map((file) => {
                if (file.uid === uploadFile.uid) {
                    return { ...file, ...updateObj }
                } else {
                    return file
                }
            })
        })
    }
    const handleClick = () => {
        if (fileInput.current) {
            fileInput.current.click()
        }
    }
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        if (!files) return
        uploadFiles(files)
        if (fileInput.current) fileInput.current.value = ''
    }
    const handleRemove = (file: UploadFile) => {
        setFileList((prevList) => {
            return prevList.filter((item) => item.uid !== file.uid)
        })
        if (onRemove) {
            onRemove(file)
        }
    }
    const uploadFiles = (files: FileList) => {
        const postFiles = Array.from(files)
        postFiles.forEach((file) => {
            if (!beforeUpload) {
                post(file)
            } else {
                const result = beforeUpload(file)
                if (result && result instanceof Promise) {
                    result.then((processedFile) => {
                        post(processedFile)
                    })
                } else if (result !== false) {
                    post(file)
                }
            }
        })
    }

    const post = (file: File) => {
        const _file: UploadFile = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file
        }
        setFileList([_file, ...fileList])
        const formData = new FormData()
        formData.append(file.name, file)
        axios
            .post(action, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: (e: ProgressEvent<EventTarget>) => {
                    const percentage = Math.round((e.loaded * 100) / e.total) || 0
                    if (percentage < 100) {
                        updateFileList(_file, { percent: percentage, status: 'uploading' })
                        if (onProgress) {
                            onProgress(percentage, file)
                        }
                    }
                }
            })
            .then((res) => {
                updateFileList(_file, { status: 'success', response: res.data })
                if (onSuccess) {
                    onSuccess(res.data, file)
                }
                if (onChange) {
                    onChange(file)
                }
            })
            .catch((err) => {
                updateFileList(_file, { status: 'error', response: err })
                if (onError) {
                    onError(err, file)
                }
                if (onChange) {
                    onChange(file)
                }
            })
    }

    return (
        <div className='viking-upload-component'>
            <Button btnType='primary' onClick={handleClick}>
                Upload File
            </Button>
            <input className='viking-file-input' ref={fileInput} onChange={handleFileChange} style={{ display: 'none' }} type='file' />
            <UploadList fileList={fileList} onRemove={handleRemove} />
        </div>
    )
}

export default Upload