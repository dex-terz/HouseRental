fetch('/all-properties')
  .then(res => res.json())
  .then(properties => {
    renderProperties(properties);

    // 🔽 Auto-populate city dropdown
    const citySet = new Set(properties.map(p => p.city));
    const cityDropdown = document.getElementById('cityDropdown');
    citySet.forEach(city => {
      const option = document.createElement('option');
      option.value = city;
      option.textContent = city;
      cityDropdown.appendChild(option);
    });

    // 🔽 Auto-set Rent Max input to the highest rent
    const maxRent = Math.max(...properties.map(p => Number(p.rent)));
    document.querySelector('input[name="rentMax"]').placeholder = `₹ Max (${maxRent})`;
    document.querySelector('input[name="rentMax"]').value = maxRent;

    // 🔍 Handle filter submit
    document.getElementById('filterForm').addEventListener('submit', function (e) {
      e.preventDefault();
      const formData = new FormData(this);
      const filters = Object.fromEntries([...formData.entries()].map(([k, v]) => [k, v.trim()]));

      const filtered = properties.filter(p => {
        return (filters.city === '' || p.city === filters.city) &&
               (filters.rentMin === '' || Number(p.rent) >= Number(filters.rentMin)) &&
               (filters.rentMax === '' || Number(p.rent) <= Number(filters.rentMax)) &&
               (filters.hall === '' || Number(p.hall) === Number(filters.hall)) &&
               (filters.bedroom === '' || Number(p.bedroom) === Number(filters.bedroom)) &&
               (filters.kitchen === '' || Number(p.kitchen) === Number(filters.kitchen));
      });

      renderProperties(filtered);
    });

    // 🔄 Handle Reset
    document.getElementById('resetBtn').addEventListener('click', function () {
      document.getElementById('filterForm').reset();         // clear form
      document.querySelector('input[name="rentMax"]').value = maxRent; // reset Rent Max manually
      renderProperties(properties);                          // show all
    });
  });



function renderProperties(properties) {
  const list = document.getElementById('property-list');
  list.innerHTML = ''; // clear previous
  properties.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${(p.imageUrl[0]) || '/placeholder.jpg'}" onclick='openGallery(${JSON.stringify(p.imageUrl)})' />
      <p><strong>Location:</strong> ${p.location}</p>
    <p><strong>City:</strong> ${p.city}</p>

    <p><strong>Halls:</strong> ${p.hall}</p>
    <p><strong>Bedrooms:</strong> ${p.bedroom}</p>
    <p><strong>Kitchens:</strong> ${p.kitchen}</p>
    <p><strong>Furnishing:</strong> ${p.furnishing}</p>
    <p><strong>Rent:</strong> ₹${p.rent}</p>
    <p><strong>Advance:</strong> ₹${p.advance}</p>
    <p><strong>Owner Name:</strong> ${p.ownername}</p>
    <p><strong>Owner Phone:</strong> ${p.phone}</p>
    <button onclick="askDelete('${p._id}')">🗑 Delete</button>
    `;
    list.appendChild(card);
  });
}