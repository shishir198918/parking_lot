// let slot=fetch("https://parking-lot-mm97.onrender.com/slots",{headers:{"sec-fetch-site":"cross-site","sec-fetch-mode":"cors"}})

async function slots(){
    let response= await fetch("https://parking-lot-mm97.onrender.com/api/slots")
    let slot= await response.json() // json()also return a promise
    return slot

}



function getRowFromSlot(row){
    parseInt(row)
    if(row%4===0){
        return 4
    }
    return row%4
}
function mapWithSlot(slot,floor_no){
    let col;
    let row=getRowFromSlot(slot)
    if(floor_no==0){
        if(5>slot && slot>0){
            col=1
        }
        else{
            col=6
        }
    }
    else{
        if(5>slot && slot>0){
            col=1
        }
        if(9>slot && slot >4){
            col=3
        }
        if(13>slot && slot>8){
            col=4
        }
        if(17>slot && slot>12){
            col=6
        }

    }

    return [row,col]
}
 async function parkCar(floor_no){
    let parking_slots= await slots()
    for (let slot of parking_slots){
        if(slot["floor_number"]==floor_no && slot["car"]!==null){
            let location=mapWithSlot(slot["slot_number"],floor_no)
            document.querySelector(`#parking${location[0]}${location[1]}`).appendChild(svg())
        }
    } 
}

function setlocation(element,row,col){
    
    Object.assign(element.style,{gridRowStart:row,gridColumnStart:col});
    return element;


};

function add_element_into_floor(){
    let button_list=document.querySelectorAll(".floor")
    for( let i=0; i<button_list.length; i++){
        button_list[i].onclick=function(){
           let floor_no=this.innerHTML
         distribute_floor(floor_no)

        }
    }
  
};


function svg(){
    let image=document.createElement("img")
    image.setAttribute("class","svg")
    image.setAttribute("src","data/car-line-drawing-that-can-be-used-for-svgrepo-com.svg")
    return image
}

function distribute_floor(floor_no){
    removeElement()
    body=configure_floor(floor_no)   
}


function create_parking_slot(row,col){
    
    let frame_div= document.createElement("div");
    // frame_div.setAttribute("style","");
    frame_div.setAttribute("class","slot");
    frame_div=setlocation(frame_div,row,col);

    let parking_line=document.createElement("div");
    // parking_line.setAttribute("style","");
    parking_line.setAttribute("class","parkingspace");
    parking_line.setAttribute("id",`parking${row}${col}`)

    // adding parking_line div into frame div

    frame_div.appendChild(parking_line);
    

    return frame_div

}

function removeElement(){
    // implent using for of 
    if((document.querySelectorAll(".slot")).length){
       for(let node of document.querySelectorAll(".slot")){
        node.remove()
       }
    }
}

function configure_floor(floor_no){
    let body=document.querySelector(".body")

    if(floor_no==0){
        ele=document.createElement("div");
        ele.setAttribute("id","space");
        body.appendChild(ele);  
        for(let col of [1,6]){
            for(let row=1;row<5;row++){
                let parking_space=create_parking_slot(row,col)
                body.appendChild(parking_space)
            }
            
        }
        parkCar(floor_no)      
    }
    else{
          if(document.querySelector("#space")){
            const div=document.querySelector("#space")
            div.remove()
            }
            for(let col of [1,3,4,6]){
                for(let row=1;row<5;row++){
                    let parking_space=create_parking_slot(row,col)
                    body.appendChild(parking_space)                
                }
                          
            }
            parkCar(floor_no)    
}
return body
}


document.addEventListener("DOMContentLoaded",add_element_into_floor);