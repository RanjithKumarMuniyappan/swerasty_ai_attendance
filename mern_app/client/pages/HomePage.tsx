
import React, { useRef, useEffect, useState } from 'react';
import { CheckCircleIcon, VideoCameraIcon } from '../components/icons/Icons';

const HomePage: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [attendanceMarked, setAttendanceMarked] = useState(false);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera: ", err);
        setCameraError("Camera access was denied. Please allow camera permissions in your browser settings.");
      }
    };

    enableCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleMarkAttendance = () => {
    setAttendanceMarked(true);
    setTimeout(() => setAttendanceMarked(false), 3000); // Reset after 3 seconds
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4 text-center">Mark Your Attendance</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6 text-center">Position your face clearly within the frame and click the button below.</p>

        <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden shadow-inner mb-6">
          {cameraError ? (
            <div className="flex flex-col items-center justify-center h-full text-center text-red-500 p-4">
              <VideoCameraIcon className="h-12 w-12 mb-2" />
              <p className="font-semibold">Camera Error</p>
              <p className="text-sm">{cameraError}</p>
            </div>
          ) : (
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover transform -scale-x-100"></video>
          )}
        </div>

        <div className="flex justify-center">
            <button
                onClick={handleMarkAttendance}
                disabled={!!cameraError || attendanceMarked}
                className={`relative inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 text-lg font-bold text-white rounded-lg shadow-lg transition-all duration-300 ease-in-out overflow-hidden
                ${!!cameraError ? 'bg-gray-400 cursor-not-allowed' : ''}
                ${attendanceMarked ? 'bg-green-600' : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transform hover:-translate-y-1'}`}
            >
                {attendanceMarked ? (
                    <>
                        <CheckCircleIcon className="h-6 w-6 mr-3"/>
                        Attendance Marked!
                    </>
                ) : (
                    'Mark Attendance'
                )}
            </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
