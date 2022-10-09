// Student ID: 1234568796
// Name: Julio Vinicius
// Data: Oct 01, 2022


console.log("it goes to the client-side.");

if(getTitle == "Inventory List")
{
    let deleteButtons = document.querySelectorAll('.btn-danger');
        
    for(button of deleteButtons)
    {
        button.addEventListener('click', (event)=>{
            if(!confirm("Are you sure?")) 
            {
                event.preventDefault();
            }
        });
    }
}