"use client";

import * as React from "react";
import Button from "@mui/material/Button";
import Dialog, { DialogProps } from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { Check, Close } from "@/assets/img";
import Image from "next/image";
import Link from "next/link";
import { JobData } from "@/types/types";
import { getItemsWithCheck } from "@/functions/function";

interface MaxWidthDialogProps {
  open: boolean;
  onClose: () => void;
  job: JobData | null;
}

export default function MaxWidthDialog({
  open,
  onClose,
  job,
}: MaxWidthDialogProps) {
  return (
    <Dialog
      fullScreen
      fullWidth
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          borderRadius: "24px",
          width: "calc(100% - 28px)",
          height: "calc(100vh - 48px)",
          margin: "24px 14px",
        },
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "8px 24px",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        <h4 className="newmodal-header">{job?.title || "Job Details"}</h4>
        <DialogActions>
          <Button onClick={onClose}>
            <Image
              src={Close}
              alt="close"
              className="img-fluid"
              width={40}
              height={40}
            />
          </Button>
        </DialogActions>
      </div>
      <DialogContent>
        <div className="modal-body">
          <p
            dangerouslySetInnerHTML={{
              __html: job?.description || "No description available.",
            }}
          ></p>
          {job?.sub_description && (
            <div
              dangerouslySetInnerHTML={{
                __html: getItemsWithCheck(job?.sub_description || ""),
              }}
            ></div>
          )}

          <h6 className="text-center py-3 newmodal-h6">
            Join us in creating impactful web solutions! If you’re passionate
            about technology and ready for new challenges, please send your
            resume to{" "}
            <Link href="mailto:info@ilomatechnology.com" className="text-green">
              info@ilomatechnology.com
            </Link>
          </h6>
        </div>
      </DialogContent>
    </Dialog>
  );
}
