import React from 'react'
import { useState } from 'react'
import app from '../firebase/firebaseConnect'
import './Form.css'
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
} from 'firebase/storage'

const Form = () => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [file, setFile] = useState()
    const [fileUrl, setFileUrl] = useState('')
    const fieldName = [
        { name: 'Enter Your Name', type: 'text', handler: setName },
        { name: 'Enter Phone Number', type: 'tel', handler: setPhone },
        { name: 'Enter Email', type: 'email', handler: setEmail },
        { name: 'Enter Subject', type: 'text', handler: setSubject },
        { name: 'Upload File', type: 'file', handler: setFile },
    ]

    async function uploadFile() {
        const storage = getStorage(app)

        const storageRef = ref(storage, 'files/' + file.name)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log('Upload is ' + progress + '% done')
                // eslint-disable-next-line default-case
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused')
                        break
                    case 'running':
                        console.log('Upload is running')
                        break
                }
            },
            (error) => {
                console.error(error)
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL)
                    setFileUrl(downloadURL)
                })
            }
        )
    }
    // Upload comp

    async function submitAssignment() {
        uploadFile()
        const payload = {
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            fileUrl: fileUrl,
        }

        fetch('http://localhost:4000/add/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            referrerPolicy: 'no-referrer',
        })
    }
    return (
        <div className="login-page">
            <div className="form">
                <form className="login-form" onSubmit={(e) => {
                    e.preventDefault()
                    submitAssignment()
                }}>
                    <h2 style={{
                        color: "darkgreen"
                    }}>SUBMIT ASSIGNMENT</h2>
                    {fieldName.map((field) => <input type={field.type} placeholder={field.name} key={field.name} onChange={
                        field.type !== 'file'
                            ? (e) => field.handler(e.target.value)
                            : (e) => field.handler(e.target.files[0])
                    } />)}
                    <button>SUBMIT</button>

                </form>
            </div>
        </div>
    )
}

export default Form
