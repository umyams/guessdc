count=0
max_count=10
while [ $count -lt $max_count ]; do
    echo "Current count: $count"
    node . drc-20 mint DBqXy5es6jneH8cZGHjXsMXX7cRDMh5AYu pigp 1500000000
    remaining=$((max_count - count))
    echo "Counts left: $remaining"
    sleep 200  # Sleep for 3,5 minutes
    ((count++))
    pause
done