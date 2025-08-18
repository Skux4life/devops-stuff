#!/bin/bash

# Check if a directory argument is provided
if [ -z "$1" ]; then
  echo "Please provide a directory as an argument."
  exit 1
fi

# Check if the provided directory exists and is a valid directory
if [ ! -d "$1" ]; then
  echo "Error: The provided directory does not exist or is not a valid directory"
  exit 1
fi

# This line will show the 10 largest files searching from the directory provided.
find "$1" -type f -exec du -h {} \; | sort -hr | head -10
