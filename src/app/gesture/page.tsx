"use client";

import React, { useEffect, useState } from "react";
import {
  GestureRecognizer,
  FilesetResolver,
  DrawingUtils,
} from "@mediapipe/tasks-vision";

const Gesture: React.FC = () => {
  type RunningMode = "IMAGE" | "VIDEO";

  const videoHeight = "360px";
  const videoWidth = "480px";

  const [gestureRecognizer, setGestureRecognizer] =
    useState<GestureRecognizer | null>(null);
  const [runningMode, setRunningMode] = useState<RunningMode>("IMAGE");
  const [webcamRunning, setWebcamRunning] = useState<boolean>(false);

  useEffect(() => {
    const demosSection = document.getElementById("demos");

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
      demosSection?.classList.remove("invisible");
    };

    createGestureRecognizer();
  }, [runningMode]);
  console.log("createGestureRecognizer");

  const handleClick = async (
    event: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (runningMode === "VIDEO") {
      setRunningMode("IMAGE");
      await gestureRecognizer.setOptions({ runningMode: "IMAGE" });
    }

    const allCanvas = event.currentTarget.getElementsByClassName(
      "canvas"
    ) as HTMLCollectionOf<HTMLCanvasElement>;
    for (let i = allCanvas.length - 1; i >= 0; i--) {
      const n = allCanvas[i];
      n.parentNode?.removeChild(n);
    }

    const results = gestureRecognizer.recognize(event.currentTarget);

    // View results in the console to see their format
    console.log(results);

    if (results.gestures.length > 0) {
      const p = event.currentTarget.parentNode?.childNodes[3] as HTMLElement;
      p.setAttribute("class", "info");

      const categoryName = results.gestures[0][0].categoryName;
      const categoryScore = Number(results.gestures[0][0].score * 100).toFixed(
        2
      );
      const handedness = results.handedness[0][0].displayName;

      p.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`;

      const canvas = document.createElement("canvas");
      canvas.setAttribute("class", "canvas");
      canvas.setAttribute("width", `${event.currentTarget.naturalWidth}px`);
      canvas.setAttribute("height", `${event.currentTarget.naturalHeight}px`);
      canvas.style.cssText = `left: 0px; top: 0px; width: ${event.currentTarget.width}px; height: ${event.currentTarget.height}px;`;
      event.currentTarget.parentNode?.appendChild(canvas);
      const canvasCtx = canvas.getContext("2d");
      const drawingUtils = new DrawingUtils(
        canvasCtx as CanvasRenderingContext2D
      );
      for (const landmarks of results.landmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          {
            color: "#00FF00",
            lineWidth: 50,
          }
        );
        drawingUtils.drawLandmarks(landmarks, {
          color: "#FF0000",
          lineWidth: 1,
        });
      }
    }
  };

  let lastVideoTime = -1;
  let webcamResults: any = undefined;

  console.log("before predictWebcam");

  const predictWebcam = async () => {
    console.log("in predictWebcam");
    const videoElement = document.getElementById("webcam") as HTMLVideoElement;

    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      await gestureRecognizer?.setOptions({ runningMode: "VIDEO" });
    }

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
    videoElement.style.height = videoHeight;
    canvasElement.style.width = videoWidth;
    videoElement.style.width = videoWidth;

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
      window.requestAnimationFrame(predictWebcam);
    }
    console.log("after predictWebcam");
  };

  predictWebcam();

  const enableWebcam = async () => {
    if (!gestureRecognizer) {
      return;
    }

    setWebcamRunning((prev) => !prev);
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
      const videoElement = document.getElementById(
        "webcam"
      ) as HTMLVideoElement;
      videoElement.srcObject = stream;
      videoElement.addEventListener("loadeddata", predictWebcam);
    } catch (error) {
      console.error("Error accessing webcam:", error);
    }
  };
  // ... (Rest of the code for Demo 2 and other sections)

  return (
    <div>
      {/* Your JSX code goes here */}
      <button id="webcamButton" onClick={enableWebcam}>
        Enable Webcam
      </button>
      <video
        className="z-10"
        id="webcam"
        width={videoWidth}
        height={videoHeight}
        autoPlay
      ></video>
      <canvas id="output_canvas" className="z-10" />
      <div id="gesture_output" />
    </div>
  );
};

export default Gesture;
