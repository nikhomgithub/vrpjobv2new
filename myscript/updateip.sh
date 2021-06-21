#!/bin/bash
#sudo -S <<< "nikhom" command
#sudo /home/nikhom/Documents/Homework4/vrp25-docker-app/bash_crontap/password
#echo "nikhom" | sudo -S lsof -i:27017 >> /home/nikhom/Documents/Homework4/vrp25-docker-app/bash_crontap/c.txt 
#echo "$(date) = date" >> /home/nikhom/Documents/Homework4/vrp25-docker-app/bash_crontap/c.txt
#echo "nikhom" | sudo tar -cpzf #sudo tar -cpzf ~/Documents/Homework4/vrp25-docker-app/mongo/$(date +%m)-$(date +%d)-$(date +%Y).tar.gz ~/Documents/Homework4/vrp25-docker-app/mongo/vrp25/backup/$(date +%F).tar.gz ~/Documents/vrp25/mongo/mydb
#sudo tar -cpzf ~/Documents/Homework4/vrp25-docker-app/mongo/$(date +%m)-$(date +%d)-$(date +%Y).tar.gz ~/Documents/Homework4/vrp25-docker-app/mongo
#sudo tar -cpzf ~/Documents/Homework4/vrp25-docker-app/mongo/$(date +%m)-$(date +%d)-$(date +%Y).tar.gz ~/Documents/Homework4/vrp25-docker-app/mongo

#echo "nikhom" | sudo tar -cpzf /media/nikhom/VRPUSB/vrp25/backup/$(date +%m)_$(date +%d)_$(date +%Y).tar.gz /home/nikhom/Documents/vrp25/mongo/mydb

var1=$(dig +short myip.opendns.com @resolver1.opendns.com)
curl http://localhost:3001 -d $var



