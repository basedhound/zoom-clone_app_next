"use client";
// ==============================
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import { Loader } from "lucide-react";
// ==============================
import { useGetCallById } from "@/hooks/useGetCallById";
import Alert from "@/components/Alert";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
// ============================================================

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { isLoaded, user } = useUser(); // Clerk
  const { call, isCallLoading } = useGetCallById(id); // Custom hook to fetch call data + id params
  const [isSetupComplete, setIsSetupComplete] = useState(false);

  // Check if user is inside Call
  if (!isLoaded || isCallLoading) return <Loader />;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup /* setIsSetupComplete={setIsSetupComplete}  */ />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
