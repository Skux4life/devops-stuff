#!/bin/bash

# Get the current cpu, memory, and disk usage for system
cpu_usage=$(ps -A -o %cpu | awk '{s+=$1} END {print s "%"}')
mem_usage=$(ps -eo %mem | awk '{sum+=$1} END {print sum "%"}')
disk_usage=$(df -h / | awk 'NR==2 {total=substr($2, 1, length($2)-2); avail=substr($4, 1, length($4)-2); print (1 - avail / total) * 100 "%"}')

echo cpu usage: $cpu_usage
echo mem usage: $mem_usage
echo disk usage: $disk_usage

printf "%-10s %-10s %-10s\n" "CPU Usage" "Mem Usage" "Disk Usage" > stats.txt
printf "%-10s %-10s %-10s\n" "$cpu_usage" "$mem_usage" "$disk_usage" >> stats.txt
