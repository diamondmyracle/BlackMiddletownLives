document.addEventListener('DOMContentLoaded', function () {

  const map = L.map('map', {
    crs: L.CRS.Simple,
    minZoom: -1,
    maxZoom: 2,
    zoomSnap: 0.25,
    scrollWheelZoom: false
  });

  const imageWidth = 736;
  const imageHeight = 981;
  const bounds = [[0, 0], [imageHeight, imageWidth]];

  const imageUrl = 'images/better-blank.jpg';
  console.log('Loading image:', imageUrl);

  L.imageOverlay(imageUrl, bounds).addTo(map);

  map.fitBounds(bounds);
  map.setMaxBounds(bounds);

  setTimeout(() => {
    map.invalidateSize();
  }, 100);

  function makeIcon(color) {
    return L.divIcon({
      className: '',
      html: `<div style="
        width:26px;
        height:26px;
        background:${color};
        border:3px solid #3b1f0a;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 2px 6px rgba(0,0,0,0.45);
      "></div>`,
      iconSize: [26, 26],
      iconAnchor: [13, 26],
      popupAnchor: [0, -28]
    });
  }

  function imgPoint(x, y) {
    return [imageHeight - y, x];
  }

  const iconSouth = makeIcon('#c0392b');
  const iconMiddle = makeIcon('#b8860b');
  const iconCanada = makeIcon('#2e7d32');

  const southPoint = imgPoint(300, 675);
  const ctPoint = imgPoint(620, 250);
  const canadaPoint = imgPoint(470, 150);

  const southMarker = L.marker(southPoint, { icon: iconSouth })
  .addTo(map)
  .bindTooltip('Southern Origins');

const ctMarker = L.marker(ctPoint, { icon: iconMiddle })
  .addTo(map)
  .bindTooltip('Middletown, CT');

const canadaMarker = L.marker(canadaPoint, { icon: iconCanada })
  .addTo(map)
  .bindTooltip('Freedom in Canada');

southMarker.on('click', function () {
  window.location.href = 'south.html';
});

ctMarker.on('click', function () {
  window.location.href = 'middletown.html';
});

canadaMarker.on('click', function () {
  window.location.href = 'canada.html';
});

  southMarker.on('click', function () {
    window.location.href = 'south.html';
  });

  ctMarker.on('click', function () {
    window.location.href = 'middletown.html';
  });

  canadaMarker.on('click', function () {
    window.location.href = 'canada.html';
  });

  const routeCoords = [
    southPoint,
    imgPoint(360, 600),
    imgPoint(455, 470),
    ctPoint,
    imgPoint(560, 220),
    canadaPoint
  ];

  L.polyline(routeCoords, {
    color: '#b8860b',
    weight: 3,
    opacity: 0.85,
    dashArray: '10, 8'
  }).addTo(map);

  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', '');
    div.innerHTML = `<div>Legend</div>`;
    return div;
  };
  legend.addTo(map);

});
