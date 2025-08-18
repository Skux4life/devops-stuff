#!/bin/bash

# Specify the disk device or mount point
DEVICE=/dev/sdb1
MOUNT_POINT=/mnt/my_disk

# Unmount the disk
umount $MOUNT_POINT

# Check if the disk is still mounted
if mountpoint -q $MOUNT_POINT; then
  echo "Error: Disk is still mounted"
  exit 1
fi

echo "Disk unmounted successfully"
