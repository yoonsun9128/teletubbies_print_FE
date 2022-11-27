const backend_base_url = 'http://127.0.0.1:8000/'

const output_id = localStorage.getItem('output_id')
console.log(output_id)

window.onload = () => {
    getOutputImg();
}

async function getOutputImg(){
    console.log(output_id)
    const response = await fetch(`${backend_base_url}store/${output_id}/`,{
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer' + localStorage.getItem("access")
        },
        method:'GET',
    })
    
    data = await response.json()
    console.log(data)

    let click_image = data['output_img']
    console.log(data['output_img'])

    let temp_html = `
    <div class="image-container">
            <img style="width: 500px;" id="previewImage" src="${backend_base_url}${click_image}">
    </div>
    `
    $('#output_img-box').append(temp_html)
}
