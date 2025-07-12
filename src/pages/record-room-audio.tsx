/** biome-ignore-all lint/suspicious/noConsole: <explanation> */
import { useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import type { RoomParams } from "@/@types/room-params";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";

const isRecordingSupported =
  !!navigator.mediaDevices &&
  typeof navigator.mediaDevices.getUserMedia === "function" &&
  typeof window.MediaRecorder === "function";

export const RecordRoomAudio = () => {
  const recorder = useRef<MediaRecorder | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  const params = useParams<RoomParams>();

  const createRecorder = (audio: MediaStream) => {
    recorder.current = new MediaRecorder(audio, {
      mimeType: "audio/webm",
      audioBitsPerSecond: 64_000,
    });

    recorder.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        uploadAudio(event.data);
      }
    };

    recorder.current.onstart = () => {
      console.log("gravação iniciada");
    };

    recorder.current.onstop = () => {
      console.log("gravação pausada");
    };

    recorder.current.start();
  };

  const startRecording = async () => {
    if (!isRecordingSupported) {
      alert("O seu navegador não suporta gravação");
      return;
    }
    setIsRecording(true);

    const audio = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: 44_100,
      },
    });

    intervalRef.current = setInterval(() => {
      recorder.current?.stop();

      createRecorder(audio);
    }, 5000);
  };

  const stopRecording = () => {
    setIsRecording(false);

    if (recorder.current && recorder.current.state !== "inactive") {
      recorder.current.stop();
    }

    if(intervalRef.current){
      clearInterval(intervalRef.current)
    }
  };

  if (!params.roomId) {
    return <Navigate replace to="/" />;
  }

  const uploadAudio = async (audio: Blob) => {
    const formData = new FormData();

    formData.append("file", audio, "audio.webm");

    const res = await api.post(`rooms/${params.roomId}/audio`, formData);

    console.log(res);
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-3">
      {isRecording ? (
        <Button onClick={stopRecording}>Pausar gravação</Button>
      ) : (
        <Button onClick={startRecording}>Gravar Áudio</Button>
      )}
      {isRecording ? <p>Gravando....</p> : <p>Pausado</p>}
    </div>
  );
};
