"use client";

import { useEffect, useState, useRef } from "react";
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
  const [categoryNameState, setCategoryNameState] = useState<string>("");
  const [categoryScoreState, setCategoryScoreState] = useState<number>();

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [recognizedLetter, setRecognizedLetter] = useState<string>("");
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [textChallenge, setTextChallenge] = useState<string>(
    "She sell seashells on the sea shore"
  );

  let animationFrameId: number;

  useEffect(() => {
    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );

      const recognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/visionx_gesture_recognizer/gesture_recognizer_better.task",
          delegate: "GPU",
        },
        runningMode: runningMode,
        numHands: 1,
      });
      5;
      setGestureRecognizer(recognizer);
    };

    createGestureRecognizer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  let lastVideoTime = -1;
  let webcamResults: any = undefined;

  const PredictWebcam = async () => {
    if (webcamRef.current) {
      const videoElement = webcamRef.current.video;
      if (gestureRecognizer) {
        if (videoElement) {
          if (runningMode === "IMAGE") {
            setRunningMode("VIDEO");
            await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
          }
          const animate = async () => {
            const nowInMs = Date.now();

            if (videoElement.currentTime !== lastVideoTime) {
              lastVideoTime = videoElement.currentTime;
              webcamResults = gestureRecognizer.recognizeForVideo(
                videoElement,
                nowInMs
              );
            }

            // const canvasElement = document.getElementById(
            //   "output_canvas"
            // ) as HTMLCanvasElement;
            // const canvasCtx = canvasElement.getContext(
            //   "2d"
            // ) as CanvasRenderingContext2D;

            videoElement.style.width = videoWidth;
            videoElement.style.height = videoHeight;
            // canvasElement.style.width = videoWidth;
            if (webcamResults && webcamResults.gestures) {
              if (
                webcamResults.gestures.length > 0 &&
                webcamResults.handedness.length > 0
              ) {
                const categoryName =
                  webcamResults.gestures[0][0].categoryName || "none";
                const categoryScore: number = parseFloat(
                  Number(webcamResults.gestures[0][0].score * 100).toFixed(2)
                );

                setCategoryNameState(categoryName);
                setCategoryScoreState(categoryScore);
                setRecognizedLetter(categoryName);

                console.log(recognizedLetter);
              }
            }

            if (webcamRunning) {
              animationFrameId = requestAnimationFrame(animate);
            }
          };
          animationFrameId = requestAnimationFrame(animate);
        }
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

  function recognize() {
    if (textChallenge.length > 0) {
      const firstChallengeChar = textChallenge[0];

      if (
        recognizedLetter.toLowerCase() === firstChallengeChar.toLowerCase() ||
        firstChallengeChar === "." ||
        firstChallengeChar === " " ||
        firstChallengeChar === ","
      ) {
        const recognizedTextInitial = recognizedText + firstChallengeChar;
        setRecognizedText(recognizedTextInitial);

        const textChallengeInitial = textChallenge.slice(1);
        setTextChallenge(textChallengeInitial);
      }
    }
  }

  useEffect(() => {
    let i = 0;
    recognize();
    console.log(i + 1);
    i++;
  }, [recognizedLetter, categoryNameState, categoryScoreState]);

  return (
    <div className="w-screen h-screen bg-gray-800 flex">
      <div className="w-4/5 h-4/5 m-auto">
        <h3 className="w-full text-9xl font-bold text-center mt-20">
          {recognizedLetter}
        </h3>
        <h3 className="w-full text-3xl font-bold text-center mt-20">
          <span id="recognized-text">{recognizedText}</span>
          <span id="text-challenge" className="text-gray-400">
            {textChallenge}
          </span>
        </h3>
      </div>
      <div className="absolute">
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
          style={{ opacity: 0 }}
        />
        <canvas id="output_canvas" className="z-10" style={{ opacity: 0 }} />
      </div>
    </div>
  );
};

export default Gesture;
