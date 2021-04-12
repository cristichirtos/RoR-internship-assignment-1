function loadElements() {
    const elementList = JSON.parse(localStorage.getItem('elements') || "[]");
    if (elementList != null && elementList.length > 0) {
        console.log("loading from local storage");
        loadElementsInPage(elementList);
    } else {
        console.log("loading from code");
        createBaseElements();
    }
}

function loadElementsInPage(elements) {
    removeAllChildNodes(document.getElementById("container"));
    elements.forEach(function (element) {
        loadElementInHTML(element);
    });
}

function loadElementInHTML(element) {
    let containerParent = document.getElementById("container");
    let dishDiv = document.createElement("div");
    dishDiv.className = "dish";
    let image = document.createElement("img");
    image.className = "food-img";
    image.src = element.imageUrl;
    let infoDiv = document.createElement("div");
    infoDiv.className = "info";
    let dishName = document.createElement("p");
    let dishCategory = document.createElement("p");
    let dishPrice = document.createElement("p");
    dishName.className = "dishName";
    dishName.innerHTML = element.dishName;
    dishCategory.className = "category";
    dishCategory.innerHTML = element.category;
    dishPrice.className = "price";
    dishPrice.innerHTML = element.price;
    containerParent.appendChild(dishDiv);
    dishDiv.appendChild(image);
    dishDiv.appendChild(infoDiv);
    infoDiv.appendChild(dishName);
    infoDiv.appendChild(dishCategory);
    infoDiv.appendChild(dishPrice);
}

function createBaseElements() {
    let elements = [
        {
            "imageUrl": "https://www.bigbelly-cluj.ro/filehandler/ProductFirstFile/600x600/paste-carbonara-42.jpg?v=637391397494290969",
            "dishName": "Pasta Carbonara",
            "category": "Pasta",
            "price": "$9.00"
        },
        {
            "imageUrl": "https://www.bigbelly-cluj.ro/filehandler/ProductFirstFile/600x600/pizza-hawaii-47.jpg?v=637043206747292679",
            "dishName": "Pizza Hawaii",
            "category": "Pizza",
            "price": "$13.00"
        },
        {
            "imageUrl": "https://www.bigbelly-cluj.ro/filehandler/ProductFirstFile/600x600/paste-bolognese-97.jpg?v=637456158285163886",
            "dishName": "Pasta Bolognese",
            "category": "Pasta",
            "price": "$15.00"
        },
        {
            "imageUrl": "https://www.bigbelly-cluj.ro/filehandler/ProductFirstFile/600x600/paste-primavera-347.jpg?v=637391397732841894",
            "dishName": "Pasta With Walnut",
            "category": "Pasta",
            "price": "$25.00"
        },
        {
            "imageUrl": "https://www.bigbelly-cluj.ro/filehandler/ProductFirstFile/600x600/pizza-diavolo-46.jpg?v=637043206103179490",
            "dishName": "Pizza Salami",
            "category": "Pizza",
            "price": "$12.00"
        },
        {
            "imageUrl": "https://www.bigbelly-cluj.ro/filehandler/ProductFirstFile/600x600/paste-polo-e-funghi-96.jpg?v=637391398051543723",
            "dishName": "Pizza Simple",
            "category": "Pizza",
            "price": "$9.50"
        },
        {
            "imageUrl": "https://www.bigbelly-cluj.ro/filehandler/ProductFirstFile/600x600/supa-crema-de-legume-cu-pui-388.jpg?v=637490039413416946",
            "dishName": "Creme Soup",
            "category": "Entrees",
            "price": "$8.00"
        },
        {
            "imageUrl": "https://www.bigbelly-cluj.ro/filehandler/ProductFirstFile/600x600/paste-polo-e-funghi-96.jpg?v=637391398051543723",
            "dishName": "Pasta Funghi",
            "category": "Pasta",
            "price": "$15.00"
        }
    ]
    uploadToLocalStorage(elements);
    loadElementsInPage(elements);
}

function onDashboardButtonPresssed() {
    let formElement = document.getElementById("dashboardForm");
    if (formElement.style.display == "none" || formElement.style.display == "") {
        formElement.style.display = "block";
    } else {
        formElement.style.display = "none";
    }
}

function uploadToLocalStorage(elements) {
    console.log(JSON.stringify(elements));
    localStorage.setItem("elements", JSON.stringify(elements));
}

function onDeleteButtonPressed() {
    const indexToDelete = document.dashboardForm.index.value;
    const elementList = JSON.parse(localStorage.getItem('elements') || "[]");
    if (elementList == null || indexToDelete >= elementList.length) {
        alert("Invalid index.");
    } else {
        elementList.splice(indexToDelete, 1);
        uploadToLocalStorage(elementList);
        loadElementsInPage(elementList);
    }
}

function onAddDishButtonPressed() {
    const url = document.dashboardForm.imageurl.value;
    const name = document.dashboardForm.name.value;
    const category = document.dashboardForm.category.value;
    const price = document.dashboardForm.price.value;
    addNewElementToStorage({
        "imageUrl": url,
        "dishName": name,
        "category": category,
        "price": price
    });
}

function addNewElementToStorage(element) {
    const elementList = JSON.parse(localStorage.getItem('elements') || "[]");
    elementList.push(element);
    uploadToLocalStorage(elementList);
    loadElementInHTML(element);
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}