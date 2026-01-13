// Hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navigation = document.querySelector('.navigacija1');
    
    // Toggle mobile menu
    hamburgerBtn.addEventListener('click', function() {
        hamburgerBtn.classList.toggle('active');
        navigation.classList.toggle('active');
    });
    
    // Close menu when clicking on a link (mobile)
    const navLinks = document.querySelectorAll('.navigacija1 a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburgerBtn.classList.remove('active');
                navigation.classList.remove('active');
            }
        });
    });
    
    // Close menu when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            hamburgerBtn.classList.remove('active');
            navigation.classList.remove('active');
        }
    });
    
    // Handle form submission (optional enhancement)
    const form = document.querySelector('.registracija form');
    if (form) {
        form.addEventListener('submit', function(e) {
            // Add any form validation or processing here if needed
            console.log('Form submitted');
        });
    }
});

// --- Firebase komunikacija za članke ---
// Pretpostavlja se da je firebaseConfig.js već uključen u HTML
// i da je Firebase inicijaliziran

// Inicijalizacija Firestore baze
const db = firebase.firestore();

// Dodaj novi članak
function addArticle(title, content) {
  return db.collection('articles').add({
    title: title,
    content: content,
    created: firebase.firestore.FieldValue.serverTimestamp()
  });
}

// Dohvati sve članke
function getArticles(callback) {
  db.collection('articles').orderBy('created', 'desc').onSnapshot(snapshot => {
    const articles = [];
    snapshot.forEach(doc => {
      articles.push({ id: doc.id, ...doc.data() });
    });
    callback(articles);
  });
}

// Ažuriraj članak
function updateArticle(id, newData) {
  return db.collection('articles').doc(id).update(newData);
}

// Obriši članak
function deleteArticle(id) {
  return db.collection('articles').doc(id).delete();
}

// Primjer korištenja:
// addArticle('Naslov', 'Sadržaj članka');
// getArticles(articles => { console.log(articles); });
// updateArticle(id, { title: 'Novi naslov' });
// deleteArticle(id);
// --- kraj Firebase komunikacije ---

// --- Spremanje narudžbe u Firebase Firestore ---
// Pozovi ovu funkciju kad korisnik plati
function saveOrderToFirestore(basketItems, paymentDetails) {
  // paymentDetails: { name, address, phone, email, method, notes }
  db.collection('orders').add({
    basket: basketItems, // artikli iz košarice
    payment: paymentDetails, // podaci o kupcu i načinu plaćanja
    created: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    alert('Narudžba je spremljena u bazu!');
  })
  .catch(err => {
    alert('Greška pri spremanju narudžbe: ' + err.message);
  });
}

// Primjer poziva:
// saveOrderToFirestore(basketItems, {
//   name: 'Ime Prezime',
//   address: 'Adresa',
//   phone: '0912345678',
//   email: 'email@domena.com',
//   method: 'dostava' ili 'preuzimanje',
//   notes: 'Napomena...'
// });
// --- kraj spremanja narudžbe ---

// --- Automatsko spremanje narudžbe iz forme za plaćanje ---
document.addEventListener('DOMContentLoaded', function() {
  const payForm = document.getElementById('pay-form');
  if (payForm) {
    payForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Pretpostavljamo da su basketItems i polja forme dostupni
      // Prikupi podatke iz forme
      const paymentDetails = {
        name: document.getElementById('customer-name')?.value || '',
        address: document.getElementById('customer-address')?.value || '',
        phone: document.getElementById('customer-phone')?.value || '',
        email: document.getElementById('customer-email')?.value || '',
        method: document.getElementById('delivery-method')?.value || '',
        notes: document.getElementById('delivery-notes')?.value || ''
      };
      // basketItems mora biti globalno dostupna varijabla
      if (typeof basketItems !== 'undefined' && basketItems.length > 0) {
        saveOrderToFirestore(basketItems, paymentDetails);
      }
      // ...daljnja obrada plaćanja (npr. prikaz poruke, čišćenje košarice)...
    });
  }
});
// --- kraj automatskog spremanja narudžbe ---


