"use client";

import * as React from "react";
import { X, Plus, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

interface MultipleInputProps {
  children: (props: {
    value: string;
    onChange: (value: string) => void;
    onRemove: () => void;
    index: number;
  }) => React.ReactNode;
  defaultValues?: string[];
  value?: string[];
  onChange?: (values: string[]) => void;
  max?: number;
  min?: number;
  className?: string;
  addButtonText?: string;
  addButtonIcon?: React.ReactNode;
  collapsible?: boolean;
  itemLabel?: string;
}

function MultipleInput({
  children,
  defaultValues = [],
  value: controlledValue,
  onChange: controlledOnChange,
  max,
  min = 0,
  className,
  addButtonText = "Add",
  addButtonIcon,
  collapsible = false,
  itemLabel = "Item",
}: MultipleInputProps) {
  const [internalValues, setInternalValues] =
    React.useState<string[]>(defaultValues);
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);
  const isTransitioning = React.useRef(false);

  const isControlled = controlledValue !== undefined;
  const values = isControlled ? controlledValue : internalValues;

  const updateValues = React.useCallback(
    (newValues: string[]) => {
      if (!isControlled) {
        setInternalValues(newValues);
      }
      controlledOnChange?.(newValues);
    },
    [isControlled, controlledOnChange]
  );

  const handleAdd = React.useCallback(() => {
    if (max && values.length >= max) return;
    updateValues([...values, ""]);
    setOpenIndex(values.length);
  }, [values, max, updateValues]);

  const handleRemove = React.useCallback(
    (index: number) => {
      if (values.length <= min) return;
      const newValues = values.filter((_, i) => i !== index);
      updateValues(newValues);
      if (openIndex === index) {
        setOpenIndex(index > 0 ? index - 1 : 0);
      } else if (openIndex !== null && openIndex > index) {
        setOpenIndex(openIndex - 1);
      }
    },
    [values, min, updateValues, openIndex]
  );

  const handleChange = React.useCallback(
    (index: number, newValue: string) => {
      const newValues = [...values];
      newValues[index] = newValue;
      updateValues(newValues);
    },
    [values, updateValues]
  );

  const canAdd = !max || values.length < max;
  const canRemove = values.length > min;

  const renderItem = (value: string, index: number) => {
    if (collapsible) {
      return (
        <Collapsible
          key={index}
          open={openIndex === index}
          onOpenChange={(isOpen) => {
            if (!isOpen) {
              // Closing - do it immediately
              setOpenIndex(null);
            } else if (!isTransitioning.current) {
              // Opening - close current first, then open new one
              isTransitioning.current = true;
              setOpenIndex(null);
              setTimeout(() => {
                setOpenIndex(index);
                isTransitioning.current = false;
              }, 100);
            }
          }}
          className="rounded-lg border transition-all duration-200"
        >
          <div className="flex items-start gap-2 p-3">
            <CollapsibleTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 group"
              >
                <ChevronDown className="h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
              </Button>
            </CollapsibleTrigger>
            <div className="flex-1">
              <span className="text-sm font-medium">
                {itemLabel} {index + 1}
                {value && (
                  <span className="text-muted-foreground">: {value}</span>
                )}
              </span>
            </div>
            {canRemove && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => handleRemove(index)}
                aria-label={`Remove item ${index + 1}`}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
          <CollapsibleContent className="px-3 pb-3">
            {children({
              value,
              onChange: (newValue) => handleChange(index, newValue),
              onRemove: () => handleRemove(index),
              index,
            })}
          </CollapsibleContent>
        </Collapsible>
      );
    }

    return (
      <div key={index} className="flex items-start gap-2">
        <div className="flex-1">
          {children({
            value,
            onChange: (newValue) => handleChange(index, newValue),
            onRemove: () => handleRemove(index),
            index,
          })}
        </div>
        {canRemove && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => handleRemove(index)}
            className="shrink-0"
            aria-label={`Remove item ${index + 1}`}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className={cn("space-y-2", className)}>
      {values.map((value, index) => renderItem(value, index))}
      {canAdd && (
        <Button
          type="button"
          variant="outline"
          onClick={handleAdd}
          className="w-full"
        >
          {addButtonIcon || <Plus className="h-4 w-4" />}
          {addButtonText}
        </Button>
      )}
    </div>
  );
}

export { MultipleInput };
export type { MultipleInputProps };
