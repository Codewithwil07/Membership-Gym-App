import { useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function ScanQRCodePanel({
  onScan,
}: {
  onScan: (result: string) => void;
}) {
  const scannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scannerRef.current) {
      const scanner = new Html5QrcodeScanner(
        scannerRef.current.id,
        { fps: 10, qrbox: 250 },
        false
      );

      scanner.render(
        (decodedText) => {
          onScan(decodedText);
        },
        (error) => {
          // Handle scan error (optional: console.log(error))
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
