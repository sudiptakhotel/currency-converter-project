//currency API base url

const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies"

const button = document.querySelector("button");
//selecting 2 <select>
const dropdown = document.querySelectorAll(".dropdown select")

let message = document.querySelector(".message");

let fromCurr = document.querySelector(".from select");
let toCurr = document.querySelector(".to select");
//will add all the currency code from countryList{} to option of the select
for(let select of dropdown){
    for (const currCode in countryList) {
        const newOption = document.createElement("option");
        newOption.innerHTML = `${currCode}`;
        newOption.value = `${currCode}`;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected = "selected";
        } else if(select.name === "to" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);

      
    }
    select.addEventListener("change" , (e)=>{
        updateFlag(e.target);
    })

}
function updateFlag(element){
    let currencyCode = element.value;
    let coountryName = countryList[currencyCode];
    //console.log(coountryName);
    let imgSourceLink = `https://flagsapi.com/${coountryName}/flat/64.png`

    let img = element.parentElement.querySelector("img");
    img.src = imgSourceLink;
}

//addEventListner to button
button.addEventListener("click" , async (e)=>{
    e.preventDefault();
    let amount = document.querySelector(".amount input");
    let amountVal = amount.value;
    


    if(amountVal == " " || amountVal<1){
        amountVal = "1";
    }
    let url = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`
    
    let raw_data = await fetch(url);
    
    
    
    let converted_value = await raw_data.json();
    console.log(converted_value);
    let converted_country = toCurr.value.toLowerCase();
    console.log(converted_country);
     let value = converted_value[`${converted_country}`];
     console.log(value);

     let result = Number(amountVal) * value;
     message.innerHTML = `${amountVal} ${fromCurr.value} = ${result} ${toCurr.value}`
   
    
})

