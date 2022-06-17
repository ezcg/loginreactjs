#!/bin/bash

touch ~/.bashrc
echo "alias ll='ls -ltra'" >> ~/.bashrc
. ~/.bashrc
touch ~/.vimrc
echo "set number" >> ~/.vimrc
echo "set background=dark" >> ~/.vimrc

#printf "\nWaiting for DB to initilize before building login db...\n"
#count=0
#while [ 1 ]; do
#	#x=$(mysqladmin -uroot -proot ping --silent | grep -v "mysqladmin:" | grep "mysqld is alive")
#	x=$(mysql -uroot -proot -e "SELECT 1")
# 	if [[ -z "$x" ]];then
#		printf "\nempty: $x\n"
#		printf "\nSleeping 1"
#  	sleep 1
#		count=$(($count + 1))
#		printf "\ncount $count"
#		if [[ $count -gt 10 ]];then
#			break
#		fi
#	else
#		printf "\nnot empty: $x\n"
#		mysql -uroot -proot < /mysql/structure.sql
#		printf "\nImported\n"
#		break;
#	fi
#done
#printf "\nChecking container health...\n"
#while [ $(docker inspect --format "{{json .State.Health.Status }}" <container-name>) != "\"healthy\"" ]; do printf "."; sleep 1; done
printf "\nImporting...\n"
mysql -uroot -proot < /mysql/structure.sql
#mysql -uroot -proot < data.sql
printf "\nDone.\n\n"

