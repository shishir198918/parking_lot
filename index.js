// let slot=fetch("https://parking-lot-mm97.onrender.com/slots",{headers:{"sec-fetch-site":"cross-site","sec-fetch-mode":"cors"}})

async function slots(){
    let response= await fetch("https://parking-lot-mm97.onrender.com/api/slots")
    let slot= await response.json() // json()also return a promise
    return slot

}


function add_pakingform(){
    let newparking=document.querySelector(".popupform")
    let form=document.querySelector("dialog")
    let close_button=document.querySelector("dialog button")

    
    newparking.addEventListener("click",function(){
        form.showModal()
    })
    close_button.addEventListener("click",function(){
        form.close()
    })
    
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
            document.querySelector(`#parking${location[0]}${location[1]}`).appendChild(svg(slot["car"]["car_color"]))
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


function svg(car_color){
    let image=document.createElementNS("http://www.w3.org/2000/svg","svg")
    image.setAttribute("class","svg")
    svg_atti={"version":"1.1","xmlns":"http://www.w3.org/2000/svg",
        "width":"800px",
        "height":"800px","fill":"#1d60dd",
        "viewBox":"0 0 512 512",
        "xml:space":"preserve"

    }
    for(let [key, value] of Object.entries(svg_atti)){
        image.setAttribute(`${key}`,`${value}`)
    }
    let g_tag=document.createElementNS("http://www.w3.org/2000/svg","g")
    

    image_path_d=[`M360.819,282.016c-11.672-0.016-22.359,4.75-29.984,12.406c-7.656,7.625-12.422,18.313-12.422,29.984
		c0.016,23.406,18.969,42.375,42.406,42.375c23.422,0,42.375-18.984,42.375-42.375c0.016-11.672-4.75-22.359-12.391-29.984
		C383.163,286.766,372.475,282,360.819,282.016z M360.819,345.484c-11.672-0.016-21.078-9.453-21.094-21.078
		c0-11.672,9.406-21.094,21.094-21.094c11.656,0,21.078,9.422,21.078,21.094C381.881,336.031,372.459,345.469,360.819,345.484z`,
        `M126.616,282.016c-11.688-0.016-22.344,4.75-29.984,12.406c-7.656,7.625-12.406,18.313-12.406,29.984
		c0.016,23.391,18.953,42.375,42.391,42.375c23.422,0,42.391-18.969,42.391-42.375C169.006,300.953,150.022,282.016,126.616,282.016
		z M126.616,345.484c-11.672-0.016-21.063-9.453-21.078-21.078c0-11.672,9.406-21.094,21.078-21.094
		c11.656,0.016,21.078,9.422,21.094,21.094C147.694,336.031,138.256,345.469,126.616,345.484z`,
        `M507.976,226.172c-3.25-3.781-7.984-5.984-12.953-5.984h-104.11c-6.547,0-12.719-3.016-16.734-8.156
		l-45.875-58.656c-4.031-5.141-10.203-8.156-16.734-8.156H145.334c-7.609,0-14.625,4.078-18.422,10.656l-36.953,64.313H16.991
		c-5.016,0-9.797,2.219-13.016,6.063s-4.594,8.938-3.719,13.859l6.969,64.5c1.172,10.766,10.234,18.953,21.078,18.969l47.719,0.109
		v-14.984l-47.672-0.109c-3.203-0.016-5.875-2.406-6.219-5.594l-7.125-65.484l0.453-1.641l1.531-0.688h72.969
		c5.375,0,10.313-2.875,13.016-7.531l36.938-64.297c1.109-1.953,3.188-3.141,5.422-3.141h166.234c1.891,0,3.75,0.891,4.922,2.391
		l45.875,58.688c6.938,8.813,17.328,13.891,28.547,13.891h104.11l1.531,0.688l0.516,0.672l0.172-0.297l-17.625,68.688
		c-0.672,2.766-3.188,4.703-6.063,4.703l-62.172-0.125V324.5l62.141,0.141c9.734,0,18.203-6.563,20.625-15.984l17.641-68.734
		C512.569,235,511.194,229.969,507.976,226.172z`]
        for(let value of image_path_d){
            let path=document.createElementNS("http://www.w3.org/2000/svg","path")
            path.setAttribute("class","st0")
            path.setAttribute("d",`${value}`)
            g_tag.append(path)
        }
        const points=`177.209,323.891 310.225,324.281 310.225,309.297 177.209,308.922 	`
        let polygon=document.createElementNS("http://www.w3.org/2000/svg","polygon")
        
        polygon.setAttribute("points",`${points}`)
        polygon.setAttribute("class","st0")
        g_tag.append(polygon)
        image.append(g_tag)
        let style=document.createElement("style")
        style.setAttribute("fill",car_color)
        image.append(style)
        
    return image
}

function distribute_floor(floor_no){
    removeElement()
    body=configure_floor(floor_no) 
    add_pakingform()  
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
    // if((document.querySelectorAll(".slot")).length){
       for(let node of document.querySelectorAll(".slot")){
        node.remove()
       }
    // }
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