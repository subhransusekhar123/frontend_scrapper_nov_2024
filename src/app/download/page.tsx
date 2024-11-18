"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from '@/components/ui/button'
import { ArrowBigDownDash, Terminal, Trash2 } from 'lucide-react'
import downloadExcel from "@/utils/downloadXlsx.js"

type ele = {
    createdAt: ReactNode
    fileName: ReactNode
    items(items: any): void
    emails: Array<string>
    url: String
    _id: Number

}


const page = () => {
    const [data, setData] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('http://localhost:9000/csv/allData')
            .then((res) => res.json())
            .then((data) => {
                setData(data)
                setLoading(false)
                console.log(data, 'data');
            })
    }, [isLoading])


    const deleteHandler = (itemid: any) => {
        fetch(`http://localhost:9000/csv/deleteData/${itemid}`, { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data)
                setLoading(!isLoading)
                console.log(data, 'data');
            })
    }

    const deleteAllHandler = () => {
        fetch(`http://localhost:9000/csv/deleteAllData`, { method: "DELETE" })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data)
                setLoading(!isLoading)
                console.log(data, 'data');
            })
    }

    const downloadAllHandler = async() => {
        console.log('hello world!!')
        console.log(data.length)

        const downloadPromise = data.map(async (ele: any) => {
            console.log(ele)
            try {
                await downloadExcel(ele?.items)
            } catch (error) {
                console.log(error)
            }

        })

        try {
            await  Promise.all(downloadPromise)
        }catch(err){
            console.log(err)
        }
    }

    return (
        <div>
            <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">number</TableHead>
                        <TableHead>name</TableHead>
                        <TableHead>date</TableHead>
                        <TableHead className="text-right">
                            <Button variant="secondary" className='bg-red-600 text-white' onClick={deleteAllHandler}>
                                <Trash2 />delete all files
                            </Button>
                        </TableHead>
                        <TableHead className="text-right">
                            <Button variant="secondary" className='bg-green-600 text-white' onClick={downloadAllHandler}>
                                <ArrowBigDownDash />download all files
                            </Button>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    {
                        isLoading ? <h1>Loading...</h1> :
                            data.map((ele: ele, index) => {
                                console.log(ele)
                                return <TableRow>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>{ele?.fileName}</TableCell>
                                    <TableCell>{ele?.createdAt}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="secondary" className='bg-green-500 text-black' onClick={() => downloadExcel(ele?.items)}>
                                            <ArrowBigDownDash />download file
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="secondary" className='bg-red-600 text-white' onClick={() => deleteHandler(ele?._id)}>
                                            <Trash2 />delete file
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            })
                    }

                </TableBody>
            </Table>

        </div>
    )
}

export default page