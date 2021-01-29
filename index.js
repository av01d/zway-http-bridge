function HTTPBridge(id, controller) {
	HTTPBridge.super_.call(this, id, controller);
}

inherits(HTTPBridge, BaseModule);
_module = HTTPBridge;

HTTPBridge.prototype.init = function (config) {
	HTTPBridge.super_.prototype.init.call(this, config);

	var self = this;

	// What locations do we have?
	this.locations = {};
	var locations = this.controller.locations;
	if (locations) {
		for (var i = 0; i < locations.length; i++) {
			this.locations[locations[i].id] = locations[i].title;
		}
	}

	this.handler = function (vDev) {
		var id = vDev.get('id'),
			 fields = id.replace(/^ZWayVDev_zway_/, '').split('-');
		if (!fields[0] || !global.zway.devices[fields[0]]) {
			return;
		}

		var data = {
			device: +fields[0],
			instance: +fields[1],
			commandClass: +fields[2],
			title: vDev.get('metrics:title'),
			room: self.locations[vDev.get('location')] ? self.locations[vDev.get('location')] : null,
			vDevId: vDev.get('id'),
			name: vDev.get('name'),
			type: vDev.get('deviceType'),
			lastLevel: vDev.get('metrics:lastLevel'),
			level: vDev.get('metrics:level'),
			modificationTime: vDev.get('metrics:modificationTime')
		};

		http.request({
			url: config.url,
			method: 'PUT',
			async: true,
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify(data)
		});
	};

	this.controller.devices.on('modify:metrics:level', this.handler);
};

HTTPBridge.prototype.stop = function () {
	HTTPBridge.super_.prototype.stop.call(this);
	this.controller.devices.off('modify:metrics:level', this.handler);
};
