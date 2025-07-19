function askDelete(propertyId) {
  const username = prompt("Enter admin username to confirm deletion:");
  const password = prompt("Enter admin password:");

  if (!username || !password) {
    alert("Deletion cancelled.");
    return;
  }

  fetch(`https://houserental-t91k.onrender.com/delete-property/${propertyId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password })
  })
    .then(res => res.text())
    .then(msg => {
      alert(msg);
      location.reload(); // Reload the page after deletion
    })
    .catch(err => {
      console.error(err);
      alert("Error while deleting property.");
    });
}





let galleryImages = [];
let currentIndex = 0;

function openGallery(images) {
  galleryImages = images;
  currentIndex = 0;
  document.getElementById("galleryPopup").style.display = "flex";
  document.getElementById("galleryImg").src = galleryImages[currentIndex];
}

function closeGallery() {
  document.getElementById("galleryPopup").style.display = "none";
}

function nextImage() {
  currentIndex = (currentIndex + 1) % galleryImages.length;
  document.getElementById("galleryImg").src = galleryImages[currentIndex];
}


function prevImage() {
 currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
  document.getElementById("galleryImg").src = galleryImages[currentIndex];}
