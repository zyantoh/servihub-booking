// src/components/ui/dialog.tsx
import * as React from 'react';
import {
    Dialog as RadixDialog,
    DialogContent as RadixDialogContent,
    DialogTitle as RadixDialogTitle,
  } from '@radix-ui/react-dialog';

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  return (
    <RadixDialog open={open} onOpenChange={onOpenChange}>
      {children}
    </RadixDialog>
  );
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
    return (
      <RadixDialogContent className={`rounded-md bg-card p-6 shadow-lg ${className}`}>
        {children}
      </RadixDialogContent>
    );
  }

export const DialogHeader = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 flex flex-col space-y-2 text-center sm:text-left">
    {children}
  </div>
);

export const DialogTitle = ({ children }: { children: React.ReactNode }) => (
    <RadixDialogTitle className="text-lg font-semibold">
      {children}
    </RadixDialogTitle>
  );