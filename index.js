function handleFormSubmit(event) {
    event.preventDefault();




    const ProductDetails = {
        name: event.target.name.value,
        email: event.target.email.value,
        Phone: event.target.phone.value,
        Busnumber: event.target.number.value


    };
    axios
        .post(
            "https://crudcrud.com/api/ce677e11e0c4454fb13b8e313877eec6/items",
            ProductDetails)

        .then((response) => {

            displayUserOnScreen(response.data)

        })
        .catch((err) => {
            console.log(err)
        })

    function displayUserOnScreen(user) {
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("number").value = "";



        const parentNode = document.getElementById('listofreg');

        const childHTML = `<li id = "${user._id}">${user.name}-${user.email}-${user.Phone}-${user.Busnumber}
                           <button class="delete" class="delete" data-id="${user._id}" >Delete</button>
                           <button onclick="EditUser('${user.name},${user.email},${user.Phone},${user.Busnumber})">EDIT</button>
                           
                           </li >

            `

        parentNode.innerHTML = parentNode.innerHTML + childHTML;

        document.getElementById('listofreg').addEventListener('click', function (event) {
            if (event.target && event.target.classList.contains('delete')) {
                const id = event.target.dataset.id;
                DeleteUser(id);
            }
        });

        document.getElementById('listofreg').addEventListener('click', function (event) {
            if (event.target && event.target.classList.contains('edit')) {
                const id = event.target.dataset.id;
                EditUser(id);
            }
        });



        function DeleteUser(id) {

            axios.delete(`https://crudcrud.com/api/ce677e11e0c4454fb13b8e313877eec6/items/${id}`)
                .then((response) => {
                    console.log(response)
                    removeUserfromScreen(id)
                }).catch((err) => {
                    console.log(err)
                })

        }

        function removeUserfromScreen(id) {
            const parentNoden = document.getElementById("listofreg")
            const chile = document.getElementById(id)
            if (chile) {
                parentNoden.removeChild(chile)

            }
        }
        function EditUser(id) {
            document.getElementById("name").value = name;
            document.getElementById("email").value = email;
            document.getElementById("phone").value = phone;
            document.getElementById("number").value = number;

            DeleteUser(email)

        }





    }

}
document.addEventListener('DOMContentLoaded', () => {
    axios.get("https://crudcrud.com/api/ce677e11e0c4454fb13b8e313877eec6/items")


        .then((response) => {
            console.log(response)
            displayUserOnScreen(response.data)

        }).catch((err) => {
            console.log(err)

        })

    document.getElementById('filter').addEventListener('click', function (event) {
        if (event.target && event.target.classList.contains('filter')) {
            filterItems()


        }
    });
})

document.addEventListener('DOMContentLoaded', function () {
    const filterInput = document.getElementById('action');
    const itemsList = document.getElementById('listofreg').getElementsByTagName('ul');

    function filterItems() {
        const filterValue = filterInput.value.toLowerCase();

        // Loop through all list items
        for (let i = 0; i < itemsList.length; i++) {
            const currentItem = itemsList[i];
            const itemText = currentItem.textContent.toLowerCase();

            // Check if the item matches the filter value
            if (itemText.includes(filterValue)) {
                currentItem.style.display = 'block'; // Show the item
            } else {
                currentItem.style.display = 'none'; // Hide the item
            }
        }
    }

    // Attach event listener to the filter input
    filterInput.addEventListener('input', filterItems);
});
















// Clearing the input fields













