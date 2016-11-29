while true;do
 echo -n "example-1:1|c" | nc -w 1 -u hopsoft 8125;
 echo -n "example-2:2|c" | nc -w 1 -u hopsoft 8125;
done;
