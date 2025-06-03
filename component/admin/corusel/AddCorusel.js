"use client";

import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { uploadImage } from "@/utils/image";
import { addCorusel } from "@/redux/action/corusel";
import { useDispatch } from "react-redux";

export default function AddCorusel({ isOpen, onOpenChange, setRefresh, refresh }) {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", imageUrl: null, periority: "1" });
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [imageUpload, setImageUpload] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageUpload(true);
      setPreview(URL.createObjectURL(file));
      const result = await uploadImage(file);

      if (result.success) {
        console.log("Image uploaded to:", result.data.url);
        setData(prev => ({ ...prev, imageUrl: result.data.url }));
        setImageUpload(false);
      } else {
        console.error("Upload failed:", result.error);
        setImageUpload(false);
      }

    }
  };

  const handleSubmit = async () => {
    const newErrors = {};
    if (!data.name.trim()) newErrors.name = "Title is required";
    if (!data.imageUrl) newErrors.imageUrl = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const res = await dispatch(addCorusel(data));
    setRefresh(!refresh);

  };

  const clearFields = () => {
    setData({ name: "", imageUrl: null });
    setErrors({});
    setPreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-0 right-0 h-full w-[40vw] max-w-[70vw] bg-white shadow-lg p-6 flex flex-col">
          <div className="flex items-center justify-between mb-6 relative">
            <Dialog.Title className="text-lg font-semibold">Add Corusel</Dialog.Title>
            <Dialog.Close asChild>
              <button
                onClick={clearFields}
                aria-label="Close"
                className="p-1 rounded-full hover:bg-gray-200 absolute right-0 top-0"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </Dialog.Close>
          </div>

          <form
            className="flex-1 space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <label className="block mb-1 font-medium">
              Title <span className="text-red-500">*</span>
            </label>

            <Input
              label={
                <span>
                  Title <span className="text-red-500">*</span>
                </span>
              }
              name="name"
              placeholder="Enter name"
              value={data.name}
              onChange={handleChange}
              variant="bordered"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

            <div>
              <label className="block mb-1 font-medium">
                Priority <span className="text-red-500">*</span>
              </label>
              <select
                name="priority"
                value={data.periority}
                onChange={handleChange}
                className="block w-full px-3 py-2 border rounded-md text-sm"
              >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium">
                Image <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-white hover:file:bg-primary/80"
              />
              {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
              {imageUpload ? <p className="font-bold p-2">Loading please wait...</p> : <>{preview && (
                <img src={preview} alt="Preview" className="mt-3 max-h-40 rounded shadow" />
              )}</>}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={clearFields}>
                Cancel
              </Button>
              <Button type="submit" className="bg-primary text-white">
                Submit
              </Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
