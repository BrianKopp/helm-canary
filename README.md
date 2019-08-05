# Helm Canary

This repository outlines how to do a canary deployment using helm.

## Building

```bash
docker build . -t briankopp/helm-canary:0.0.1
docker push -t briankopp/helm-canary:0.0.1
```

## Set Up Minikube

```bash
# To start with a fresh minikube instance...
minikube delete

minikube start
minikube addons enable ingress
helm init --wait
helm upgrade -i canary \
    -f examples/01-initial-deployment.yaml \
    charts/helm-canary
```

## Perform Canary Deployment

```bash
helm upgrade -i canary \
    -f examples/02-canary-creation.yaml \
    charts/helm-canary
```
