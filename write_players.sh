#!/bin/bash

echo "[" > players.json

i=0;
while read line; do

	echo "{\"id\": \"$i\"," >> players.json
	echo "\"name\": \"$line\"}," >> players.json
	i=$((i+1))

done < hackathon_members.txt

echo "]" >> players.json
