"use client";

import React, { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";

import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

const Gesture: React.FC = () => {
  type RunningMode = "IMAGE" | "VIDEO";

  const webcamRef = useRef<Webcam | null>(null);
  const videoHeight = "360px";
  const videoWidth = "480px";

  const videoConstraints = {
    facingMode: "user",
  };

  const [gestureRecognizer, setGestureRecognizer] =
    useState<GestureRecognizer | null>(null);
  const [runningMode, setRunningMode] = useState<RunningMode>("VIDEO");
  const [webcamRunning, setWebcamRunning] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  let animationFrameId: number;

  useEffect(() => {
    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
          delegate: "GPU",
        },
        runningMode: runningMode,
      });

      setGestureRecognizer(recognizer);
    };
    console.log("createGestureRecognizer");

    createGestureRecognizer();
  }, [runningMode]);

  let lastVideoTime = -1;
  let webcamResults: any = undefined;

  // console.log("before predictWebcam");

  const PredictWebcam = async () => {
    let i = 0;

    console.log((i += 1) + " hi");

    if (webcamRef.current) {
      const videoElement = webcamRef.current.video;

      if (videoElement) {
        if (runningMode === "IMAGE") {
          setRunningMode("VIDEO");
          await gestureRecognizer?.setOptions({ runningMode: "VIDEO" });
        }
        const animate = async () => {
          const nowInMs = Date.now();

          if (videoElement.currentTime !== lastVideoTime) {
            lastVideoTime = videoElement.currentTime;
            webcamResults = gestureRecognizer?.recognizeForVideo(
              videoElement,
              nowInMs
            );
          }

          const canvasElement = document.getElementById(
            "output_canvas"
          ) as HTMLCanvasElement;
          const canvasCtx = canvasElement.getContext(
            "2d"
          ) as CanvasRenderingContext2D;
          const gestureOutput = document.getElementById(
            "gesture_output"
          ) as HTMLElement;

          canvasCtx.save();
          canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

          const drawingUtils = new DrawingUtils(canvasCtx);

          canvasElement.style.height = videoHeight;
          videoElement.style.width = videoWidth;
          videoElement.style.height = videoHeight;
          canvasElement.style.width = videoWidth;

          if (webcamResults?.landmarks && webcamResults.gestures?.length > 0) {
            for (const landmarks of webcamResults.landmarks) {
              drawingUtils.drawConnectors(
                landmarks,
                GestureRecognizer.HAND_CONNECTIONS,
                {
                  color: "#00FF00",
                  lineWidth: 5,
                }
              );
              drawingUtils.drawLandmarks(landmarks, {
                color: "#FF0000",
                lineWidth: 2,
              });
            }
          }

          canvasCtx.restore();

          if (
            webcamResults?.gestures?.length > 0 &&
            webcamResults.handedness?.length > 0
          ) {
            gestureOutput.style.display = "block";
            gestureOutput.style.width = videoWidth;

            const categoryName =
              webcamResults.gestures[0][0]?.categoryName || "Unknown";
            const categoryScore = Number(
              webcamResults.gestures[0][0]?.score * 100 || 0
            ).toFixed(2);
            const handedness =
              webcamResults.handedness[0][0]?.displayName || "Unknown";

            gestureOutput.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
          } else {
            gestureOutput.style.display = "none";
          }

          if (webcamRunning) {
            animationFrameId = requestAnimationFrame(animate);
          }
        };
        animationFrameId = requestAnimationFrame(animate);
      }
    }
  };

  // for future purpose, this code is to avoid memory leaks
  const stopAnimation = () => {
    cancelAnimationFrame(animationFrameId);
  };

  PredictWebcam();

  const enableWebcam = async () => {
    if (!gestureRecognizer) {
      return;
    }

    setWebcamRunning((prev) => !prev);
    setIsPlaying((prev) => !prev);

    const enableWebcamButton = document.getElementById("webcamButton");

    if (enableWebcamButton) {
      if (webcamRunning) {
        enableWebcamButton.innerText = "ENABLE PREDICTIONS";
      } else {
        enableWebcamButton.innerText = "DISABLE PREDICTIONS";
      }
    }

    const constraints = {
      video: true,
    };
    console.log("try open webcam");
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (webcamRef.current) {
        const videoElement = webcamRef.current.video;
        if (videoElement) {
          videoElement.srcObject = stream;
        }
      }
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };

  return (
    <div>
      <button
        id="webcamButton"
        onClick={async () => {
          await enableWebcam();
        }}
      >
        Enable Webcam
      </button>

      <Webcam
        videoConstraints={videoConstraints}
        audio={false}
        ref={webcamRef}
        className="z-10"
        id="webcam"
        width={videoWidth}
        height={videoHeight}
        autoPlay={isPlaying}
      />

      <canvas id="output_canvas" className="z-10" />
      <div id="gesture_output" />
    </div>
  );
};

export default Gesture;
