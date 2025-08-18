#!/bin/bash

# Specify the disk device or mount point
DEVICE=/dev/sdb1

# Unmount the disk
umount $DEVICE

# Check if the disk is still mounted
if mountpoint -q $DEVICE; then
  echo "Error: Disk is still mounted"
  exit 1
fi

echo "Disk unmounted successfully"
