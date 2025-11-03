import { useState } from "react";
import uploadFile from "../utils/mediaUpload.js";

export default function TestPage() {
  const [file, setFile] = useState(null);

  async function handleUpload() {
    const url = await uploadFile(file);
    console.log("File uploaded to:", url);
  }
  return (
    <div className="w-full h-full flex justify-center items-center">
      <input
        type="file"
        onChange={(e) => {
          setFile(e.target.files[0]);
        }}
      />
      <button
        onClick={handleUpload}
        className="bg-red-500 p-2 text-white rounded-2xl"
      >
        Upload
      </button>
    </div>
  );
}
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12eml0aHl6eXd6emJpZ2Z5bWNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxNTIyMjksImV4cCI6MjA3NzcyODIyOX0.qCpBhrIrOSvmGol6xjIRaxaqs1WbcQYD40zqqbSXoDM
//https://mvzithyzywzzbigfymch.supabase.co
