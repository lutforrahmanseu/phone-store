const loadPhone=async(searchText,dataLimit)=>{
    const url=`https://openapi.programming-hero.com/api/phones?search=${searchText}`;
   const res=await fetch(url);
   const data=await res.json();
    displayPhones(data.data,dataLimit);
}


const displayPhones=(phones,dataLimit)=>{
   const phoneContainer= document.getElementById('phone-container');
   phoneContainer.innerText='';


   //display 10 phones only
   const showAll= document.getElementById('show-all');
   if(dataLimit && phones.length>10){
    phones=phones.slice(0,9);
   showAll.classList.remove('d-none');
   }
   else{
    showAll.classList.add('d-none');
   }
   
   //display no phone
   const noPhone=document.getElementById('no-found');
   if(phones.length===0){
    noPhone.classList.remove('d-none');
   }
   else{
    noPhone.classList.add('d-none');
   }
   //display all phone
   phones.forEach(phone=> {
    const phoneDiv=document.createElement('div');
    phoneDiv.classList.add('col');
    phoneDiv.innerHTML=`<div class="card">
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body text-center">
      <h5 class="card-title">${phone.phone_name}</h5>
      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
      <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Details</button>
    </div>`;
    phoneContainer.appendChild(phoneDiv);
   });
   //stop spinner loader
   toggleSpinner(false)

  

}
//processSearch
const processSearch=(dataLimit)=>{
     //start loader
     toggleSpinner(true);
     //search field
     const searchField=document.getElementById('search-field');
     //search value
     const searchText=searchField.value;
     loadPhone(searchText,dataLimit);
}

//handle search button click
document.getElementById('btn-search').addEventListener('click',function(){
    processSearch(10);
})


//search input field enter key handler
document.getElementById('search-field').addEventListener('keypress',function(e){
    if(e.key==='Enter'){
        processSearch(10);
    }
})

const toggleSpinner=isLoading=>{
    const loaderSection=document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}
//not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
processSearch();
})

//loadPhoneDetails
const loadPhoneDetails=async(id)=>{
    const url=`https://openapi.programming-hero.com/api/phone/${id}`;
    const res=await fetch(url);
    const data=await res.json();
    displayPhoneDetails(data.data)


}
const displayPhoneDetails=(phoneDetails)=>{
  const modalTitle=document.getElementById('phoneDetailModalLabel');
  modalTitle.innerText=phoneDetails.name;
  const phoneName=document.getElementById('phone-details')
  phoneName.innerHTML=`
  <p>Release Date:${phoneDetails.releaseDate?phoneDetails.releaseDate:'No release date found'}</p>
  <p>Storage:${phoneDetails.mainFeatures.storage?phoneDetails.mainFeatures.storage:'No Features'}</P>
  <p>Sensor:${phoneDetails.mainFeatures.sensors?phoneDetails.mainFeatures.sensors[0]:'No sensor'}</p>
  <p>Others:${phoneDetails.others.Bluetooth?phoneDetails.others.Bluetooth:'No Bluetooth'}</P>`
}
loadPhone('apple')