document.addEventListener('DOMContentLoaded',() => {
    const bookingForm = document.getElementById('bookingForm');
    const locationSelect = document.getElementById('location');
    const hotelSelect = document.getElementById('hotel');
    const reservationTitle = document.getElementById('reservationtitle');
    const reservationDetails = document.getElementById ('reservationDetails');
    const locationDetails = document.getElementById ('locationDetails');
    const hotelDetails = document.getElementById('hotelDetails');
    const roomDetails = document.getElementById('roomDetails');
    const personalDetailsForm = document.getElementById('personalDetailsForm');
    const totalAmount = document.getElementById('totalAmount');
    const breakfastCheckbox = document.getElementById('breakfast');
    const bookingCode = document.getElementById('bookingCode');
    const successMessage = document.getElementById('successMessage');
    const failureMessage = document.getElementById('failureMessage');
    const reservationsTable = document.getElementById("reservationsTable");
    const goToHomeButton = document.getElementById("goToHomeButton");


    let selectedRoom = null;
    let selectedHotel = null;
    let pricePerNight = 0;
    let guestsCount = 1;
    let breakfastCost=0;

    

    //dhmiourgia bookingID
    function generateBookingID() {
        const initials = selectedHotel.split(" ").map(word => word[0]).join("").toUpperCase(); // Παίρνει τα αρχικά του ξενοδοχείου
        const randomNum = Math.floor(1000 + Math.random() * 9000); // 4ψήφιος αριθμός
        console.log(`Hotel: ${selectedHotel}, Initials: ${initials}, Random Number: ${randomNum}`); // Έλεγχος τιμών
        return `${initials}-${randomNum}`;
    }

    function calculateDays(checkInDate, checkOutDate){
        const timeDiff = new Date(checkOutDate) - new Date(checkInDate);
        const days= timeDiff / (1000 * 3600 * 24);

        if (days <= 0){
            alert('Check-out must be at least one day after check-in!');
            return 0;
        }

        return days;
    }


    function updateHotels(){
        const location = locationSelect.value;
        hotelSelect.innerHTML = "";
        let hotels= [];

        if (location === 'Athens'){
            hotels = ['Hotel Acropolis', 'Hotel Plaka', 'Hotel Syntagma'];
        }

        if (location === 'Chania'){
            hotels = ['The Chania Hotel', 'Kriti Hotel', 'Hotel Nostos'];
        }

        if(location === 'Thessaloniki'){
            hotels = ['Hotel White Tower', 'Hotel Aristotelous', 'Hotel Ladadika'];
        }

        hotels.forEach(hotel => {
            const option = document.createElement('option');
            option.value = hotel;
            option.textContent = hotel;
            hotelSelect.appendChild(option);
        });
    }

    locationSelect.addEventListener('change', updateHotels);
    updateHotels();


    bookingForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const checkInDate = new Date(document.getElementById('check-in').value);
        const checkOutDate = new Date(document.getElementById('check-out').value);
        const guests = document.getElementById('guests').value;

        if(guests<1 ){
            alert('The number of guests must be at least 1!');
        }

        if(checkOutDate <= checkInDate){
            alert ('Check out date must be after check in date!');
            return; 
        }

        const today = new Date();
        if(checkInDate<today || checkOutDate<today){
            alert('You can not book a reservation for the past!');
            return;
        }


     
        bookingForm.style.display = 'none';
        reservationTitle.style.display = 'none';
        cancelForm.style.display = 'none';
       

        const location = locationSelect.value;
        const hotel = hotelSelect.value;

        selectedHotel = hotel;

        locationDetails.textContent = `Location: ${location}`;
        hotelDetails.textContent = `Hotel: ${hotel}`;
        roomDetails.innerHTML = updateRoomDetails(hotel);
        
       
        reservationDetails.style.display = 'block';
       

    
    });
    

    function updateRoomDetails(hotel){
        let roomButtons = '';
        let imageSrc = '';
        let description='';
        let reviews = '';

        

        switch (hotel){
            case 'Hotel Acropolis':
                roomButtons =`
                    <button class="room-button" data-room="Single Room" data-price="35">Single Room: 35€</button>
                    <button class="room-button" data-room="Double Room" data-price="55">Double Room: 50€</button>
                    <button class="room-button" data-room="Triple Room" data-price="80">Triple Room: 80€</button>
                    <button class="room-button" data-room="Suite Room" data-price="120">Suite Room: 120€</button>
                    `;   
                    imageSrc ='images/hotel_acropolis.jpg';
                    description = 'The Hotel Acropolis is located in the historic center of Athens and offers a stunning view of the Parthenon.All rooms are equipped with air conditioning, free Wi-Fi, satellite TV and minibar. Some include a balcony with views of the Acropolis or Filopappos Hill.'
                    reviews = `
                    ⭐ 9.2 Excellent - 2,814 reviews
                    <div>Personal: <progress value="9.8" max="10"></progress></div>
                    <div>Cleanliness: <progress value="9.3" max="10"></progress></div>
                    <div>Comfort: <progress value="9.0" max="10"></progress></div>
                    <div>Location: <progress value="9.8" max="10"></progress></div>
                    `;
                    break;


            case'Hotel Plaka':
                roomButtons =`
                    <button class="room-button" data-room="Single Room" data-price="45">Single Room: 45€</button>
                    <button class="room-button" data-room="Double Room" data-price="60">Double Room: 60€</button>
                    <button class="room-button" data-room="Triple Room" data-price="75">Triple Room: 75€</button>
                    <button class="room-button" data-room="Suite Room" data-price="110">Suite Room: 110€</button>
                `;   
                imageSrc ='images/hotel_plaka.jpg';
                description = 'Hotel Plaka enjoys an excellent location in the historic center of Athens, just a 5-minute walk from Syntagma Square and 2 blocks from Monastiraki Metro Station. The elegant rooms at Hotel Plaka include air conditioning, minibar, safe and Wi-Fi. Most have a balcony with a view of the Acropolis, Plaka or Lycabettus.'
                reviews = `
                ⭐ 9.0 Excellent - 1,953 reviews
                <div>Personal: <progress value="9.5" max="10"></progress></div>
                <div>Cleanliness: <progress value="9.0" max="10"></progress></div>
                <div>Comfort: <progress value="8.8" max="10"></progress></div>
                <div>Location: <progress value="9.7" max="10"></progress></div>
                `;
                break;
            case'Hotel Syntagma':
                roomButtons =`
                    <button class="room-button" data-room="Single Room" data-price="60">Single Room: 60€</button>
                    <button class="room-button" data-room="Double Room" data-price="80">Double Room: 80€</button>
                    <button class="room-button" data-room="Triple Room" data-price="90">Triple Room: 90€</button>
                    <button class="room-button" data-room="Suite Room" data-price="130">Suite Room: 130€</button>
                `;   
                imageSrc ='images/hotel_syntagma.jpg';
                description = 'Hotel Syntagma is in the center of the city and has free WiFi. It is well located in the center of Athens, a short distance from Monastiraki Square, Monastiraki Electric Station and Monastiraki Metro Station. It includes 1 bedroom, 1 bathroom with free toiletries, a living room, and a kitchen with a refrigerator. In addition to a shower, the bathroom also has a hairdryer and towels. Guests are also provided with linen.'
                reviews = `
                ⭐ 8.8 Very Good - 1,462 reviews
                <div>Personal: <progress value="9.0" max="10"></progress></div>
                <div>Cleanliness: <progress value="8.7" max="10"></progress></div>
                <div>Comfort: <progress value="8.5" max="10"></progress></div>
                <div>Location: <progress value="9.3" max="10"></progress></div>
                `;
                break;

            case'The Chania Hotel':
                roomButtons =`
                    <button class="room-button" data-room="Single Room" data-price="55">Single Room: 55€</button>
                    <button class="room-button" data-room="Double Room" data-price="70">Double Room: 70€</button>
                    <button class="room-button" data-room="Triple Room" data-price="85">Triple Room: 85€</button>
                    <button class="room-button" data-room="Suite Room" data-price="115">Suite Room: 115€</button>

                `; 
                imageSrc ='images/Chania_Hotel.jpg'; 
                description = 'The Chania Hotel located in Chania Town, 1 km from Nea Chora Beach, The Chania Hotel provides accommodation with a fitness center, private parking, a shared lounge and a terrace. The clever layout makes the most of the rooms square footage, with an elegantly fitted wardrobe, a comfortable breakfast table for two that can easily be converted into a desk, and of course a large, comfortable bed. '    
                reviews = `
                ⭐ 9.3 Excellent - 1,673 reviews
                <div>Personal: <progress value="9.3" max="10"></progress></div>
                <div>Cleanliness: <progress value="9.2" max="10"></progress></div>
                <div>Comfort: <progress value="8.0" max="10"></progress></div>
                <div>Location: <progress value="9.9" max="10"></progress></div>
                `;
                
                break;
            case'Kriti Hotel':
                roomButtons =`
                    <button class="room-button" data-room="Single Room" data-price="40">Single Room: 40€</button>
                    <button class="room-button" data-room="Double Room" data-price="55">Double Room: 55€</button>
                    <button class="room-button" data-room="Triple Room" data-price="70">Triple Room: 70€</button>
                    <button class="room-button" data-room="Suite Room" data-price="105">Suite Room: 105€</button>

                `;   
                imageSrc ='images/kriti_hotel.jpg'; 
                description = 'Kriti Hotel is in Heraklion City, 2.5 km from Ammoudara Beach and features accommodation with free WiFi and free private parking. Equipped with free Wi-Fi, satellite TV, air conditioning, minibar and private bathroom with hairdryer. Offers views of the White Mountains range and the pool or the sea from its window or balcony (upon availability).'
                reviews = `
                ⭐ 9.6 Excellent - 1,876 reviews
                <div>Personal: <progress value="9.7" max="10"></progress></div>
                <div>Cleanliness: <progress value="9.8" max="10"></progress></div>
                <div>Comfort: <progress value="9.8" max="10"></progress></div>
                <div>Location: <progress value="9.7" max="10"></progress></div>
                `;
                break;
            case'Hotel Nostos':
                roomButtons =`
                    <button class="room-button" data-room="Single Room" data-price="35">Single Room: 35€</button>
                    <button class="room-button" data-room="Double Room" data-price="65">Double Room: 65€</button>
                    <button class="room-button" data-room="Triple Room" data-price="95">Triple Room: 95€</button>
                    <button class="room-button" data-room="Suite Room" data-price="150">Suite Room: 150€</button>

                `;   
                imageSrc ='images/hotel_nostos.jpg'; 
                description = 'In the heart of the old Venetian town of Chania, Nostos Hotel is housed in a beautiful, well-preserved mansion, dating back to the 1400s. It has a roof terrace overlooking the Venetian harbor and the old town. Free Wi-Fi is available throughout. The rooms are spacious and comfortable and include all the amenities that will make the visitor stay with good memories of his stay'
                break;
            case'Hotel White Tower':
                roomButtons =`
                    <button class="room-button" data-room="Single Room" data-price="50">Single Room: 50€</button>
                    <button class="room-button" data-room="Double Room" data-price="70">Double Room: 70€</button>
                    <button class="room-button" data-room="Triple Room" data-price="85">Triple Room: 85€</button>
                    <button class="room-button" data-room="Suite Room" data-price="109">Suite Room: 109€</button>

                `; 
                imageSrc ='images/whitetower_hotel.jpg';  
                description ='Right in the center of Thessaloniki, within a short distance of Archaeological Museum of Thessaloniki and Rotunda and Arch of Galerius, White Tower Apartment offers free WiFi, air conditioning and household amenities such as an oven and coffee machine. Guests have a private balcony at their disposal.' 
                break;

            case'Hotel Aristotelous':
                roomButtons =`
                    <button class="room-button" data-room="Single Room" data-price="70">Single Room: 70€</button>
                    <button class="room-button" data-room="Double Room" data-price="90">Double Room: 90€</button>
                    <button class="room-button" data-room="Triple Room" data-price="115">Triple Room: 115€</button>
                    <button class="room-button" data-room="Suite Room" data-price="145">Suite Room: 145€</button>

                `;   
                imageSrc ='images/aristotelous_hotel.jpg'; 
                description='Aristotelous Hotel is an iconic 5-star hotel in the heart of Thessaloniki, in the impressive Aristotelous Square. Its rooms and suites have wooden floors, wooden furniture and luxurious curtains. They also include a laptop-sized safe, a minibar and a flat-screen satellite TV.'
                break;
            case'Hotel Ladadika':
                roomButtons =`
                    <button class= "room-button" data-room="Single Room" data-price="65">Single Room: 65€</button>
                    <button class= "room-button" data-room="Double Room" data-price="85">Double Room: 85€</button>
                    <button class="room-button" data-room="Triple Room" data-price="120">Triple Room: 120€</button>
                    <button class="room-button" data-room="Suite Room" data-price="160">Suite Room: 160€</button>
                `;   
                imageSrc ='images/hotel_ladadika.jpg'; 
                description='Hotel Ladadika enjoys a prime location, only 50 metres from Aristotelous Square and Thessaloniki’s promenade. It offers elegantly decorated rooms with free Wi-Fi access. Air conditioning, LCD satellite TV and refrigerator are standard in all rooms.'
                break;
            default:
                roomButtons = 'No room details available';
                imageSrc = '';
                description = '';
                reviews = '';
        }

        document.getElementById('roomImage').src = imageSrc;
        document.getElementById('roomImage').style.display = imageSrc ? 'block' : 'none';
        document.getElementById('roomDescription').textContent = description;
        document.getElementById('roomReviews').innerHTML = reviews;

        return roomButtons;
    }
     
    roomDetails.addEventListener('click', (event) => {
        if(event.target && event.target.classList.contains('room-button')) {
            selectedRoom = {
                type: event.target.getAttribute('data-room'),
                price: event.target.getAttribute('data-price')
            };

            pricePerNight = parseFloat(selectedRoom.price);

            const checkInDate = document.getElementById('check-in').value;
            const checkOutDate = document.getElementById('check-out').value;
            const days = calculateDays(checkInDate, checkOutDate);

            breakfastCost = breakfastCheckbox.checked ? 10 : 0; 

            const totalCost = (days * pricePerNight * guestsCount) + breakfastCost ;
           
            if (days > 0) {
                const totalCost = (days * pricePerNight * guestsCount) + breakfastCost;
                totalAmount.textContent = `Total Amount: ${totalCost}€ (including breakfast: ${breakfastCost}€)`;
            }

            reservationDetails.style.display = 'none';
            personalDetailsForm.style.display = 'block';
          
        }
    });


    
   
    personalDetailsForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const bookingID = generateBookingID(); 
        document.getElementById('bookingCode').textContent = bookingID;

        const cardNumber = document.getElementById('cardNumber').value;
        const expiryDate = document.getElementById('expiryDate').value;
        const cvv = document.getElementById('cvv').value;

        if (cardNumber.length !== 19 || expiryDate.length !== 5 || cvv.length !== 3){
            alert('Please fill out the card details correctly!');
            return;
        }

        const [month, year] = expiryDate.split('/').map(Number);
        if(!isValidExpiryDate(month, year)){
            alert('The expiry date is invalid or the card has expired.');
            return;
        }

        if (!selectedRoom){
            alert('Please select a room before proceeding!');
            return;
        }
       
        const reservationData = {
            location: document.getElementById('location').value,
            hotel: document.getElementById('hotel').value,
            checkIn: document.getElementById('check-in').value,
            checkOut: document.getElementById('check-out').value,
            guests: document.getElementById('guests').value,
            breakfast: document.getElementById('breakfast').checked ? 'Yes' : 'No',
            surname: document.getElementById('surname').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            roomType: selectedRoom.type,
            bookingID: bookingID,

        }
        console.log('Data being sent:', reservationData);

        try {
            const response = await fetch('/reservations', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reservationData),
            });


            if (response.ok) {

                const result = await response.json();
                console.log(result);

                personalDetailsForm.style.display = 'none';
                successMessage.style.display = 'block'; // Show success message
                document.getElementById('bookingCode').textContent = bookingID; 
                
                setTimeout(() => {
                    window.location.href = '/';
                }, 5000);
            } else {
                // an h apanthsh den einai ok, tote katagrafetai apo ton server
                const result = await response.json(); // diabazoume to periexomeno ths apanthshs
                console.error('Error response from server:', result);
                
                personalDetailsForm.style.display = 'none';
                failureMessage.style.display = 'block';

                //epistofh sthna arxikh meta apo 5 sec
                setTimeout(() => {
                    window.location.href = '/';
                }, 5000);
            }

        } catch (error) {
            console.error('Error during reservation:', error);
            personalDetailsForm.style.display = 'none';
            failureMessage.style.display = 'block';
        }
    });

    function isValidExpiryDate(month, year) {
        const currentYear = new Date().getFullYear() %100;
        const currentMonth = new Date().getMonth() +1;
    
        if(year + 2000 < currentYear) return false;
        if(year + 2000 === currentYear && month< currentMonth) return false;
    
        return month>=1 && month <=12;
    }
    
    document.getElementById("hotelButton").addEventListener("click", function() {
        bookingForm.style.display = 'none';
        reservationTitle.style.display = 'none';
        cancelForm.style.display = 'none';
        document.getElementById("hotelLoginForm").style.display = "block";
    });
    

    document.getElementById('hotelLoginForm').addEventListener('submit', function (event) {
        event.preventDefault(); // Αποτροπή της προεπιλεγμένης αποστολής φόρμας
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        //Έλεγχος τοπικά για τα credentials
        if (username === 'hotelier' && password === 'hotelier') {
            // Εμφάνιση κρατήσεων
            loadReservations(); 
            document.getElementById('hotelLoginForm').style.display = 'none'; // Κρύβουμε τη φόρμα σύνδεσης
        } else {
            alert('Invalid login credentials!');
        }
        
    });
    
        // fortwsh krathsewn 
    function loadReservations() {
        // lhpsh krathsewn apo backend
        
        ('http://localhost:3000/reservations')
            .then(response => response.json())
            .then(reservationsData => {
                // da8esima dwmatia apo backend
                fetch('http://localhost:3000/room_inventory')
                    .then(response => response.json())
                    .then(roomsData => {
                        const reservationsTable = document.getElementById('reservationsTable');
                        const tbody = reservationsTable.querySelector('tbody');
                        tbody.innerHTML = ''; // 

                        reservationsData.forEach(reservation => {
                            const roomType = reservation.room_type; // apo8hkeysh typos dwmatiou
                            
                            //room_type den einai swsto => mnm
                            const availableRoom = roomType && roomsData.find(room => room.room_type === roomType);
                            
                            // dhmiourgias neas grammhs ston pinaka
                            const row = document.createElement('tr');
                            row.innerHTML = `
                                <td>${reservation.bookingid}</td>
                                <td>${reservation.hotel}</td>
                                <td>${roomType || 'Unknown'}</td> <!-- Αν δεν υπάρχει room_type, εμφανίζουμε "Unknown" -->
                                <td>${reservation.location}</td>
                                <td>${new Date(reservation.check_in).toLocaleDateString()}</td>
                                <td>${new Date(reservation.check_out).toLocaleDateString()}</td>
                                <td>${reservation.guests}</td>
                                <td>${availableRoom ? availableRoom.available_rooms : 'N/A'}</td> <!-- Εμφάνιση διαθεσίμων δωματίων -->
                            `;
                            tbody.appendChild(row);
                        });

                        
                        reservationsTable.style.display = 'block'; // emfanish pinaka
                        goToHomeButton.style.display = 'block';
                    })
                    .catch(error => console.error('Error fetching rooms data:', error));
            })
            .catch(error => console.error('Error fetching reservations data:', error));
    }
    

    document.getElementById("goToHomeButton").addEventListener("click", function() {
        window.location.href = '/'; 
    });


    document.getElementById('cancelForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Να μην γίνει κανονικά η αποστολή του φόρμα
        const bookingid = document.getElementById('bookingid').value.trim();

        if(!bookingid){
            alert("Enter a booking id");
            return;
        }

        const confirmation = confirm (`Are you sure, you want to cancel your reservation with id: ${bookingid};`);
        if(!confirmation) return;
    
        // Αίτημα για την ακύρωση της κράτησης με DELETE
        fetch(`http://localhost:3000/reservations/${bookingid}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })

            .then(response => {
                if (!response.ok) {
                    throw new Error("Αποτυχία διαγραφής κράτησης.");
                }
                return response.json();
            })
            .then(_data => {
                alert("Η κράτηση διαγράφηκε με επιτυχία!");
            })
        .catch(error => {
            console.error('Σφάλμα:', error);
            alert(error.message || 'Κάτι πήγε στραβά, παρακαλώ δοκιμάστε ξανά.');
        });
    });
    
    
    
    

});
