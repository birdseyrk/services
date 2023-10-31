#!/bin/bash

/usr/bin/ansible-playbook -i /local/ansible/tests/webcalls/inventory.txt /local/ansible/tests/webcalls/postHostStatus.yml
