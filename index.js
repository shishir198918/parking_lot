function setlocation(element,row,col){
    console.log("setlocation")
    Object.assign(element.style,{gridRowStart:row,gridColumnStart:col});
    return element;


};

function create_parking_slot(){
    console.log("create_element")
    let frame_div= document.createElement("div");
    frame_div.setAttribute("style","");
    frame_div.setAttribute("class","slot");
    frame_div=setlocation(frame_div,3,1);

    let parking_line=document.createElement("div");
    parking_line.setAttribute("style","");
    parking_line.setAttribute("class","parkingspace");

    // adding parking_line div into frame div

    frame_div.appendChild(parking_line);
    

    return frame_div

}

function add_element(){
    document.querySelector(".body").appendChild(create_parking_slot())
}
document.addEventListener("DOMContentLoaded",add_element);