// script.js

// DELIVERIES API CALLS
function fetchDeliveries() {
    fetch('/api/deliveries')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('deliveryList');
            list.innerHTML = '';
            data.forEach(delivery => {
                const item = document.createElement('li');
                item.textContent = `ID: ${delivery.id}, Food Item ID: ${delivery.food_item_id}, Beneficiary ID: ${delivery.beneficiary_id}, Delivery Date: ${delivery.delivery_date}`;
                list.appendChild(item);
            });
        });
}

document.getElementById('deliveryForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = {
        food_item_id: document.getElementById('deliveryFoodItemId').value,
        beneficiary_id: document.getElementById('deliveryBeneficiaryId').value,
        distribution_center_id: document.getElementById('deliveryCenterId').value,
        delivery_date: document.getElementById('deliveryDate').value
    };
    fetch('/api/deliveries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(() => fetchDeliveries());
};

// VOLUNTEERS API CALLS
function fetchVolunteers() {
    fetch('/api/volunteers')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('volunteerList');
            list.innerHTML = '';
            data.forEach(volunteer => {
                const item = document.createElement('li');
                item.textContent = `ID: ${volunteer.id}, Name: ${volunteer.name}, Role: ${volunteer.role}`;
                list.appendChild(item);
            });
        });
}

document.getElementById('volunteerForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('volunteerName').value,
        contact_info: document.getElementById('volunteerContact').value,
        role: document.getElementById('volunteerRole').value
    };
    fetch('/api/volunteers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(() => fetchVolunteers());
};

// FOOD REQUESTS API CALLS
function fetchFoodRequests() {
    fetch('/api/food-requests')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('foodRequestList');
            list.innerHTML = '';
            data.forEach(request => {
                const item = document.createElement('li');
                item.textContent = `ID: ${request.id}, Beneficiary ID: ${request.beneficiary_id}, Food Item ID: ${request.food_item_id}, Quantity: ${request.quantity}, Request Date: ${request.request_date}`;
                list.appendChild(item);
            });
        });
}

document.getElementById('foodRequestForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = {
        beneficiary_id: document.getElementById('requestBeneficiaryId').value,
        food_item_id: document.getElementById('requestFoodItemId').value,
        quantity: document.getElementById('requestQuantity').value,
        request_date: document.getElementById('requestDate').value
    };
    fetch('/api/food-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(() => fetchFoodRequests());
};

// COMMUNITY GARDENS API CALLS
function fetchCommunityGardens() {
    fetch('/api/community-gardens')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('gardenList');
            list.innerHTML = '';
            data.forEach(garden => {
                const item = document.createElement('li');
                item.textContent = `ID: ${garden.id}, Name: ${garden.name}, Location: ${garden.location}, Capacity: ${garden.capacity}`;
                list.appendChild(item);
            });
        });
}

document.getElementById('gardenForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('gardenName').value,
        location: document.getElementById('gardenLocation').value,
        capacity: document.getElementById('gardenCapacity').value
    };
    fetch('/api/community-gardens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(() => fetchCommunityGardens());
};


// script.js

// BENEFICIARY API CALLS
function fetchBeneficiaries() {
    fetch('/api/beneficiaries')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('beneficiaryList');
            list.innerHTML = '';
            data.forEach(beneficiary => {
                const item = document.createElement('li');
                item.textContent = `ID: ${beneficiary.id}, Name: ${beneficiary.name}, Contact Info: ${beneficiary.contact_info}`;
                list.appendChild(item);
            });
        });
}

document.getElementById('beneficiaryForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('beneficiaryName').value,
        contact_info: document.getElementById('beneficiaryContact').value
    };
    fetch('/api/beneficiaries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(() => fetchBeneficiaries());
};

// DISTRIBUTION CENTER API CALLS
function fetchDistributionCenters() {
    fetch('/api/distribution-centers')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('distributionCenterList');
            list.innerHTML = '';
            data.forEach(center => {
                const item = document.createElement('li');
                item.textContent = `ID: ${center.id}, Name: ${center.name}, Location: ${center.location}`;
                list.appendChild(item);
            });
        });
}

document.getElementById('distributionCenterForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('centerName').value,
        location: document.getElementById('centerLocation').value
    };
    fetch('/api/distribution-centers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(() => fetchDistributionCenters());
};

// DONOR API CALLS
function fetchDonors() {
    fetch('/api/donors')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('donorList');
            list.innerHTML = '';
            data.forEach(donor => {
                const item = document.createElement('li');
                item.textContent = `ID: ${donor.id}, Name: ${donor.name}, Contact Info: ${donor.contact_info}`;
                list.appendChild(item);
            });
        });
}

document.getElementById('donorForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('donorName').value,
        contact_info: document.getElementById('donorContact').value
    };
    fetch('/api/donors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(() => fetchDonors());
};

// FOOD INVENTORY API CALLS
function fetchFoodInventory() {
    fetch('/api/food-inventory')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('foodInventoryList');
            list.innerHTML = '';
            data.forEach(item => {
                const listItem = document.createElement('li');
                listItem.textContent = `ID: ${item.id}, Name: ${item.name}, Quantity: ${item.quantity}`;
                list.appendChild(listItem);
            });
        });
}

document.getElementById('foodInventoryForm').onsubmit = function (e) {
    e.preventDefault();
    const formData = {
        name: document.getElementById('foodItemName').value,
        quantity: document.getElementById('quantity').value
    };
    fetch('/api/food-inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    }).then(() => fetchFoodInventory());
};
