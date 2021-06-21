#!/bin/bash
#sudo -S <<< "nikhom" command
#sudo /home/nikhom/Documents/Homework4/vrp25-docker-app/bash_crontap/password
#echo "nikhom" | sudo -S lsof -i:27017 >> /home/nikhom/Documents/Homework4/vrp25-docker-app/bash_crontap/c.txt 
#echo "$(date) = date" >> /home/nikhom/Documents/Homework4/vrp25-docker-app/bash_crontap/c.txt

#echo "nikhom" || sudo rtcwake -s 46800 -m mem
#sleep at 19:00 , awake at 07:00 everyday
echo "nikhom" | sudo rtcwake -s 43200 -m mem
