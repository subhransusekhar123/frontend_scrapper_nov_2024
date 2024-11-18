"use client"
import React, { FormEvent, useEffect } from 'react'
import { Label } from './ui/label'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { ArrowBigUpDash, Loader2, Terminal } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"



const FileUploader = ({ localhost }) => {
    const [file, setFile] = React.useState(null);
    const [scrappingDone, setScrappingDone] = React.useState(false);
    const [scrappingStatusRunning, setScrappingStatusRunning] = React.useState(false);

    useEffect(()=>{

    },[scrappingStatusRunning,scrappingDone])


    const changeHandler = (e: any) => {
        setFile(e.target.files[0]);
        console.log(file)
    }

    const data = new FormData()


    async function onSubmit(event: any) {
        event.preventDefault()
        try {
            data.append("csvFile", file)
            console.log(data)
            setScrappingStatusRunning(prevStatus => !prevStatus)
            const response = await fetch(`http://localhost:${localhost}/csv`, {
                method: 'POST',
                body: data,
            })

            // Handle response if necessary
            const apiResponseData = await response.json()
            setScrappingDone(!scrappingDone)
            setScrappingStatusRunning(prevStatus => !prevStatus)
            console.log(apiResponseData);
        } catch (err) {
            console.log(err)
            setScrappingStatusRunning(prevStatus => !prevStatus)
        }

    }
    return (
        <>
            <form className="grid w-full max-w-sm items-center gap-1.5" onSubmit={onSubmit}>
                <div>
                    <Label htmlFor="picture">excel file</Label>
                    <Input id="picture" type="file" onChange={changeHandler} />
                </div>
                {
                    scrappingStatusRunning ?
                        <Button disabled>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button> :
                        <Button variant="secondary" type="submit">
                            <ArrowBigUpDash />upload file
                        </Button>

                }



            </form>
            {
                scrappingDone ? <Alert>
                    <Terminal className="h-4 w-4" />
                    <AlertTitle>1000 completed!</AlertTitle>
                    <AlertDescription>
                        You can add components and dependencies to your app using the cli.
                    </AlertDescription>
                </Alert> : ""
            }


        </>

    )
}

export default FileUploader