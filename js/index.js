


document.addEventListener('DOMContentLoaded', () => {

    const createMonster = document.querySelector('#create-monster')
    const monsterForm = document.createElement('form')
    monsterForm.setAttribute('id', 'monster-form')
    createMonster.append(monsterForm)
    const InputOne = document.createElement('input')
    const inputTwo = document.createElement('input')  
    const inputThree = document.createElement('input') 
    InputOne.setAttribute('id','name')
    inputTwo.setAttribute('id','age')
    inputThree.setAttribute('id','description')
    
    InputOne.setAttribute('placeholder','name...')
    inputTwo.setAttribute('placeholder','age...')
    inputThree.setAttribute('placeholder','description...')

    const form = document.querySelector('#monster-form')

   form.append(InputOne)
   form.append(inputTwo)
   form.append(inputThree)
     

  const createBtn = document.createElement('button')
  createBtn.innerHTML ='Create'
  form.append(createBtn)

  const monsterContainer = document.querySelector('#monster-container')


 let page = 1
  getMonsters()     
 
  function getMonsters(){
    fetch ('http://localhost:3000/monsters'+ `?_limit=50&_page=${page}`)
    .then (resp => resp.json())
    .then( data =>{ 
        monsterContainer.innerHTML = ''
        renderMonsters (data)})
        
         
      function renderMonsters(data){ 
        // console.log(data)
                const div = document.createElement('div') 
                monsterContainer.append(div)
                           
                 data.forEach(data =>{
                   const h2 = document.createElement('h2')
                   const h4 = document.createElement('h4')
                   const p = document.createElement('p')
       
                   h2.innerHTML = data.name
                   h4.innerHTML = `Age: ${data.age}`
                   p.innerHTML = `Bio: ${data.description}`
       
                   div.appendChild(h2)
                   div.appendChild(h4)
                   div.appendChild(p)
               })
               } 
        
        
               const backBtn = document.querySelector('#back')
               const nextBtn = document.querySelector('#forward')
          
               nextBtn.onclick = ()=> {
                  page ++
                  getMonsters()
                  backBtn.disabled = false
              }
          
                  backBtn.onclick =  ()=> {
                      if (page > 0){
                      page --
                       getMonsters()
                      }
                      else{
                          backBtn.disabled = true
                          getMonsters()
                      }
          
                  }
          
        
        
                  createMonster.addEventListener( 'submit' , (e)=>{
                    e.preventDefault()  
                    
                   const createName = document.querySelector('#name')
                   const createAge = document.querySelector('#age')
                   const createDescription = document.querySelector('#description')
             
               fetch ( ('http://localhost:3000/monsters'),{
                   method: 'POST',
                   headers: {
                     "Content-Type": "application/json",
                      Accept: "application/json"
                    },
                       body: JSON.stringify({
                           name: createName.value, age: createAge.value, description: createDescription.value
                       })
                 })
                 .then(resp => resp.json())
                 .then(data=>{ 

                    
                   // console.log(data)
                    const monsterContainer = document.querySelector('#monster-container')
                    const div = document.createElement('div')
                    monsterContainer.append(div)
                    const h2 = document.createElement('h2')
                    const h4 = document.createElement('h4')
                    const p = document.createElement('p')
        
                    h2.innerHTML = data.name
                    h4.innerHTML = `Age: ${data.age}`
                    p.innerHTML = `Bio: ${data.description}`
        
                    div.appendChild(h2)
                    div.appendChild(h4)
                    div.appendChild(p)

                   
                })  
                monsterForm.reset()
                
           })  
        
}})

        
        
        
        
        
        

     