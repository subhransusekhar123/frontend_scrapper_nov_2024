import Image from "next/image";
import FileUploader from "@/components/FileUploader";

export default function Home() {
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-evenly">
     <FileUploader localhost={1000}/>
     <FileUploader localhost={2000}/>
     <FileUploader localhost={4000}/>
     <FileUploader localhost={5000}/>
    </main>
  );
}
