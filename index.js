function setlocation(element,row,col){
    
    Object.assign(element.style,{gridRowStart:row,gridColumnStart:col});
    return element;


};

function add_element_into_floor(){
    button_list=document.querySelectorAll(".floor")
    for( let i=0; i<button_list.length; i++){
        button_list[i].onclick=function(){
            floor_no=this.innerHTML
            return distribute_floor(floor_no)

        }
    }
  
};


function svg(){
    let image=document.createElement("img")
    image.setAttribute("class","svg")
    image.setAttribute("src","/media/shishir/Windows/Projects/parkinglot/parking/data/car-line-drawing-that-can-be-used-for-svgrepo-com.svg")
    return image
}

function distribute_floor(floor_no){
    floor_no = parseInt(floor_no);
    if (floor_no>0){
        for(let col=1;col<7;col++){
            if(col===2 || col===5){
                continue;
            }
            for(let row=1;row<5;row++){
                document.querySelector(".body").appendChild(create_parking_slot(row,col));
                
                if(true){
                    document.querySelector(`#parkingspace${row}${col}`).appendChild(svg())
                }
                
            }

        }
    }

}

function create_parking_slot(row=2,col=3){
    
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

function add_element(){
    document.querySelector(".body").appendChild(create_parking_slot())
}
document.addEventListener("DOMContentLoaded",add_element);
document.addEventListener("DOMContentLoaded",add_element_into_floor)