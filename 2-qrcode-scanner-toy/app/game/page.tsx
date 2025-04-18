'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { GameItem, QR_CODE_MAPPINGS } from '../types/game';
import Image from 'next/image';

export default function GamePage() {
  const router = useRouter();
  const [scannedItems, setScannedItems] = useState<GameItem[]>([
    QR_CODE_MAPPINGS['r'],
    QR_CODE_MAPPINGS['t']
  ]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key in QR_CODE_MAPPINGS) {
        const item = QR_CODE_MAPPINGS[key];
        setScannedItems(prev => [...prev, item]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardContent className="pt-6">
          <h1 className="text-2xl font-bold mb-8 text-center">Game Started!</h1>
          <div className="text-center mb-8">
            Scan items in order according to their size, starting with the smallest.
          </div>
          
          <div className="grid grid-cols-3 gap-4 mb-8">
            {scannedItems.map((item, index) => (
              <div key={`${item.title}-${index}`} className="aspect-square relative">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => router.push('/')}
          >
            Back to Menu
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 