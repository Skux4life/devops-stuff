#!/bin/bash

# Find and kill all zombie processes
# Explanation
# ps -eo pid,stat runs the ps command to list all processes, showing only the process ID (pid) and status (stat) columns.
# awk '$2 == "Z" {print $1}' uses awk to filter the output and print only the process IDs of zombie processes (those with a status of "Z").
# The for loop iterates over the zombie process IDs and kills each one using kill -9.

for pid in $(ps -eo pid,stat | awk '$2 == "Z" {print $1}'); do
  echo "Killing zombie process $pid"
  kill -9 $pid
done
