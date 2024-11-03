#!/bin/bash

ansible-playbook -i /local/statusServices/ansible/inventory.txt /local/statusServices/ansible/remove-app-container.yaml;
sleep 10;
ansible-playbook -i /local/statusServices/ansible/inventory.txt /local/statusServices/ansible/remove-cleanup-local-image.yaml;
sleep 5;
ansible-playbook -i /local/statusServices/ansible/inventory.txt /local/statusServices/ansible/buildandpushimage.yaml;
sleep 5;
/usr/bin/ansible-playbook -i /local/statusServices/ansible/inventory.txt /local/statusServices/ansible/delete-k8s-apps.yaml --extra-vars "myhost=k8s myfile=/local/statusServices/kubernetes/server-deployment.yaml"
sleep 5;
/usr/bin/ansible-playbook -i /local/statusServices/ansible/inventory.txt /local/statusServices/ansible/apply-k8s-apps.yaml --extra-vars "myhost=k8s myfile=/local/statusServices/kubernetes/server-deployment.yaml"
