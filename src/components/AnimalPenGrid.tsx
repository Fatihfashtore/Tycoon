import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AnimalModal from "./AnimalModal";

interface Animal {
  id: string;
  name: string;
  type: "chicken" | "cow" | "sheep";
  imageUrl: string;
  stats: {
    health: number;
    happiness: number;
    productivity: number;
  };
}

interface AnimalPen {
  id: string;
  name: string;
  type: "chicken" | "cow" | "sheep";
  capacity: number;
  animals: Animal[];
  imageUrl: string;
}

interface AnimalPenGridProps {
  pens?: AnimalPen[];
}

const AnimalPenGrid: React.FC<AnimalPenGridProps> = ({
  pens = defaultPens,
}) => {
  const [selectedPen, setSelectedPen] = useState<AnimalPen | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewAnimals = (pen: AnimalPen) => {
    setSelectedPen(pen);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-background p-4 w-full">
      <h2 className="text-2xl font-bold mb-6">Your Animal Pens</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {pens.map((pen) => (
          <Card key={pen.id} className="overflow-hidden">
            <div className="relative h-48 overflow-hidden">
              <img
                src={pen.imageUrl}
                alt={`${pen.name} Pen`}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2 bg-background/80 rounded-md px-2 py-1 text-sm font-medium">
                {pen.type.charAt(0).toUpperCase() + pen.type.slice(1)} Pen
              </div>
            </div>
            <CardContent className="pt-6">
              <h3 className="text-xl font-semibold mb-2">{pen.name}</h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Capacity: {pen.animals.length}/{pen.capacity} Animals
                  </span>
                  <span className="text-sm font-medium">
                    {Math.round((pen.animals.length / pen.capacity) * 100)}%
                  </span>
                </div>
                <Progress
                  value={(pen.animals.length / pen.capacity) * 100}
                  className="h-2"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleViewAnimals(pen)} className="w-full">
                View Livestock
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPen && (
        <AnimalModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          pen={selectedPen}
        />
      )}
    </div>
  );
};

// Default mock data
const defaultPens: AnimalPen[] = [
  {
    id: "1",
    name: "Clucky Coop",
    type: "chicken",
    capacity: 5,
    imageUrl:
      "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/kandang_ayam.png",
    animals: [
      {
        id: "c1",
        name: "Henrietta",
        type: "chicken",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/ayam.png",
        stats: { health: 85, happiness: 90, productivity: 75 },
      },
      {
        id: "c2",
        name: "Clucky",
        type: "chicken",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/ayam.png",
        stats: { health: 92, happiness: 88, productivity: 80 },
      },
      {
        id: "c3",
        name: "Feathers",
        type: "chicken",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/ayam.png",
        stats: { health: 78, happiness: 95, productivity: 70 },
      },
    ],
  },
  {
    id: "2",
    name: "Moo Meadow",
    type: "cow",
    capacity: 3,
    imageUrl:
      "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/kandang_sapi.png",
    animals: [
      {
        id: "co1",
        name: "Bessie",
        type: "cow",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/sapi.png",
        stats: { health: 95, happiness: 85, productivity: 90 },
      },
      {
        id: "co2",
        name: "Daisy",
        type: "cow",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/sapi.png",
        stats: { health: 88, happiness: 92, productivity: 85 },
      },
    ],
  },
  {
    id: "3",
    name: "Woolly Wonderland",
    type: "sheep",
    capacity: 4,
    imageUrl:
      "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/kandang_sapi.png",
    animals: [
      {
        id: "s1",
        name: "Fluffy",
        type: "sheep",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/domba.png",
        stats: { health: 90, happiness: 88, productivity: 82 },
      },
      {
        id: "s2",
        name: "Woolly",
        type: "sheep",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/domba.png",
        stats: { health: 85, happiness: 90, productivity: 78 },
      },
      {
        id: "s3",
        name: "Baa-bara",
        type: "sheep",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/domba.png",
        stats: { health: 92, happiness: 86, productivity: 80 },
      },
    ],
  },
  {
    id: "4",
    name: "Egg Factory",
    type: "chicken",
    capacity: 6,
    imageUrl:
      "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/kandang_ayam.png",
    animals: [
      {
        id: "c4",
        name: "Colonel",
        type: "chicken",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/ayam.png",
        stats: { health: 88, happiness: 82, productivity: 90 },
      },
      {
        id: "c5",
        name: "Nugget",
        type: "chicken",
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/ayam.png",
        stats: { health: 75, happiness: 80, productivity: 85 },
      },
    ],
  },
];

export default AnimalPenGrid;
