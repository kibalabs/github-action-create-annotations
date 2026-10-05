install:
	@ npm ci

install-updates:
	@ npm install

list-outdated: install
	@ npm outdated

lint-check:
	@ npx lint --directory ./src

lint-check-ci:
	@ npx lint --directory ./src --output-file lint-check-results.json --output-file-format annotations

lint-fix:
	@ npx lint --directory ./src --fix

type-check:
	@ npx type-check

type-check-ci:
	@ npx type-check --output-file type-check-results.json --output-file-format annotations

build:
	@ NODE_ENV=production npx build-module-rolldown --config-modifier ./build.config.js

clean:
	@ rm -rf ./node_modules ./package-lock.json

.PHONY: *
