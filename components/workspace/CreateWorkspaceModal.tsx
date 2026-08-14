"use client";

import { useState } from "react";
import { X, Building2 } from "lucide-react";

interface CreateWorkspaceModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    description: string;
    owner: string;
  }) => void;
}

export default function CreateWorkspaceModal({
  open,
  onClose,
  onCreate,
}: CreateWorkspaceModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] =
    useState("");
  const [owner, setOwner] = useState("");

  if (!open) return null;

  function handleSubmit() {
    if (
      !name.trim() ||
      !description.trim() ||
      !owner.trim()
    ) {
      return;
    }

    onCreate({
      name,
      description,
      owner,
    });

    setName("");
    setDescription("");
    setOwner("");

    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        <div className="flex items-center justify-between border-b border-loop-border p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-sage-bg p-3">
              <Building2
                size={24}
                className="text-sage"
              />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-forest">
                Create Workspace
              </h2>

              <p className="text-sm text-taupe">
                Create a new workspace.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-cream-dark"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5 p-6">

          <div>
            <label className="mb-2 block font-medium text-forest-light">
              Workspace Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              placeholder="Project LOOP"
              className="w-full rounded-xl border border-loop-border px-4 py-3 outline-none focus:border-sage focus:ring-2 focus:ring-sage-bg"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-forest-light">
              Description
            </label>

            <textarea
              rows={3}
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Workspace description..."
              className="w-full rounded-xl border border-loop-border px-4 py-3 outline-none resize-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium text-forest-light">
              Owner
            </label>

            <input
              value={owner}
              onChange={(e) =>
                setOwner(e.target.value)
              }
              placeholder="Krishna Choudhary"
              className="w-full rounded-xl border border-loop-border px-4 py-3 outline-none focus:border-sage focus:ring-2 focus:ring-sage-bg"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 border-t border-loop-border p-6">
          <button
            onClick={onClose}
            className="rounded-xl border border-loop-border px-6 py-3 hover:bg-cream-dark"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="rounded-xl bg-forest text-champagne border border-forest-light px-6 py-3 font-medium text-white hover:bg-forest-light hover:text-white"
          >
            Create Workspace
          </button>
        </div>

      </div>
    </div>
  );
}