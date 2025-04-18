'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from 'next/navigation';

interface MenuItem {
  id: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { id: 'start-game', label: 'Start Game' },
  { id: 'dummy-1', label: 'Dummy 1' },
];

export default function MainMenu() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();

  const handleSelect = () => {
    const selectedItem = menuItems[selectedIndex];
    if (selectedItem.id === 'start-game') {
      router.push('/game');
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'w') {
        setSelectedIndex((prev) => Math.max(0, prev - 1));
      } else if (e.key === 's') {
        setSelectedIndex((prev) => Math.min(menuItems.length - 1, prev + 1));
      } else if (e.key === 'Enter') {
        handleSelect();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [selectedIndex]);

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <h1 className="text-2xl font-bold mb-8 text-center">QR Code Game</h1>
        <div className="flex flex-col gap-2">
          {menuItems.map((item, index) => (
            <Button
              key={item.id}
              variant={index === selectedIndex ? "default" : "outline"}
              className="w-full"
              onClick={() => {
                setSelectedIndex(index);
                handleSelect();
              }}
            >
              {item.label}
            </Button>
          ))}
        </div>
        <div className="mt-8 text-sm text-muted-foreground text-center">
          Scan QR codes to navigate (w: up, s: down, enter: select)
        </div>
      </CardContent>
    </Card>
  );
} 