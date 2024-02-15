install:
	npm ci

publish:
	npm publish --dry-run

lint:
	npx eslint .

page-loader:
	node bin/page-loader.js

test:
	npm test

test-coverage:
	npx jest --coverage --coverageProvider=v8