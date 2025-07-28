import React from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Animal {
  id: string;
  name: string;
  type: "chicken" | "cow" | "sheep";
  health: number;
  happiness: number;
  productivity: number;
  imageUrl: string;
}

interface AnimalPen {
  id: string;
  name: string;
  type: "chicken" | "cow" | "sheep";
  capacity: number;
  animals: Animal[];
  imageUrl: string;
}

interface AnimalModalProps {
  isOpen: boolean;
  onClose: () => void;
  pen: AnimalPen;
}

const AnimalModal = ({
  isOpen = true,
  onClose = () => {},
  pen = {
    id: "1",
    name: "Default Pen",
    type: "chicken",
    capacity: 5,
    imageUrl:
      "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/kandang_ayam.png",
    animals: [
      {
        id: "1",
        name: "Clucky",
        type: "chicken",
        health: 85,
        happiness: 90,
        productivity: 75,
        imageUrl:
          "https://cdn.jsdelivr.net/gh/fatihfashtore/Farm-tycoon@main/ayam.png",
      },
    ],
  },
}: AnimalModalProps) => {
  const getStatusColor = (value: number) => {
    if (value >= 90) return "bg-green-500";
    if (value >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="bg-white max-w-3xl w-full max-h-[80vh] overflow-y-auto">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-bold">
            {pen.name} - Livestock ({pen.animals.length}/{pen.capacity})
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {pen.animals.map((animal) => (
            <Card
              key={animal.id}
              className="overflow-hidden border border-gray-200"
            >
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-1/3 bg-gray-100 flex items-center justify-center p-4">
                  <img
                    src={animal.imageUrl}
                    alt={animal.name}
                    className="h-24 w-24 object-contain"
                  />
                </div>
                <CardContent className="w-full md:w-2/3 p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-lg">{animal.name}</h3>
                    <Badge variant="outline" className="capitalize">
                      {animal.type}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Health:</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStatusColor(animal.health)}`}
                          style={{ width: `${animal.health}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {animal.health}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Happiness:</span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStatusColor(animal.happiness)}`}
                          style={{ width: `${animal.happiness}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {animal.happiness}%
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">
                        Productivity:
                      </span>
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${getStatusColor(animal.productivity)}`}
                          style={{ width: `${animal.productivity}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {animal.productivity}%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AnimalModal;
