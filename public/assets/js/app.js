console.log('javascript is loaded')





const weatherForm = document.querySelector("form")
const result = document.querySelector('#result')
const lbllocation = document.querySelector('#address')

weatherForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    result.innerHTML =''
    lbllocation.innerHTML =''
    const address = document.querySelector("#search-input").value
    fetch('/weather?address=' + address)
    .then((respone) =>{
        
        respone.json().then( (data) =>{
            if(data.error){
                result.innerHTML = data.error
            }else{
                lbllocation.innerHTML = "Weather in " + data.name + " :"
                const str = data.descriptions + ' It is currently '+data.temperature+'. But it feels like '+data.feelslike +' Humidity is '+data.temperature
                result.innerHTML = JSON.stringify(data)
            }
        })
    })
    .catch((err) =>{
        console.log(err)
    })

})