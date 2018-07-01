$(document).ready(function(){

    $('.js-delete-package').on('click' , function(){
        var id = $(this).data('id');
        $.ajax({
            type : 'DELETE',
            url : '/packageDelete/'+ id,
            success : function(response){
                alert('Package deleted successfully');
                location.reload();
            },
            error : function(err){
                console.log(err);
            }
        });
    });




});