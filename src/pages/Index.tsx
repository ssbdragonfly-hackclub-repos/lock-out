
import { useState, useEffect } from "react";
import Button from "@/components/Button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/cn";

const Index = () => {
  const [stage, setStage] = useState<"initial" | "thinking" | "yelling">("initial");
  const [audio, setAudio] = useState<{ alarm: HTMLAudioElement } | null>(null);
  const { toast } = useToast();

  const yellResponses = [
    "WHAT ARE YOU DOING HERE? GO WORK! 😤",
    "OH NO YOU DON'T! BACK TO WORK! 😠",
    "NICE TRY BUDDY! GET WORKING! 🚨",
    "DID I STUTTER? WORK TIME! 😡",
    "PROCRASTINATION DETECTED! EMERGENCY! 🔥",
    "AYO? 🤨📸 CAUGHT IN 4K!",
    "NAH FAM, NOT ON MY WATCH! 💀",
    "YOUR MOM WOULD BE SO DISAPPOINTED RN ... if she were home 😭",
    "BRO THINKS HE CAN SLACK OFF 💀💀💀",
    "RIZZ LEVEL: -9000 FOR THIS ONE 📉",
  ];

  const thinkingResponses = [
    "Let me think about that... 🤔",
    "Hmm... checking if paneer is bad... 📚",
    "Checking if Daya will come back... 😏",
    "Running truth analysis... 🔍",
    "Checking if you know how to cook... 🧐",
    "Loading excuses detector... 🔄",
    "Analyzing cap levels... 🧢",
    "AI detecting major skill issues... 💀",
    "Calculating your rizz... 📊",
    "Scanning for productivity... 🔬",
    "Checking if you are reading a book... 📖",
  ];

  const sorryResponses = [
    "I'm Sorry! I'll Work Now! 😔",
    "OK OK I'M GOING! 😭",
    "FINE, YOU WIN! 🏃‍♂️💨",
    "MY FAULT FR FR 😔",
    "RIZZ RESTORED ✨",
    "I'M SORRY I'M SORRY! 🙏",
    "I WILL ATTEND THERAPY! 🤦‍♂️",
    "I WILL MAKE BAPU JI PROUD! 🙏",
  ];

  useEffect(() => {
    const alarmAudio = new Audio("/alarm.mp3");
    alarmAudio.volume = 0.3;
    setAudio({ alarm: alarmAudio });
      if (alarmAudio) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0;
      }
  }, []);

  const getRandomResponse = (responses: string[]) => {
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const playTTS = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.pitch = 1.7;
    utterance.rate = 1.3;
    utterance.volume = 1;
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.name.includes('Google') || v.name.includes('Microsoft'));
    if (voice) {
      utterance.voice = voice;
    }
    window.speechSynthesis.speak(utterance);
  };

  const handleYes = () => {
    setStage("thinking");
    if (audio) {
      audio.alarm.play();
      setTimeout(() => {
        audio.alarm.pause();
        audio.alarm.currentTime = 0;
      }, 2000);
    }
    setTimeout(() => {
      setStage("yelling");
      const yellText = getRandomResponse(yellResponses);
      playTTS(yellText.replace(/[😤😠🚨😡🔥🤨📸💀😭📉🧢]/gu, '')); 
      toast({
        title: "THEN WHY ARE YOU HERE? 😱",
        description: yellText,
        variant: "destructive",
      });
    }, 2500);
  };

  const handleNo = () => {
    setStage("thinking");
    setTimeout(() => {
      setStage("yelling");
      const yellText = getRandomResponse(yellResponses);
      playTTS(yellText.replace(/[😤😠🚨😡🔥🤨📸💀😭📉🧢]/gu, ''));
      toast({
        title: "CAUGHT IN 4K! 📸",
        description: yellText,
        variant: "destructive",
      });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="mx-auto max-w-md">
        <div
          className={cn(
            "rounded-2xl bg-white p-8 shadow-lg transition-all duration-500",
            stage === "yelling" && "animate-shake bg-red-50",
            stage === "thinking" && "animate-pulse bg-yellow-50"
          )}
        >
          <h1 className={cn(
            "mb-8 text-center text-3xl font-bold text-gray-900 transition-all duration-300",
            stage === "yelling" && "text-red-600 animate-bounce",
            stage === "thinking" && "text-yellow-600"
          )}>
            {stage === "initial" && "Hey there! 👋"}
            {stage === "thinking" && getRandomResponse(thinkingResponses)}
            {stage === "yelling" && "BUSTED! 🚨"}
          </h1>

          {stage === "initial" && (
            <div className="animate-scale-in space-y-4">
              <p className="text-center text-lg text-gray-600">
                Do you need to be doing work right now? 🤔
              </p>
              <div className="flex justify-center space-x-4">
                <Button onClick={handleYes} className="hover:scale-110 transition-transform">Yes</Button>
                <Button variant="secondary" onClick={handleNo} className="hover:scale-110 transition-transform">
                  No
                </Button>
              </div>
            </div>
          )}

          {stage === "thinking" && (
            <div className="animate-scale-in text-center">
              <p className="text-lg text-gray-600 animate-pulse">
                {getRandomResponse(thinkingResponses)}
              </p>
            </div>
          )}

          {stage === "yelling" && (
            <div className="animate-scale-in space-y-6">
              <p className="text-center text-2xl font-bold text-red-600 animate-bounce">
                {getRandomResponse(yellResponses)}
              </p>
              <div className="text-center">
                <Button
                  onClick={() => setStage("initial")}
                  className="animate-bounce hover:scale-110 transition-transform"
                >
                  {getRandomResponse(sorryResponses)}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
