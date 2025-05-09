// let slot=fetch("https://parking-lot-mm97.onrender.com/slots",{headers:{"sec-fetch-site":"cross-site","sec-fetch-mode":"cors"}})



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

function distribute_floor(floor_no="0"){
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
    parking_line.setAttribute("id",`parkingspace${row}${col}`)

    // adding parking_line div into frame div

    frame_div.appendChild(parking_line);
    

    return frame_div

}

function removeElement(){
    if((document.querySelectorAll(".slot")).length){
       for(let node of document.querySelectorAll(".slot")){
        node.remove()
       }
    }
}

function configure_floor(floor_no="0"){
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
}
return body
}

function add_element(){
    document.querySelector(".body").appendChild(create_parking_slot())
}
document.addEventListener("DOMContentLoaded",add_element_into_floor);