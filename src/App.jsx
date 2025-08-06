import { useEffect, useState } from 'react'
import React from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import axios from 'axios'

function App() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [resultImage, setResultImage] = useState(null)
  const [loading, setLoading] = useState(false)

  // ใช้ useEffect แทน react-helmet
  useEffect(() => {
    // ตั้งค่า title
    document.title = 'Shark Species Detection'

    // ตั้งค่า meta description (ถ้าต้องการ)
    let metaDescription = document.querySelector('meta[name="description"]')
    if (!metaDescription) {
      metaDescription = document.createElement('meta')
      metaDescription.name = 'description'
      document.head.appendChild(metaDescription)
    }
    metaDescription.content = 'อัปโหลดรูปภาพเพื่อใช้ YOLOv8 ตรวจจับวัตถุในภาพ'

    // Cleanup function (ถ้าต้องการคืนค่าเดิม)
    return () => {
      document.title = 'Vite + React' // หรือชื่อเดิมที่ต้องการ
    }
  }, [])

  const handleChange = (e) => {
    const file = e.target.files[0]
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setResultImage(null)
  }

  const handleUpload = async () => {
    if (!image) return
    const formData = new FormData()
    formData.append('image', image)
    setLoading(true)

    try {
      const res = await axios.post('https://detection-api.onrender.com/api/detection', formData)
      console.log('Response data:', res.data) // Debug log

      // ตั้งค่าผลลัพธ์
      setResult(res.data.result) // class names ที่ detect ได้

      // ตั้งค่ารูปผลลัพธ์
      if (res.data.imageUrl) {
        setResultImage(res.data.imageUrl)
      }

    } catch (err) {
      console.error('Error:', err)
      setResult('เกิดข้อผิดพลาด: ' + (err.response?.data?.error || err.message))
    }

    setLoading(false)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <h1 className="text-2xl font-bold mb-4">YOLOv8 Object Detection</h1>

        {/* คำอธิบายเกี่ยวกับสิ่งที่ระบบสามารถตรวจจับได้ */}
        <div className="bg-white p-4 rounded shadow mb-4 max-w-xl text-center">
          <p className="text-gray-700 mb-2">
            ระบบสามารถจำแนกสายพันธุ์ฉลามต่อไปนี้ได้:
          </p>
          <ul className="text-gray-800 list-disc list-inside ">
            <li>Blue Shark</li>
            <li>Bull Shark</li>
            <li>Mako Shark</li>
            <li>Sand Tiger Shark</li>
            <li>White Shark</li>
            <li>Whitetip Shark</li>
            <li>Hammerhead Shark</li>
            <li>Nurse Shark</li>
            <li>Tiger Shark</li>
            <li>Whale Shark</li>
          </ul>
          <p className="text-sm text-gray-500 mt-3">
            *หมายเหตุ: ระบบใช้โมเดล YOLOv8 ขนาดเล็กที่สุด (Nano Model) เพื่อรองรับการรันบน Server ขนาดเล็ก*
          </p>
        </div>

        <input type="file" accept="image/*" onChange={handleChange} className="mb-4 border p-2" />

        {preview && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">รูปต้นฉบับ:</h3>
            <img src={preview} alt="preview" className="w-80 rounded shadow" />
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!image || loading}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'กำลังวิเคราะห์...' : 'อัปโหลดรูป'}
        </button>

        {result && (
          <div className="mt-6 text-center">
            <h3 className="text-lg font-semibold mb-2">ผลการตรวจจับ:</h3>

            {resultImage && (
              <div className="flex flex-col items-center">
                <h3 className="text-lg font-semibold mb-2">รูปผลลัพธ์:</h3>
                <img
                  src={resultImage}
                  alt="ผลตรวจจับ"
                  className="w-80 rounded shadow mx-auto"
                  onError={(e) => {
                    console.error('Image load error:', e)
                    console.log('Failed image URL:', resultImage)
                  }}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>

  )
}

export default App