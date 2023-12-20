

document.addEventListener('DOMContentLoaded', function () {
    const logoutLink = document.getElementById('logoutLink');

    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();

        logoutAdmin();
    });

    function logoutAdmin() {
        sessionStorage.removeItem('currentAdmin');

        window.location.href = 'index.html'; 
    }
});

var products = [
    {
        id: 1,
        name: "Product 1",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgAHKuWG10Z5LcTBajDzU0Et-bYN5Sb4HHhA&usqp=CAU",
        category: "chairs",
        price: 19.99,
        description: "This is a a comfy chair.",
        quantity: 10
    },
    {
        id: 2,
        name: "Product 2",
        image: "https://i.ebayimg.com/images/g/Xi4AAOSwWdZZY5TL/s-l1600.jpg",
        category: "chairs",
        price: 19.99,
        description: "This is a a comfy chair.",
        quantity: 10
    },
    {
        id: 3,
        name: " Product 3",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCLjBx_M0_nUe2pneLw2BLEB3XhMXUPk4BLQ&usqp=CAU",
        category: "chairs",
        price: 19.99,
        description: "This is a a comfy chair.",
        quantity: 10
    },
    {
        id: 4,
        name: "Product 4",
        image: "https://indiannest.in/cdn/shop/files/Screenshot-2023_1029_161106.png?v=1698576757&width=600",
        category: "sofa",
        price: 19.99,
        description: "This is  a comfy sofa.",
        quantity: 10
    },
    {
        id: 5,
        name: "Product 5",
        image: "https://image.made-in-china.com/318f0j00oTYGgtJzqhcC/5%E6%9C%8812%E6%97%A5%281%29.mp4.webp",
        category: "sofa",
        price: 19.99,
        description: "This is  a comfy sofa.",
        quantity: 10
    },
    {
        id: 6,
        name: "Product 6",
        image: "https://housing.com/news/wp-content/uploads/2022/11/shutterstock_796331242-1.jpg",
        category: "sofa",
        price: 29.99,
        description: "This is  a comfy sofa.",
        quantity: 5
    },
];

localStorage.setItem('products', JSON.stringify(products));

function showAddProductForm() {
    document.getElementById('add-product-form').style.display = 'block';
}

function hideAddProductForm() {
    document.getElementById('add-product-form').style.display = 'none';
}

function addProduct() {
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').value;
    const productCategory = document.getElementById('productCategory').value;
    const productPrice = parseFloat(document.getElementById('productPrice').value);
    const productDescription = document.getElementById('productDescription').value;
    const productQuantity = parseInt(document.getElementById('productQuantity').value);

    const newProduct = {
        id: products.length + 1,
        name: productName,
        image: productImage,
        category: productCategory,
        price: productPrice,
        description: productDescription,
        quantity: productQuantity
    };

    products.push(newProduct);

    document.getElementById('product-form').reset();

    localStorage.setItem('products', JSON.stringify(products));

    displayProducts();
}

function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = ''; 
    products.forEach(product => {
        const row = document.createElement('tr');
        row.classList.add('product-item'); 

        const imageCell = document.createElement('td');
        const imageElement = document.createElement('img');
        imageElement.src = product.image;
        imageElement.alt = product.name; 
        imageElement.style.maxWidth = '100px'; 
        imageElement.style.display = 'block'; 
        imageElement.style.margin = '0 auto';
        imageCell.appendChild(imageElement);

        const idCell = document.createElement('td');
        idCell.textContent = product.id;

        const nameCell = document.createElement('td');
        nameCell.textContent = product.name;

        const categoryCell = document.createElement('td');
        categoryCell.textContent = product.category;

        const priceCell = document.createElement('td');
        priceCell.textContent = product.price;

        const descriptionCell = document.createElement('td');
        descriptionCell.textContent = product.description;

        const quantityCell = document.createElement('td');
        quantityCell.textContent = product.quantity;

        const editCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => editProduct(product.id));
        editCell.appendChild(editButton);

        const deleteCell = document.createElement('td');
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteProduct(product.id));
        deleteCell.appendChild(deleteButton);

        row.appendChild(imageCell);
        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(categoryCell);
        row.appendChild(priceCell);
        row.appendChild(descriptionCell);
        row.appendChild(quantityCell);
        row.appendChild(editCell);
        row.appendChild(deleteCell);

        productList.appendChild(row);
    });
}


function editProduct(productId) {
    const productToEdit = products.find(product => product.id === productId);

    showEditProductForm(productToEdit);
}

function showEditProductForm(product) {
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductImage').value = product.image;
    document.getElementById('editProductCategory').value = product.category;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductDescription').value = product.description;
    document.getElementById('editProductQuantity').value = product.quantity;

    document.getElementById('edit-product-form').style.display = 'block';

    document.getElementById('saveChangesButton').addEventListener('click', function() {
        saveChanges(product.id);
    });
}

function saveChanges(productId) {
    const index = products.findIndex(product => product.id === productId);

    products[index].name = document.getElementById('editProductName').value;
    products[index].image = document.getElementById('editProductImage').value;
    products[index].category = document.getElementById('editProductCategory').value;
    products[index].price = parseFloat(document.getElementById('editProductPrice').value);
    products[index].description = document.getElementById('editProductDescription').value;
    products[index].quantity = parseInt(document.getElementById('editProductQuantity').value);

    document.getElementById('edit-product-form').style.display = 'none';

    localStorage.setItem('products', JSON.stringify(products));

    displayProducts();
}
function hideEditProductForm() {
    document.getElementById('edit-product-form').style.display = 'none';
}


function deleteProduct(productId) {
    const index = products.findIndex(product => product.id === productId);

    products.splice(index, 1);

    localStorage.setItem('products', JSON.stringify(products));

    displayProducts();
}

displayProducts();