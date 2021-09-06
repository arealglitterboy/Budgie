window.onload = function() {
    var nameVar = 'Ben';
    var nameVar = 'Mike';
    console.log('nameVar', nameVar);

    let nameLet = 'Jen';
    nameLet = 'Julie';
    console.log('nameLet', nameLet);

    const petName = getPetName();

    console.log(petName);

    function getPetName() {
        return "Andrew";
    }
}