var nameInput = document.getElementById("nameinput");
var phoneInput = document.getElementById("phoneinput");
var emailInput = document.getElementById("emailinput");
var addressInput = document.getElementById("addressinput");
var groupSelect = document.getElementById("groupselect");
var notesTextarea = document.getElementById("notestextarea");

var cardsRow = document.getElementById("cardsRow"); 
var arrayProducts = [];
var globalIndex = -1; 

if (localStorage.getItem("myContacts") != null) {
    arrayProducts = JSON.parse(localStorage.getItem("myContacts"));
    displayProducts(); 
}

function addProduct() {
    console.log("Button clicked");
    
    var isFavoriteChecked = document.getElementById("favCheck").checked;
    var isEmergencyChecked = document.getElementById("emergencyCheck").checked;

    if (nameInput.value.trim() === "" || phoneInput.value.trim() === "") {
        alert("Please enter Full Name and Phone Number!");
        return;
    }

    var product = {
        name: nameInput.value,
        phone: phoneInput.value,
        email: emailInput.value,
        address: addressInput.value,
        group: groupSelect.value,
        notes: notesTextarea.value,
        isFavorite: isFavoriteChecked,      
        isEmergency: isEmergencyChecked     
    };

    if (globalIndex == -1) {
        arrayProducts.push(product);
        alert("Added Successfully! 🎉"); 
    } else {
        arrayProducts[globalIndex] = product;
        alert("Updated Successfully! ✨"); 
        
        document.querySelector(".thunderRocket").innerHTML = "Save Contact";
        globalIndex = -1; 
    }

    localStorage.setItem("myContacts", JSON.stringify(arrayProducts));
    
    displayProducts();
    clearInputs(); 
    
    var modalElement = document.getElementById('wormhole_77');
    var modalInstance = bootstrap.Modal.getInstance(modalElement);
    if(modalInstance) modalInstance.hide();
}

function displayProducts() {
    var cardCartona = "";
    var favoriteCartona = "";
    var emergencyCartona = "";

    var totalFavoritesCount = 0;
    var totalEmergencyCount = 0;

    for (var i = 0; i < arrayProducts.length; i++) {
        var { name, phone, email, address, isFavorite, isEmergency, group } = arrayProducts[i];
        var firstLetter = name ? name.charAt(0).toUpperCase() : "U";

        if (isFavorite) { totalFavoritesCount++; }
        if (isEmergency) { totalEmergencyCount++; }

        cardCartona += `
        <div class="col-12 col-md-6 mb-3">
          <div class="card p-3">
            <div class="card-content d-flex align-items-center justify-content-start">
              <div class="img-container me-3">
                <div class="img bg-blue">${firstLetter}</div>
                <div class="emergency-badge d-flex align-items-center justify-content-center text-white">
                  <i class="fa-solid ${isEmergency ? 'fa-heart-pulse' : (isFavorite ? 'fa-star text-warning' : 'fa-user')}"></i>
                </div>
              </div>
              <div class="cont">
                <h5>${name}</h5>
                <div class="icon-tel d-flex align-items-center justify-content-center">
                  <span class="tel d-flex justify-content-center align-items-center me-2"><i class="fa-solid fa-phone"></i></span>
                  <p class="m-0 text-bensel">${phone}</p>
                </div>
              </div>
            </div>

            <div class="email-tel d-flex justify-content-start my-2">
              <div class="email-icon d-flex align-items-center justify-content-center me-2 bg-yellow">
                <i class="fa-solid fa-envelope text-mov"></i>
              </div>
              <p class="m-0 text-bensel">${email || 'No Email'}</p>
            </div>

            <div class="location-tel d-flex justify-content-start my-2">
              <div class="email-icon d-flex align-items-center justify-content-center me-2 bg-green">
                <i class="fa-solid fa-location-dot text-green"></i>
              </div>
              <p class="m-0 text-bensel">${address || 'No Address'}</p>
            </div>

            <div class="d-flex justify-content-start align-items-center my-2">
              <div class="f-emergen d-flex align-items-center justify-content-center me-2 bg-bluer text-bluer me-4">${group || 'Other'}</div>
              ${isEmergency ? `<p class="m-0 text-bensel text-danger p-f"><i class="fa-solid fa-heart-pulse"></i> Emergency</p>` : ''}
            </div>

            <div class="card-footer-actions d-flex align-items-center pt-2 mt-3" style="border-top: 1px solid #fafbfc">
              <div class="left-actions d-flex align-items-center">
                <button class="btn-action bg-light-green text-success me-2 icon1-hover"><i class="fa-solid fa-phone"></i></button>
                <button class="btn-action bg-light-purple text-primary icon2-hover"><i class="fa-solid fa-envelope"></i></button>
              </div>
              <div class="right-actions d-flex align-items-center ms-auto">
                <button class="btn-icon me-3 icon3-hover rounded-1 ${isFavorite ? 'text-warning' : 'text-muted'}"><i class="fa-solid fa-star"></i></button>
                <button onclick="patchProduct(${i})" class="btn-icon text-muted me-3 icon5-hover rounded-2 p-1"><i class="fa-regular fa-pen-to-square"></i></button>
                <button onclick="deleteProduct(${i})" class="btn-icon text-muted icon6-hover p-1 rounded-1"><i class="fa-regular fa-trash-can"></i></button>
              </div>
            </div>
          </div>
        </div>`;

        if (isFavorite) {
            favoriteCartona += `
            <div class="favorite-contact d-flex align-items-center justify-content-center mb-2">
              <div class="side-contact-card d-flex align-items-center justify-content-between p-3 rounded-4 w-100">
                <div class="d-flex align-items-center">
                  <div class="avatar-initials d-flex align-items-center justify-content-center text-white fw-bold me-3">${firstLetter}</div>
                  <div class="contact-info">
                    <h5 class="mb-0 fw-bold text-dark fs-6 text-uppercase">${name}</h5>
                    <span class="text-muted small">${phone}</span>
                  </div>
                </div>
              </div>
            </div>`;
        }

        if (isEmergency) {
            emergencyCartona += `
            <div class="emergency-contact d-flex align-items-center justify-content-center mb-2">
              <div class="emergency-side-card d-flex align-items-center justify-content-between p-3 rounded-4 w-100">
                <div class="d-flex align-items-center">
                  <div class="avatar-blue-box d-flex align-items-center justify-content-center text-white fw-bold me-3">${firstLetter}</div>
                  <div class="contact-meta">
                    <h5 class="mb-0 fw-bold text-dark fs-6 text-lowercase">${name}</h5>
                    <span class="text-muted small">${phone}</span>
                  </div>
                </div>
              </div>
            </div>`;
        }
    }

    cardsRow.innerHTML = cardCartona;
    
    var favContainer = document.getElementById("favoriteContacts");
    if(favContainer) favContainer.innerHTML = favoriteCartona;
    
    var emergContainer = document.getElementById("emergencyContacts");
    if(emergContainer) emergContainer.innerHTML = emergencyCartona;

    var counters = document.querySelectorAll(".tot-cont span");
    if (counters.length >= 3) {
        counters[0].innerHTML = arrayProducts.length;       
        counters[1].innerHTML = totalFavoritesCount;      
        counters[2].innerHTML = totalEmergencyCount;      
    }
}

function deleteProduct(index) {
    var userConfirm = confirm("Are you sure you want to delete this contact? 🤔");
    
    if (userConfirm == true) {
        arrayProducts.splice(index, 1);
        localStorage.setItem("myContacts", JSON.stringify(arrayProducts));
        displayProducts();
        alert("Deleted Successfully! 🗑️");
    }
}

function patchProduct(index) {
    nameInput.value = arrayProducts[index].name;
    phoneInput.value = arrayProducts[index].phone;
    emailInput.value = arrayProducts[index].email;
    addressInput.value = arrayProducts[index].address;
    groupSelect.value = arrayProducts[index].group;
    notesTextarea.value = arrayProducts[index].notes;
    document.getElementById("favCheck").checked = arrayProducts[index].isFavorite;
    document.getElementById("emergencyCheck").checked = arrayProducts[index].isEmergency;

    document.querySelector(".thunderRocket").innerHTML = "Update Contact";

    var modalElement = document.getElementById('wormhole_77');
    var modalInstance = new bootstrap.Modal(modalElement);
    modalInstance.show();

    globalIndex = index;
}

function clearInputs() {
    nameInput.value = "";
    phoneInput.value = "";
    emailInput.value = "";
    addressInput.value = "";
    notesTextarea.value = "";
    groupSelect.selectedIndex = 0;
    document.getElementById("favCheck").checked = false;
    document.getElementById("emergencyCheck").checked = false;
}