import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanQRCodePanel({
  onScan,
}: {
  onScan: (result: string) => void;
}) {
  const scannerRef = useRef<HTMLDivElement>(null);

  // Fungsi untuk memainkan suara beep saat scan berhasil
  const playBeep = () => {
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = "square";
    oscillator.frequency.setValueAtTime(1000, ctx.currentTime); // 1000 Hz
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime); // volume kecil

    oscillator.start();
    oscillator.stop(ctx.currentTime + 0.1); // durasi 100ms
  };

  useEffect(() => {
    if (scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        scannerRef.current.id,
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        (decodedText) => {
          playBeep(); // ⬅️ Mainkan suara beep saat scan berhasil
          onScan(decodedText);
        },
        (error) => {
           console.log(error);
        }
      );

      return () => {
        scanner.clear().catch(() => {});
      };
    }
  }, []);

  return (
    <Card className="flex flex-col items-center justify-center text-center p-4">
      <CardHeader>
        <CardTitle>Scan QR Code</CardTitle>
      </CardHeader>
      <CardContent className="w-full">
        <div id="qr-reader" ref={scannerRef} className="w-full aspect-square" />
      </CardContent>
    </Card>
  );
}
