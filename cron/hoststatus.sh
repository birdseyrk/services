#!/bin/bash

/usr/bin/ansible-playbook -i /local/docker/statusServices/cron/inventory.txt /local/docker/statusServices/cron/postHostStatus.yml
