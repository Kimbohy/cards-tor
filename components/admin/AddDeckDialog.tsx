import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { MultipleInput } from "../ui/MultipleInput";

const keyFeaturesTypes = [
  "QUALITY",
  "DESIGN",
  "USABILITY",
  "DURABILITY",
  "UNIQUENESS",
  "PRODUCTION",
  "PRICE",
];

export default function AddDeckDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Add Deck
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Deck</DialogTitle>
          <DialogDescription>Create a new deck for sell</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Deck Name</Label>
            <Input id="name" placeholder="Bicycle 808" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="name" />
          </div>
          <Separator />
          <div className="space-y-2">
            <Label htmlFor="price">Price</Label>
            <ButtonGroup className="w-3/5">
              <Input
                type="number"
                min="0"
                className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0"
              />
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USD">USD</SelectItem>
                  <SelectItem value="MGA">MGA</SelectItem>
                </SelectContent>
              </Select>
            </ButtonGroup>
          </div>
          <Separator />
          <div className="space-y-4">
            <Label htmlFor="key-features">Key Features</Label>
            <MultipleInput
              min={0}
              max={10}
              addButtonText="Add Feature"
              collapsible
              itemLabel="Feature"
            >
              {({ value, onChange, index }) => (
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor={`feature-title-${index}`}>
                      Title <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id={`feature-title-${index}`}
                      placeholder="e.g., Premium Card Stock"
                      value={value}
                      onChange={(e) => onChange(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`feature-detail-${index}`}>
                      Detail (Optional)
                    </Label>
                    <Textarea
                      id={`feature-detail-${index}`}
                      placeholder="Additional details about this feature..."
                      rows={2}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor={`feature-type-${index}`}>Type</Label>
                    <Select defaultValue="QUALITY">
                      <SelectTrigger id={`feature-type-${index}`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {keyFeaturesTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </MultipleInput>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button>Create Deck</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
