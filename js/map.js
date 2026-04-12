/* ============================================================
   map.js  –  Leaflet interactive map for the homepage
   Underground Railroad east‑coast route with three clickable
   markers: (1) Virginia, (2) Middletown CT, (3) Ontario Canada
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  const popupStyles = document.createElement('style');
  popupStyles.textContent = `
    .route-popup {
      font-family: Georgia, serif;
      max-width: 210px;
    }

    .route-popup__title {
      font-size: 1rem;
    }

    .route-popup__title--brown {
      color: #3b1f0a;
    }

    .route-popup__body {
      margin: 0.4rem 0 0.6rem;
      font-size: 0.88rem;
      color: #4a3010;
    }

    .route-popup__link {
      display: inline-block;
      color: #f5ead8;
      padding: 0.3rem 0.8rem;
      border-radius: 3px;
      text-decoration: none;
      font-size: 0.83rem;
    }

    .route-popup__link--brown {
      background: #3b1f0a;
    }
  `;
  document.head.appendChild(popupStyles);

  /* ---------- Initialise map centred on the east coast ---------- */
  const map = L.map('map', {
    center: [42.0, -76.5],
    zoom: 5,
    scrollWheelZoom: false
  });

  /* OpenStreetMap base tiles */
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  /* ---------- Route waypoints (south → north) ---------- */
  const routePoints = [
    { id: 'south',  label: 'Richmond, VA',                  lat: 37.5407, lng: -77.4360 }, // start point in the South
    { label: 'Washington D.C.',                             lat: 38.9072, lng: -77.0369 },
    { label: 'Baltimore, MD',                               lat: 39.2904, lng: -76.6122 },
    { label: 'Wilmington, DE',                              lat: 39.7447, lng: -75.5484 },
    { label: 'Philadelphia, PA',                            lat: 39.9526, lng: -75.1652 },
    { label: 'New York City',                               lat: 40.7128, lng: -74.0060 },
    { label: 'Greenwich / Stamford, CT',                    lat: 41.0534, lng: -73.5387 },
    { id: 'middle', label: 'Middletown, CT',                lat: 41.5623, lng: -72.6506 }, // ★
    { label: 'Hartford, CT',                                lat: 41.7658, lng: -72.6851 },
    { label: 'Springfield, MA',                             lat: 42.1015, lng: -72.5898 },
    { label: 'Syracuse, NY',                                lat: 42.9634, lng: -76.0120 }, // Western route variant
    { id: 'canada', label: 'Hamilton, Ontario, Canada',     lat: 43.4643, lng: -79.6868 }  // end point
  ];

  const routeCoords = routePoints.map(function (point) {
    return [point.lat, point.lng];
  });

  /* Draw the route as a dashed polyline */
  L.polyline(routeCoords, {
    color: '#b8860b',
    weight: 3,
    opacity: 0.85,
    dashArray: '10, 8'
  }).addTo(map);

  /* ---------- Custom marker icons ---------- */
  function makeIcon(color) {
    return L.divIcon({
      className: '',
      html: `<div style="
        width:26px; height:26px;
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

  const iconSouth     = makeIcon('#c0392b');   // red
  const iconMiddle    = makeIcon('#b8860b');   // gold
  const iconCanada    = makeIcon('#2e7d32');   // green

  /* ---------- Marker: Southern Origins (Richmond, VA) ---------- */
  L.marker([37.5407, -77.4360], { icon: iconSouth })
    .addTo(map)
    .bindPopup(`
      <div class="route-popup">
        <strong class="route-popup__title route-popup__title--brown">🔴 The South: Origins of Resistance</strong>
        <p class="route-popup__body">
          Enslaved people throughout the Upper South risked everything for freedom,
          forming the first links in a secret network stretching to Canada.
        </p>
        <a href="south.html" class="route-popup__link route-popup__link--brown">
          Explore ›
        </a>
      </div>
    `, { maxWidth: 240 });

  /* ---------- Marker: Middletown, CT ---------- */
  L.marker([41.5623, -72.6506], { icon: iconMiddle })
    .addTo(map)
    .bindPopup(`
      <div class="route-popup">
        <strong class="route-popup__title route-popup__title--brown">⭐ Middletown, CT — The Way Station</strong>
        <p class="route-popup__body">
          A vital stop on the Underground Railroad. Explore how Middletown's
          Black churches, families, and abolitionists sheltered and guided
          freedom seekers northward.
        </p>
        <a href="middletown.html" class="route-popup__link route-popup__link--brown">
          Explore ›
        </a>
      </div>
    `, { maxWidth: 240 });

  /* ---------- Marker: Ontario, Canada ---------- */
  L.marker([43.4643, -79.6868], { icon: iconCanada })
    .addTo(map)
    .bindPopup(`
      <div style="font-family:Georgia,serif; max-width:210px;">
        <strong style="color:#3b1f0a; font-size:1rem;">🟢 Ontario, Canada — Freedom</strong>
        <p style="margin:0.4rem 0 0.6rem; font-size:0.88rem; color:#4a3010;">
          Beyond the reach of the Fugitive Slave Act, freedom seekers built
          new lives and thriving Black communities in Canada West.
        </p>
        <a href="canada.html"
           style="display:inline-block; background:#3b1f0a; color:#f5ead8;
                  padding:0.3rem 0.8rem; border-radius:3px; text-decoration:none;
                  font-size:0.83rem;">
          Explore ›
        </a>
      </div>
    `, { maxWidth: 240 });

  /* ---------- Legend ---------- */
  const legend = L.control({ position: 'bottomright' });
  legend.onAdd = function () {
    const div = L.DomUtil.create('div', '');
    div.innerHTML = `
      <div style="
        background:#fffdf7; border:2px solid #6b3a1f;
        padding:10px 14px; font-family:Georgia,serif;
        font-size:0.82rem; color:#3b1f0a; border-radius:4px;
        box-shadow:0 2px 8px rgba(59,31,10,0.25);
        line-height:1.7;
      ">
        <strong style="display:block; margin-bottom:6px; color:#b8860b;">Map Legend</strong>
        <span style="color:#c0392b;">●</span> Southern Origins<br>
        <span style="color:#b8860b;">●</span> Middletown, CT<br>
        <span style="color:#2e7d32;">●</span> Canada — Freedom<br>
        <span style="color:#b8860b;">— —</span> Railroad Route
      </div>`;
    return div;
  };
  legend.addTo(map);

});
