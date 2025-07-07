import { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanQRCodePanel({
  onScan,
}: {
  onScan: (result: string) => void;
}) {
  const playBeep = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1000, ctx.currentTime);
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1);
  };

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("qr-reader", { fps: 10, qrbox: 250 }, false);

    scanner.render(
      (decodedText) => {
        console.log("QR detected", decodedText);
        playBeep();
        onScan(decodedText);
      },
      (error) => {
        console.error("QR error", error);
      }
    );

    return () => {
      scanner.clear().catch((error) => console.error("Clear error", error));
    };
  }, []);

  return (
    <Card className="flex flex-col items-center justify-center text-center p-4">
      <CardHeader>
        <CardTitle>Scan QR Code</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div id="qr-reader" className="w-full aspect-square" />
      </CardContent>
    </Card>
  );
}
