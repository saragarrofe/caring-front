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
        className="btn btn-success w-100 mb-4"
        onClick={() => setShowForm(true)}
      >
        💧 Water now
      </button>
    );
  }

  return (
    <div className="water-form mb-4">
      <input
        type="text"
        className="form-control mb-2"
        placeholder="Optional note (e.g. added fertilizer)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />
      <div className="d-flex gap-2">
        <button className="btn btn-success flex-grow-1" onClick={handleConfirm}>
          Confirm watering
        </button>
        <button className="btn btn-outline-secondary" onClick={handleCancel}>
          Cancel
        </button>
      </div>
    </div>
  );
}
