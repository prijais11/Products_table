$(document).ready(function(){


    var list=[];

    $('#update').hide();
    $('#delete_id').hide();
       $('#submit').click(
            function(){
                var p_id=$('#p_id').val();
                 var p_name=$('#p_name').val();
                var p_price=$('#p_price').val();
                var p_quantity=$('#p_quantity').val();
                if(checkDataType(p_id,p_name,p_price,p_quantity))
                {
                    if(duplicateId(p_id))
                    {
                        insertData(p_id,p_name,p_price,p_quantity);
                        display();

                    }
                }


            }
        );
    

    function checkDataType(p_id,p_name,p_price,p_quantity)
    {
        if(isNaN(p_id)||p_id==""||p_name==""||isNaN(p_price)||p_price==""||isNaN(p_quantity)||p_quantity=="")
        {
            alert("fill valid input");
            return false;
        }
        return true;
    }

    function duplicateId(p_id)
    {
        for(let i=0;i<list.length;i++)
        {
            if(p_id==list[i].id)
            return false;
        }
        return true;
    }




    function insertData(p_id,p_name,p_price,p_quantity)
    {
        list.push({
            "id":p_id,
            "name":p_name,
            "price":p_price,
            "quantity":p_quantity

        });
    }


    function editList(p_id)
    {
        alert(p_id);
        var object=getObject(p_id);
        $('#submit').hide();
        $('#update').show();
        $('#content').hide();
        $('#edit_content').html(`<label for="product_id">Product SKU<input id="ep_id" name="ep_id" placeholder="${object.id}" ></label>
                                 <label for="product_name">Product Name<input id="ep_name" name="ep_name" placeholder="${object.name}"></label>
                                 <label for="product_price">Product Price<input id="ep_price" name="ep_price" placeholder="${object.price}"></label>
                                <label for="product quantity">Product Quantity<input id="ep_quantity" name="ep_quantity" placeholder="${object.quantity}"></label>`);
                                
                                
                                $('#update').click(
                                    function(){
                                        var ep_id=$('#ep_id').val();
                                         var ep_name=$('#ep_name').val();
                                        var ep_price=$('#ep_price').val();
                                        var ep_quantity=$('#ep_quantity').val();
                                        if(checkDataType(ep_id,ep_name,ep_price,ep_quantity))
                                        {
                                            if(duplicateId(ep_id))
                                            {
                                               
                                                object.id=ep_id;
                                                object.name=ep_name;
                                                object.price=ep_price;
                                                object.quantity=ep_quantity;
                                                
                                                display();

                                                 $('#submit').show();
                                                 $('#update').hide();
                                                $('#edit_content').hide();
                                                $('#content').show();  
                        
                                            }
                                            else
                                            {
                                                alert("Product Id already exist in list");
                                            }
                                        }
                        
                        
                                    }
                                );                   
        
    }

    function getObject(p_id)
    {
        for(let i=0;i<list.length;i++)
        {
             if(list[i].id==p_id)
            return list[i];
        }
    }


    function getIndex(p_id)
    {
        for(let i=0;i<list.length;i++)
        {
            if(list[i].id==p_id)
            return i;
        }
    }


    $('#result').on("click","a#edit",function(){
        var getId=$(this).data("pid");
        editList(getId);
        
    });


    $('#result').on("click","a#delete",function(){
        var getId=$(this).data("pid");
        alert(getId);
        deleteId(getId);

    });



    function deleteId(dp_id)
    {
        $('#content').hide();
        $('#submit').hide();
        $('#delete_id').show();

        


        $('#yes').click(
            function()
            {
                var object=getObject(dp_id);
                var index=getIndex(dp_id);
                alert(object.id);
                $('#content').show();
                $('#submit').show();
                $('#delete_id').hide();
                list.splice(index,1);
                display();
            }
        );

        $('#no').click(
            function()
            {
                $('#content').show();
                $('#submit').show();
                $('#delete_id').hide();
            }
        );

    }







    function display()
    {
        let result="";
        for(let i=0;i<list.length;i++)
            {



                result+=`<table><tr><td style="padding:20px">${list[i].id}</td><td style="padding:20px">${list[i].name}</td><td style="padding:20px">${list[i].price}</td><td style="padding:20px">${list[i].quantity}</td><td style="padding:20px"><a href="#" id="edit" data-pid="${list[i].id}">EDIT</a></td><td style="padding:20px"><a href="#" id="delete" data-pid="${list[i].id}">DELETE</td></tr></table>`;
    
       
            }

            $('#result').html(`<table >
            <tr>
            <th style="padding:10px">Product_id</th>
            <th style="padding:10px">product_name</th>
            <th style="padding:10px">product_price</th>
            <th style="padding:10px">product_quantity</th>
            </tr>
            <tr>
            ${result}
            </tr>
            </table>`);
      
    }

});