run:
	npm run dev

test:
	npm run test

lint:
	npm run lint

extract:
	npm run extract && npm run compile

count:
	git ls-files '*.ts' '*.tsx' | grep -v '^src/components/ui/' | xargs wc -l