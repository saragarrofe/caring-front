import { useState } from 'react';


type WateringFormProps = {
  onWater: (note?: string) => void;
};

export function WateringForm({ onWater }: WateringFormProps) {
  const [showForm, setShowForm] = useState(false);
  const [note, setNote] = useState('');

  const handleConfirm = () => {
    onWater(note.trim() || undefined);
    setNote('');
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setNote('');
  };

  if (!showForm) {
    return (
      <button
        className="mb-6 w-full rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
        onClick={() => setShowForm(true)}
      >
        💧 Water now
      </button>
    );
  }

  return (
    <div className="water-form mb-6">
      <input
        type="text"
        className="mb-2 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        placeholder="Optional note (e.g. added fertilizer)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          className="flex-1 rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-opacity hover:opacity-90"
          onClick={handleConfirm}
        >
          Confirm watering
        </button>
        <button
          className="rounded-lg border border-border px-4 py-2 font-medium text-foreground transition-colors hover:bg-muted"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
