.PHONY: setup
.PHONY: ci cd

PROJECT_NAME:=bcrs-shared-components-web
DOCKER_NAME:=bcrs-shared-components-web

#################################################################################
# COMMANDS -- Setup
# expects the terminal to be openshift login
# expects export OPENSHIFT_REPOSITORY=""
#################################################################################
setup: ## Clean and Install npm dependencies
	npm ci

#################################################################################
# COMMANDS - CI                                                                 #
#################################################################################
ci: lint test

lint:  ## Run linting ofcode.
	npm run lint:nofix

test:  ## Unit testing
	npm run test:unit

storybook:
	npm run storybook:build
#################################################################################
# Self Documenting Commands                                                     #
#################################################################################
.PHONY: help

.DEFAULT_GOAL := help

help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'
