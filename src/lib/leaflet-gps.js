(function (factory) {
    if(typeof define === 'function' && define.amd) {
    
        define(['leaflet'], factory);
    } else if(typeof module !== 'undefined') {
    
        module.exports = factory(require('leaflet'));
    } else {
    
        if(typeof window.L === 'undefined')
            throw 'Leaflet must be loaded first';
        factory(window.L);
    }
})(function (L) {

L.Control.Gps = L.Control.extend({

	includes: L.version[0] =='1' ? L.Evented.prototype : L.Mixin.Events,
	
	options: {
		autoActive: false,		//activate control at startup
		autoCenter: true,		//move map when gps location change
		autoFollow: true, 		//move map continuously
		maxZoom: null,			//max zoom for autoCenter
		textErr: '',			//error message on alert notification
		callErr: null,			//function that run on gps error activating
		title: 'Konumunuzu bulun.',
		marker: null,			//L.Marker used for location, default use a L.CircleMarker
		style: {				//default L.CircleMarker styles
			radius: 5,
			weight: 2,
			color: '#c20',
			opacity: 1,
			fillColor: '#f23',
			fillOpacity: 1
		},
		//accuracy: true,		//show accuracy Circle
		position: 'topright',
		transform: function(latlng) { return latlng },
		
	},

	initialize: function(options) {
		if(options && options.style)
			options.style = L.Util.extend({}, this.options.style, options.style);
		L.Util.setOptions(this, options);
		this._errorFunc = this.options.callErr || this.showAlert;
		this._isActive = false;
		this._isLoading = false;
		this._currentLocation = null;	//store last location
	},

	onAdd: function (map) {

		this._map = map;

		var container = L.DomUtil.create('div', 'leaflet-control-gps');

		this._button = L.DomUtil.create('a', 'gps-button', container);
		this._button.href = '#';
		this._button.title = this.options.title;

		L.DomEvent
			.on(this._button, 'dblclick', L.DomEvent.stop, this)
			.on(this._button, 'click', L.DomEvent.stop, this)
			.on(this._button, 'click', this._switchGps, this);

		this._alert = L.DomUtil.create('div', 'gps-alert', container);
		this._alert.style.display = 'none';

		this._gpsMarker = this.options.marker ? this.options.marker : new L.CircleMarker([0,0], this.options.style);

		if(this.options.autoFollow) {
			this._map.on('locationfound', this._drawGps, this);
		}
		else {
			this._map.once('locationfound', this._drawGps, this);
		}

		this._map.on('locationerror', this._errorGps, this);

		if(this.options.autoActive)
			this.activate();

		return container;
	},

	onRemove: function(map) {
		this.deactivate();

		map.off('locationfound', this._drawGps, this)
		   .off('locationerror', this._errorGps, this);
	},

	_switchGps: function() {
		if(this._isActive || this._isLoading)
			this.deactivate();
		else
			this.activate();
	},

	getLocation: function() {	//get last location
		return this._currentLocation;
	},

	activate: function() {

		this._isActive = true;
		this._isLoading = true;
		this._map.addLayer( this._gpsMarker );

		L.DomUtil.addClass(this._button, 'loading');

		this._map.once('locationfound', function(e) {

			L.DomUtil.removeClass(this._button, 'loading');
			L.DomUtil.removeClass(this._button, 'disabled');
			L.DomUtil.addClass(this._button, 'active');

			this._isLoading = false;

			if(this.options.autoCenter)
				this._map.setView(e.latlng, this.options.maxZoom || this._map.getZoom());

		}, this);

		this._map.locate({
			enableHighAccuracy: false,
			watch: true,
			setView: false,
		});
	},

	deactivate: function() {

		this._isActive = false;
		this._isLoading = false;

		L.DomUtil.removeClass(this._button, 'active');
		L.DomUtil.removeClass(this._button, 'loading');

		if(this._map) {
			this._map.stopLocate();
			this._map.removeLayer( this._gpsMarker );
		}

		this.fire('gps:disabled', {marker: this._gpsMarker});
	},

	_drawGps: function(e) {

		var self = this;

		//TODO use e.accuracy for gps circle radius/color
		this._currentLocation = this.options.transform(e.latlng);

		this._gpsMarker.setLatLng(this._currentLocation);

		if(this.options.autoFollow) {
			this._map.on('locationfound', this._drawGps, this);
		}
		else {
			this._map.once('locationfound', this._drawGps, this);
		}

		this._map.on('locationerror', this._errorGps, this);

		if(this.options.autoActive)
			this.activate();
  		this._gpsMarker.accuracyCircle.setRadius((e.accuracy / 2).toFixed(0));
	},

	_errorGps: function(e) {
		this.fire('gps:error', e);

		this.deactivate();

		L.DomUtil.addClass(this._button, 'disabled');

		this._errorFunc.call(this, this.options.textErr || e.message);
	},

	showAlert: function(text) {
		this._alert.style.display = 'block';
		this._alert.innerHTML = text;
		var that = this;
		clearTimeout(this.timerAlert);
		this.timerAlert = setTimeout(function() {
			that._alert.style.display = 'none';
		}, 5000);
	}
});

L.Map.addInitHook(function () {
	if (this.options.gpsControl) {
		this.gpsControl = L.control.gps(this.options.gpsControl);
		this.addControl(this.gpsControl);
	}
});

L.control.gps = function (options) {
	return new L.Control.Gps(options);
};

	return L.Control.Gps;
});

