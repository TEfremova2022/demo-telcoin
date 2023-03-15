pipeline {
  agent {
    kubernetes {
      yaml '''
        apiVersion: v1
        kind: Pod
        metadata:
          labels:
            jenkins: jenkins-agent
        spec:
          serviceAccountName: jenkins-service-account
          containers:
          - name: jenkins-agent-container
            image: public.ecr.aws/m4u2t0n7/jenkins-agent:latest
            command:
            - cat
            tty: true
            env:
            - name: DOCKER_HOST
              value: 'tcp://localhost:2375'
          - name: dind-daemon
            image: 'docker:18-dind'
            command:
            - dockerd-entrypoint.sh
            tty: true
            securityContext: 
              privileged: true 
        '''
    }
  }
  stages {
    stage('Build and Deploy Backend') {
      steps {
        container('jenkins-agent-container') {
          sh '''#!/bin/bash
          pushd api/
          make build stage=dev
          make push stage=dev
          make deploy stage=dev
          popd
          '''
        }
      } 
    }   
    stage('Build and Deploy Frontend') { 
      steps {
        container('jenkins-agent-container') { 
          sh '''#!/bin/bash  
          pushd web/
          make build stage=dev
          make push stage=dev
          make deploy stage=dev
          popd
          '''
        }
      }
    }
  }
}