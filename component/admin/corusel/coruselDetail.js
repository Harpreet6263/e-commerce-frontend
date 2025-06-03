"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { getCoruselById } from "@/redux/action/corusel"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"

export function ViewCoruselDialog({ open, onOpenChange, coruselId }) {
  const dispatch = useDispatch()
  const [corusel, setCorusel] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      if (coruselId) {
        const res = await dispatch(getCoruselById(coruselId))
        if (res?.payload?.success) {
            console.log("Corusel details:", res.payload.data?.result)
          setCorusel(res.payload.data?.result)
        } else {
          console.error("Failed to fetch corusel details:", res?.payload?.message)
        }
      }
    }

    if (open) {
      fetchData()
    }
    
  }, [coruselId, open, dispatch])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Corusel Details</DialogTitle>
        
        </DialogHeader>

        <div className="grid gap-4 py-4 text-sm">
          <div className="grid gap-1">
            <Label className="text-muted-foreground">Title</Label>
            <div>{corusel?.name || "—"}</div>
          </div>

          <div className="grid gap-1">
            <Label className="text-muted-foreground">Priority</Label>
            <div>{corusel?.periority}</div>
          </div>

          <div className="grid gap-1">
            <Label className="text-muted-foreground">Status</Label>
            <div>{corusel?.status === 1 ? "Active" : "Inactive"}</div>
          </div>

          <div className="grid gap-1">
            <Label className="text-muted-foreground">Image</Label>
            {corusel?.image ? (
              <Image
                src={corusel.image}
                alt="Corusel"
                width={500}
                height={500}
                className="mt-2 rounded max-h-48 object-contain border"
              />
            ) : (
              <div>No image</div>
            )}
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
