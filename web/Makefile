account = $(shell aws sts get-caller-identity --query "Account" --output text)
repo = exchange/web
appname = exchange-web



stage = prod
include configs/$(stage)


build:
	docker build -t $(repo):$(version) .

login:
	aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin $(account).dkr.ecr.us-east-1.amazonaws.com

push: login
	docker tag $(repo):$(version) $(account).dkr.ecr.us-east-1.amazonaws.com/$(repo):$(version)
	docker push $(account).dkr.ecr.us-east-1.amazonaws.com/$(repo):$(version)

deploy:
	helm upgrade --install $(appname) k8s-chart/ --namespace=$(namespace) --create-namespace \
		--set applicationName=$(appname) \
		--set replicaCount=$(replicas) \
		--set image.repository=$(account).dkr.ecr.us-east-1.amazonaws.com/$(repo) \
		--set image.tag=$(version) \
		--set port=80 \
		--set hostname=$(hostname)

delete:
	helm uninstall $(appname) --namespace=$(namespace)	


		
		


