
const itemForm = document.getElementById("itemForm");
const itemsContainer = document.getElementById("itemsContainer");
let items = JSON.parse(localStorage.getItem("lostFoundItems")) || [];
function renderItems(data = items) {
    itemsContainer.innerHTML = "";
    if (data.length === 0) {
        itemsContainer.innerHTML = `
            <div class="empty">
                <h3>No items available.</h3>
                <p>Add your first Lost or Found item.</p>
            </div>`;
        return;
    }
    data.forEach((item, index) => {
        itemsContainer.innerHTML += `
        <div class="item fade">
        <img src="${item.image}" alt="Item Image">
        <div class="itemContent">
        <span class="badge ${item.type.toLowerCase()}"> ${item.type} </span>
        <h3>${item.name}</h3>
        <p><b>Category:</b> ${item.category}</p>
        <p><b>Location:</b> ${item.location}</p>
        <p><b>Owner:</b> ${item.owner}</p>
        <p><b>Contact:</b> ${item.contact}</p>
        <button class="contactBtn" onclick="contactOwner('${item.contact}')"> Contact Owner </button>
        <button class="deleteBtn" onclick="deleteItem(${index})"> Delete </button>
        </div>
        </div>`;
    });
}
itemForm.addEventListener("submit", function(e){
    e.preventDefault();
    const name =document.getElementById("itemName").value;
    const type =document.getElementById("itemType").value;
    const category =document.getElementById("category").value;
    const location =document.getElementById("location").value;
    const owner =document.getElementById("owner").value;
    const contact =document.getElementById("contact").value;
    const imageInput =document.getElementById("image");
    const defaultImage ="https://via.placeholder.com/400x250?text=No+Image";

    if(imageInput.files.length>0){
        const reader = new FileReader();
        reader.onload = function(){
            const item = {name, type, category, location, owner,contact, image:reader.result };
            items.push(item);
            saveItems();
            renderItems();
            itemForm.reset();

        };
        reader.readAsDataURL(imageInput.files[0]);
    }
    else{
        const item = {name, type, category, location, owner, contact, image:defaultImage};
        items.push(item);
         saveItems();
         renderItems();
         itemForm.reset();
        }
});
function saveItems(){
    localStorage.setItem("lostFoundItems", JSON.stringify(items));

}
function deleteItem(index){
    if(confirm("Delete this item?")){items.splice(index,1);saveItems();renderItems();}

}
function contactOwner(contact){
    alert("Contact Owner:\n\n"+contact);
}
renderItems();
const wasteType = document.getElementById("wasteType");
const tip = document.getElementById("tip");
const recyclingTips = {
    Plastic: "♻ Clean plastic bottles and containers before recycling. Avoid mixing them with food waste.",
    Paper: "📄 Keep paper dry and free from oil or food stains. Fold cardboard boxes to save space.",
    Glass: "🍾 Separate glass by color if possible. Rinse bottles and jars before recycling.",
    Metal: "🥫 Wash metal cans and remove any food residue. Crush cans to save storage space.",
    Organic: "🌿 Convert kitchen waste into compost to create natural fertilizer for plants."
};
wasteType.addEventListener("change", function () {
    tip.innerHTML = recyclingTips[this.value];
});
const searchInput = document.getElementById("search");
if(searchInput){
    searchInput.addEventListener("keyup", function(){
        const value = this.value.toLowerCase();
        const filtered = items.filter(item => item.name.toLowerCase().includes(value) || item.category.toLowerCase().includes(value) ||item.location.toLowerCase().includes(value));
        renderItems(filtered);
    });
}
const filterCategory = document.getElementById("filterCategory");
if(filterCategory){
    filterCategory.addEventListener("change", function(){
        if(this.value === "All"){
            renderItems();
            return;
        }
        const filtered = items.filter(item => item.category === this.value);
        renderItems(filtered);
    });
}
function contactOwner(contact){
    if(contact.trim() === ""){
        alert("No contact information available.");
        return;
    }
    alert(`Owner Contact ${contact}Please contact the owner politely.`);
}
const darkBtn = document.getElementById("darkBtn");
if(localStorage.getItem("darkMode") === "true"){
    document.body.classList.add("dark");
    darkBtn.innerHTML = "☀";
}
darkBtn.addEventListener("click",()=>{
   document.body.classList.toggle("dark");
   const isDark =document.body.classList.contains("dark");
   localStorage.setItem("darkMode",isDark);
    darkBtn.innerHTML = isDark ? "☀" : "🌙";
});
console.log("EcoConnect Loaded Successfully 🌱");