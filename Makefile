CWD := $(shell pwd)
NODEUNIT = $(CWD)/node_modules/.bin/nodeunit
BROWSERIFY = $(CWD)/node_modules/.bin/browserify

all: clean test

test:
	mkdir -p test/built
	cp node_modules/nodeunit/examples/browser/nodeunit.js test/built/nodeunit.js
	cp node_modules/nodeunit/share/nodeunit.css test/built/nodeunit.css
	$(BROWSERIFY) test/test.js > test/built/test.js
	open test/test.html

example: 
	mkdir -p example/built
	$(BROWSERIFY) example/simple.js > example/built/simple.js
	open example/simple.html

clean:
	rm -rf test/built
	rm -rf example/built

.PHONY: test example