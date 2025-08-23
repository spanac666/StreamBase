// index.js
// Uvoz Firebase konfiguracije i potrebnih modula
import { db, rtdb, storage } from "./firebaseConfig.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
import { ref, set } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";
import { ref as sRef, uploadBytes } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-storage.js";

// Košarica - logika za dodavanje, prikaz i plaćanje
let basket = [];

// Dodaje proizvod u košaricu
function addToBasket(name, price) {
    basket.push({ name, price });
    updateBasketDisplay();
}

// Ažurira prikaz broja proizvoda u košarici
function updateBasketDisplay() {
    const basketCount = document.getElementById('basket-count');
    if (basketCount) basketCount.textContent = basket.length;
}

// Kada se stranica učita
document.addEventListener('DOMContentLoaded', function() {
    updateBasketDisplay(); // Prikazuje broj proizvoda u košarici
    // Dodavanje proizvoda u košaricu na klik gumba
    document.querySelectorAll('.add-to-basket-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const name = this.getAttribute('data-name'); // Dohvaća ime proizvoda
            const price = parseFloat(this.getAttribute('data-price')); // Dohvaća cijenu proizvoda
            addToBasket(name, price);
        });
    });
    // Popup logika za prikaz košarice
    const basketModal = document.getElementById('basket-modal');
    const basketModalContent = document.getElementById('basket-modal-content');
    const basketModalClose = document.getElementById('basket-modal-close');
    const basketFooter = document.querySelector('.basket');
    const emptyBasketBtn = document.getElementById('empty-basket');
    // Funkcija za uklanjanje proizvoda iz košarice
    window.removeBasketItem = function(idx) {
        basket.splice(idx, 1); // Uklanja proizvod po indeksu
        updateBasketDisplay();
        if (basketFooter) basketFooter.click(); // Osvježava prikaz košarice
    };
    // Prikaz popup prozora s košaricom
    if (basketFooter && basketModal && basketModalContent && basketModalClose) {
        basketFooter.addEventListener('click', function() {
            if (basket.length === 0) {
                basketModalContent.innerHTML = '<p>Košarica je prazna.</p>';
            } else {
                let total = basket.reduce((sum, item) => sum + item.price, 0); // Izračun ukupne cijene
                let itemsHtml = basket.map((item, idx) => `<li style=\"cursor:pointer;\" title=\"Klikni za uklanjanje\">${item.name} - ${item.price.toFixed(2)} € <span style='color:#d35400;font-weight:bold;margin-left:8px;cursor:pointer;' onclick='removeBasketItem(${idx});event.stopPropagation();'>&times;</span></li>`).join('');
                basketModalContent.innerHTML = `<h2 class="popup-title">Košarica</h2><ul>${itemsHtml}</ul><hr><strong>Ukupno: ${total.toFixed(2)} €</strong>`;
            }
            basketModal.style.display = 'flex'; // Prikazuje modal
        });
        // Zatvara modal košarice na klik X
        basketModalClose.addEventListener('click', function() {
            basketModal.style.display = 'none';
        });
        // Zatvara modal košarice na klik izvan prozora
        window.addEventListener('click', function(event) {
            if (event.target === basketModal) {
                basketModal.style.display = 'none';
            }
        });
    }
    // Gumb za pražnjenje košarice
    if (emptyBasketBtn) {
        emptyBasketBtn.onclick = function() {
            // Zvuk uklonjen
            basket = [];
            updateBasketDisplay();
            if (basketModalContent) {
                basketModalContent.innerHTML = '<p>Košarica je prazna. <span style="font-size:2rem;">😢</span></p>';
            }
            // Zatvara modal košarice nakon 2 sekunde
            setTimeout(() => {
                if (basketModal) {
                    basketModal.style.display = 'none';
                }
            }, 2000);
        };
    }
    // Logika za modal plaćanja
    const payBtn = document.getElementById('pay-basket');
    const payModal = document.getElementById('pay-modal');
    const payModalClose = document.getElementById('pay-modal-close');
    const payForm = document.getElementById('pay-form');
    const paySuccess = document.getElementById('pay-success');
    if (payBtn && payModal && payModalClose && payForm && paySuccess) {
        // Otvara modal za plaćanje
        payBtn.onclick = function() {
            if (basket.length === 0) {
                alert('Košarica je prazna!');
                return;
            }
            payModal.style.display = 'flex';
            // Zvuk blagajne uklonjen
        };
        // Zatvara modal za plaćanje
        payModalClose.onclick = function() {
            payModal.style.display = 'none';
            payForm.style.display = '';
            paySuccess.style.display = 'none';
            payForm.reset();
        };
        // Slanje forme za plaćanje
        payForm.onsubmit = function(e) {
            e.preventDefault();
            payForm.style.display = 'none';
            paySuccess.style.display = 'block';
            paySuccess.innerHTML = '<span style="font-size:6rem;">😄</span><br><strong>Hvala i dobar tek!</strong>';
            basket = [];
            updateBasketDisplay();
            setTimeout(() => {
                payModal.style.display = 'none';
                if (basketModal) basketModal.style.display = 'none';
                payForm.style.display = '';
                paySuccess.style.display = 'none';
                payForm.reset();
                if (basketModalContent) basketModalContent.innerHTML = '<p>Košarica je prazna.</p>';
            }, 3000);
        };
        // Zatvara modal za plaćanje na klik izvan prozora
        window.addEventListener('click', function(event) {
            if (event.target === payModal) {
                payModal.style.display = 'none';
                payForm.style.display = '';
                paySuccess.style.display = 'none';
                payForm.reset();
            }
        });
    }
});
