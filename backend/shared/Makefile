build-SharedLayer:
	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
	cp nodejs/claude-client.mjs "$(ARTIFACTS_DIR)/nodejs/"
	cp nodejs/dynamo-client.mjs "$(ARTIFACTS_DIR)/nodejs/"
	cp nodejs/response.mjs "$(ARTIFACTS_DIR)/nodejs/"
	cp nodejs/package.json "$(ARTIFACTS_DIR)/nodejs/"
	cd "$(ARTIFACTS_DIR)/nodejs" && npm install --production
