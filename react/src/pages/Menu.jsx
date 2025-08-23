import React, { useState } from 'react'
import { useBasket } from '../components/BasketProvider'
import './Menu.css'

const Menu = () => {
  const { addToBasket } = useBasket()
  const [selectedItem, setSelectedItem] = useState(null)
  const [activeCategory, setActiveCategory] = useState('pizza')

  const menuCategories = {
    pizza: [
      {
        id: 1,
        name: "Margherita",
        price: 12.99,
        ingredients: "Paradajz sos, mozzarella sir, bosiljak",
        image: "/pizza/MARGHERITA.jpeg"
      },
      {
        id: 2,
        name: "Peperoni",
        price: 15.99,
        ingredients: "Paradajz sos, mozzarella sir, pepperoni kobasica",
        image: "/pizza/PEPERONI.jpeg"
      },
      {
        id: 3,
        name: "Mexicana",
        price: 14.99,
        ingredients: "Paradajz sos, mozzarella sir, paprika, gljive, crni luk",
        image: "/pizza/MEXICANA.jpeg"
      },
      {
        id: 4,
        name: "Prosciutto",
        price: 18.99,
        ingredients: "Paradajz sos, mozzarella sir, prosciutto, rukola",
        image: "/pizza/PROSCIUTTO.jpeg"
      },
      {
        id: 5,
        name: "Tuna",
        price: 16.99,
        ingredients: "Paradajz sos, mozzarella sir, tuna, crni luk",
        image: "/pizza/TUNA.jpeg"
      },
      {
        id: 6,
        name: "Diavolo",
        price: 19.99,
        ingredients: "Paradajz sos, mozzarella sir, ljuta salama, papričice",
        image: "/pizza/DIAVOLO.jpeg"
      },
      {
        id: 7,
        name: "Kafanska",
        price: 17.99,
        ingredients: "Paradajz sos, mozzarella sir, domaći specijaliteti",
        image: "/pizza/KAFANSKA.jpeg"
      },
      {
        id: 8,
        name: "Slavonska",
        price: 16.99,
        ingredients: "Paradajz sos, mozzarella sir, slavonski kulen",
        image: "/pizza/SLAVONSKA.jpeg"
      },
      {
        id: 9,
        name: "Panceta",
        price: 15.99,
        ingredients: "Paradajz sos, mozzarella sir, panceta, luk",
        image: "/pizza/PANCETA.jpeg"
      },
      {
        id: 10,
        name: "Calzone",
        price: 14.99,
        ingredients: "Zatvorena pizza s sirom i šunkom",
        image: "/pizza/CALZIONE.jpg"
      }
    ],
    grill: [
      {
        id: 7,
        name: "Čevapi",
        price: 8.99,
        ingredients: "Tradicionalni bosanski čevapi s kajmakom",
        image: "/rostilj/ČEVAPI.jpeg"
      },
      {
        id: 8,
        name: "Čevapi s kajmakom",
        price: 9.99,
        ingredients: "Čevapi servovani s domaćim kajmakom",
        image: "/rostilj/ČEVAPI KAJMAK.jpeg"
      },
      {
        id: 9,
        name: "Punjena pleskavica",
        price: 12.99,
        ingredients: "Sočna pleskavica punjena sirom i šunkom",
        image: "/rostilj/PUNJENA PLESKAVICA.jpeg"
      },
      {
        id: 10,
        name: "Mješano meso",
        price: 15.99,
        ingredients: "Kombinacija različitih vrsta roštilja",
        image: "/rostilj/MJEŠANO MESO.jpeg"
      },
      {
        id: 11,
        name: "Carsko meso",
        price: 18.99,
        ingredients: "Kraljevska kombinacija najfinjih mesa",
        image: "/rostilj/CARSKO MESO.jpeg"
      },
      {
        id: 12,
        name: "Gurmanska piletina",
        price: 14.99,
        ingredients: "Piletina pripremljena na gurmansky način",
        image: "/rostilj/GURMANSKA PILETINA.jpeg"
      },
      {
        id: 13,
        name: "Pileći medaljoni",
        price: 13.99,
        ingredients: "Nežni medaljoni od pilećeg mesa",
        image: "/rostilj/PILEĆI MEDALJONI.jpeg"
      },
      {
        id: 14,
        name: "Šiš čevap",
        price: 11.99,
        ingredients: "Čevapi na šišu s povrćem",
        image: "/rostilj/ŠIŠ ČEVAP.jpeg"
      },
      {
        id: 15,
        name: "Pikantni uštipak",
        price: 7.99,
        ingredients: "Ljuti uštipci za ljubitelje ostrih jela",
        image: "/rostilj/PIKANTNI UŠTIPAK.jpeg"
      },
      {
        id: 16,
        name: "Pečenice",
        price: 16.99,
        ingredients: "Tradicionalne pečenice s roštilja",
        image: "/rostilj/PEČENICE.jpeg"
      }
    ],
    burger: [
      {
        id: 17,
        name: "Classic Burger",
        price: 9.99,
        ingredients: "Govedina, salata, paradajz, luk, sir, burger sos",
        image: "/burger/BURGER CLASSIC.jpeg"
      },
      {
        id: 18,
        name: "Specijal Burger",
        price: 10.99,
        ingredients: "Govedina, dupli sir, salata, paradajz, luk",
        image: "/burger/BURGER SPECIJAL.jpeg"
      },
      {
        id: 19,
        name: "Bacon BBQ",
        price: 12.99,
        ingredients: "Govedina, crispy bacon, sir, salata, paradajz",
        image: "/burger/BACON_BBQ.jpeg"
      },
      {
        id: 20,
        name: "Blue Cheese Burger",
        price: 13.99,
        ingredients: "Govedina, blue cheese, karamelizovani luk, sir",
        image: "/burger/BLUE_CHESE.jpg"
      },
      {
        id: 21,
        name: "Chicken Burger",
        price: 11.99,
        ingredients: "Pileći file, salata, paradajz, majonez",
        image: "/burger/BURGER PILETINA.jpeg"
      },
      {
        id: 22,
        name: "Veggie Burger",
        price: 8.99,
        ingredients: "Vegetarijanski pljeskavica, avokado, salata",
        image: "/burger/VEGE_BURGER.jpg"
      },
      {
        id: 23,
        name: "Mushroom Burger",
        price: 11.49,
        ingredients: "Govedina, gljive, sir, salata",
        image: "/burger/MUSHROOM_BURGER.jpg"
      },
      {
        id: 24,
        name: "Spicy Burger",
        price: 12.49,
        ingredients: "Govedina, ljute papričice, sir",
        image: "/burger/SPICY BURGER.jpeg"
      },
      {
        id: 25,
        name: "Špeksi Burger",
        price: 13.49,
        ingredients: "Govedina, špek, sir, salata",
        image: "/burger/ŠPEKSI BURGER.jpeg"
      },
      {
        id: 26,
        name: "Dupli Specijal",
        price: 15.99,
        ingredients: "Dupla govedina, dupli sir, salata",
        image: "/burger/BURGER DUPLI SPECIJAL.jpeg"
      }
    ],
    pomfri: [
      {
        id: 27,
        name: "Fry and Deep",
        price: 3.99,
        ingredients: "Hrskavi zlatni pomfri duboko prženi",
        image: "/pomfri/FRY AND DEEP.jpg"
      },
      {
        id: 28,
        name: "Julienne pomfri",
        price: 5.99,
        ingredients: "Tanko rezani pomfri julienne stil",
        image: "/pomfri/JULIENNE.jpeg"
      },
      {
        id: 29,
        name: "Pomfri sa sirom",
        price: 7.99,
        ingredients: "Pomfri s rastopljenim sirom",
        image: "/pomfri/pomes_sir.jpg"
      }
    ],
    slastice: [
      {
        id: 32,
        name: "Baklava",
        price: 4.99,
        ingredients: "Tradicionalna baklava s orasima i medom",
        image: "/slastice/baklava_images.jpg"
      },
      {
        id: 33,
        name: "Čokoladni kolač",
        price: 5.99,
        ingredients: "Bogat čokoladni kolač s kremom",
        image: "/slastice/čokoladni-kolač.jpeg"
      },
      {
        id: 34,
        name: "Domaćica cheesecake",
        price: 6.99,
        ingredients: "Kremasti cheesecake domaće izrade",
        image: "/slastice/domacica-cheesecake.jpg"
      },
      {
        id: 35,
        name: "Palačinke",
        price: 3.99,
        ingredients: "Ukusne palačinke s različitim filovima",
        image: "/slastice/palacinke.jpeg"
      },
      {
        id: 36,
        name: "Tiramisu",
        price: 7.99,
        ingredients: "Italijanski tiramisu s mascarpone kremom",
        image: "/slastice/tiramisu.images.jpg"
      }
    ],
    gazirano: [
      {
        id: 37,
        name: "Coca Cola",
        price: 2.99,
        ingredients: "Klasična Coca Cola 0.33L",
        image: "/gazirano/1-COCA-COLA.jpg"
      },
      {
        id: 38,
        name: "Coca Cola Zero",
        price: 2.99,
        ingredients: "Coca Cola Zero 0.33L",
        image: "/gazirano/2-COCA_COLA_0.jpg"
      },
      {
        id: 39,
        name: "Fanta",
        price: 2.99,
        ingredients: "Fanta narandža 0.33L",
        image: "/gazirano/3-FANTA.jpg"
      },
      {
        id: 40,
        name: "Sprite",
        price: 2.99,
        ingredients: "Sprite limun-limeta 0.33L",
        image: "/gazirano/4-SPRITE.jpg"
      },
      {
        id: 41,
        name: "Schweppes Tonic",
        price: 3.49,
        ingredients: "Schweppes tonic 0.33L",
        image: "/gazirano/5-SCHWEPPES_TONIC.jpg"
      },
      {
        id: 42,
        name: "Schweppes Bitter Lemon",
        price: 3.49,
        ingredients: "Schweppes bitter lemon 0.33L",
        image: "/gazirano/6-SCHWEPPES_BITER_LEMMON.jpg"
      },
      {
        id: 43,
        name: "Pepsi",
        price: 2.99,
        ingredients: "Pepsi cola 0.33L",
        image: "/gazirano/7-PEPSI.jpg.jpg"
      },
      {
        id: 44,
        name: "Pepsi Max",
        price: 2.99,
        ingredients: "Pepsi Max 0.33L",
        image: "/gazirano/8-PEPSI_MAX.jpg"
      },
      {
        id: 45,
        name: "Cedevita",
        price: 2.49,
        ingredients: "Cedevita vitamin napitak",
        image: "/gazirano/9-CEDEVITA.jpg"
      },
      {
        id: 46,
        name: "Orangina",
        price: 3.29,
        ingredients: "Orangina prirodni napitak 0.25L",
        image: "/gazirano/10-ORANGINA.jpg"
      }
    ],
    piva: [
      {
        id: 45,
        name: "Ožujsko",
        price: 3.99,
        ingredients: "Ožujsko pivo 0.5L",
        image: "/piva/1-OŽUJSKO.jpg"
      },
      {
        id: 46,
        name: "Karlovačko",
        price: 3.49,
        ingredients: "Karlovačko pivo 0.5L",
        image: "/piva/2-KARLOVAČKO.jpg"
      },
      {
        id: 47,
        name: "Paulaner",
        price: 5.49,
        ingredients: "Paulaner wheat beer 0.5L",
        image: "/piva/3-PAULANER.jpg"
      },
      {
        id: 48,
        name: "Guinness",
        price: 5.99,
        ingredients: "Guinness crno pivo 0.44L",
        image: "/piva/4-GUINNESS.jpg"
      },
      {
        id: 49,
        name: "Bier Lech",
        price: 4.99,
        ingredients: "Bier Lech pivo 0.5L",
        image: "/piva/5-BIER_LECH.jpg"
      },
      {
        id: 50,
        name: "Becks",
        price: 4.79,
        ingredients: "Becks pivo 0.33L",
        image: "/piva/6-BECKS.jpg"
      },
      {
        id: 51,
        name: "Heineken",
        price: 4.49,
        ingredients: "Heineken pivo 0.33L",
        image: "/piva/7-HEINEKEN.jpg"
      },
      {
        id: 52,
        name: "Stella Artois",
        price: 4.99,
        ingredients: "Stella Artois pivo 0.33L",
        image: "/piva/8-STELLA.jpg"
      },
      {
        id: 53,
        name: "Corona",
        price: 5.49,
        ingredients: "Corona Extra s limunom 0.33L",
        image: "/piva/9-CORONA.jpg"
      },
      {
        id: 54,
        name: "Tuborg",
        price: 4.29,
        ingredients: "Tuborg pivo 0.33L",
        image: "/piva/10-TUBORG.jpg"
      },
      {
        id: 55,
        name: "Amstel",
        price: 4.69,
        ingredients: "Amstel pivo 0.33L",
        image: "/piva/11-AMSTEL.jpg"
      },
      {
        id: 56,
        name: "Svijetsko pivo",
        price: 3.79,
        ingredients: "Svijetsko pivo 0.5L",
        image: "/piva/12-SVIJETSKO_PIVO.jpg"
      }
    ]
  }

  const categoryNames = {
    pizza: "🍕 Pizza",
    grill: "🔥 Grill", 
    burger: "🍔 Burger",
    pomfri: "� Pomfri",
    slastice: "🍰 Slastice",
    gazirano: "🥤 Gazirano",
    piva: "🍺 Piva"
  }

  const currentItems = menuCategories[activeCategory]

  const openModal = (item) => {
    setSelectedItem(item)
  }

  const closeModal = () => {
    setSelectedItem(null)
  }

  const handleAddToBasket = (item) => {
    addToBasket(item)
    closeModal()
  }

  return (
    <div className="main-menu">
      <div className="menu-header">
        <h1>Naš meni</h1>
        <p>Izaberite vaše omiljeno jelo</p>
      </div>

      <div className="menu-categories">
        {Object.keys(categoryNames).map(category => (
          <button 
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {categoryNames[category]}
          </button>
        ))}
      </div>

      <div id="lista-pizze">
        {currentItems.map(item => (
          <div key={item.id} className="card" onClick={() => openModal(item)}>
            <img 
              src={item.image} 
              alt={item.name}
              onError={(e) => {
                e.target.src = '/api/placeholder/250/200'
              }}
            />
            <h3>{item.name}</h3>
            <p className="price">{item.price}€</p>
            <p className="ingredients">{item.ingredients}</p>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div className="modal show">
          <div className="modal-content">
            <button className="close-btn" onClick={closeModal}>&times;</button>
            <h2>{selectedItem.name}</h2>
            <img 
              src={selectedItem.image} 
              alt={selectedItem.name}
              onError={(e) => {
                e.target.src = '/api/placeholder/300/200'
              }}
            />
            <p className="modal-price">{selectedItem.price}€</p>
            <p className="modal-ingredients">
              <strong>Sastojci:</strong> {selectedItem.ingredients}
            </p>
            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => handleAddToBasket(selectedItem)}
              >
                Dodaj u košaricu
              </button>
              <button 
                className="btn btn-danger"
                onClick={closeModal}
              >
                Zatvori
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Menu
