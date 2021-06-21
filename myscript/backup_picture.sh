#!/bin/bash
#sudo -S <<< "nikhom" command
#sudo /home/nikhom/Documents/Homework4/vrp25-docker-app/bash_crontap/password
#echo "nikhom" | sudo -S lsof -i:27017 >> /home/nikhom/Documents/Homework4/vrp25-docker-app/bash_crontap/c.txt 
#echo "$(date) = date" >> /home/nikhom/Documents/Homework4/vrp25-docker-app/bash_crontap/c.txt
#echo "nikhom" | sudo tar -cpzf /media/nikhom/My Passport/vrp25/backup/$(date +%F).tar.gz ~/Documents/vrp25/mongo/mydb
#echo "nikhom" | sudo cp ~/Documents/vrp25/server1/upload/job/

#sudo tar -cpzf /media/nikhom/My Passport/vrp25/backup/$(date +%m)-$(date +%d)-$(date +%Y).tar.gz ~/Documents/vrp25/mongo/mydb 

#mdyDate=$(date +%m)_$(date +%d)_$(date +%Y)

echo "nikhom" | sudo cp -r /home/nikhom/Documents/vrp25/server1/upload/customer/$(date +%m)_$(date +%d)_$(date +%Y) /media/nikhom/VRPUSB/vrp25/upload/customer

#echo "nikhom" | sudo cp -r /home/nikhom/Documents/vrp25/server1/upload/product/$(date +%m)_$(date +%d)_$(date +%Y) /media/nikhom/UUI/vrp25/upload/product

echo "nikhom" | sudo cp -r /home/nikhom/Documents/vrp25/server1/upload/job/$(date +%m)_$(date +%d)_$(date +%Y) /media/nikhom/VRPUSB/vrp25/upload/job
