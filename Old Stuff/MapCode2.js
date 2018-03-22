var map;
var oneTrue = new Boolean(false);
var twoTrue = new Boolean(false);
var threeTrue = new Boolean(false);
var fourTrue = new Boolean(false);
var fiveTrue = new Boolean(false);
var check = new Boolean(true);
var checkPhp = new Boolean(false);
var marker, markerTwo, markerThree, markerFour, markerFive;
var pos, yourLoc, shopOne, shopTwo, shopThree, shopFour, shopFive;
var posToOne, posToTwo, posToThree, posToFour, posToFive;
var object;

$(document).on('pageshow', '#index',function(e,data){

        $('#content').height(getRealContentHeight());
        map = new google.maps.Map(document.getElementById('map_canvas'), {
            zoom: 20,
            center: new google.maps.LatLng(pos.lat(), pos.lng()),
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });


    if (oneTrue) {
        marker.setMap(map);
        oneTrue = false;
    }

    else if (twoTrue) {
        markerTwo.setMap(map);
        twoTrue = false;
    }
    else if (threeTrue) {
        markerThree.setMap(map);
        threeTrue = false;
    }
    else if (fourTrue) {
        markerFour.setMap(map);
        fourTrue = false;
    }
    else if (fiveTrue) {
        markerFive.setMap(map);
        fiveTrue = false;
    }
    yourLoc = new google.maps.Marker({
        position: new google.maps.LatLng(pos.lat(), pos.lng()),
        title: 'Marker',
        map: map,
        icon: 'https://ianferguson.info/ATest/you.png',
    });
});

function getRealContentHeight() {
    var header = $.mobile.activePage.find("div[data-role='header']:visible");
    var footer = $.mobile.activePage.find("div[data-role='footer']:visible");
    var content = $.mobile.activePage.find("div[data-role='content']:visible:visible");
    var viewport_height = $(window).height();

    var content_height = viewport_height - header.outerHeight() - footer.outerHeight();
    if ((content.outerHeight() - header.outerHeight() - footer.outerHeight()) <= viewport_height) {
        content_height -= (content.outerHeight() - content.height());
    }
    return content_height;
}



$( window ).load(function() {
    console.log( "ready!" );
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var posLat = position.coords.latitude;
            var posLng = position.coords.longitude;
            //pos = new google.maps.LatLng(55.845598, -4.424219);
            //pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            pos = new google.maps.LatLng(posLat, posLng);
            yourLoc = new google.maps.Marker({
                position: new google.maps.LatLng(pos.lat(), pos.lng()),
                title: 'Marker',
                map: map,
                icon: 'https://ianferguson.info/ATest/you.png',
            });
            checkPhp = true;
        });
    };
    if(navigator.userAgent.match(/Android/i)){
        window.scrollTo(0,1);
    }

    if (checkPhp) {
        $.ajax({
            type: "GET",
            url: "test2.php",
            datatype: 'json',

        })
            .done(function (msg) {
                object = JSON.parse(msg);
                $('#nameOne').text(object[0].shopName);
                $('#nameTwo').text(object[1].shopName);
                $('#nameThree').text(object[2].shopName);
                $('#nameFour').text(object[3].shopName);
                $('#nameFive').text(object[4].shopName);
                shopOne = new google.maps.LatLng(object[0].shopLat, object[0].shopLng);
                shopTwo = new google.maps.LatLng(object[1].shopLat, object[1].shopLng);
                shopThree = new google.maps.LatLng(object[2].shopLat, object[2].shopLng);
                shopFour = new google.maps.LatLng(object[3].shopLat, object[3].shopLng);
                shopFive = new google.maps.LatLng(object[4].shopLat, object[4].shopLng);
                posToOne = google.maps.geometry.spherical.computeDistanceBetween(pos, shopOne);
                posToTwo = google.maps.geometry.spherical.computeDistanceBetween(pos, shopTwo);
                posToThree = google.maps.geometry.spherical.computeDistanceBetween(pos, shopThree);
                posToFour = google.maps.geometry.spherical.computeDistanceBetween(pos, shopFour);
                posToFive = google.maps.geometry.spherical.computeDistanceBetween(pos, shopFive);
                var shopOneDis = posToOne.toFixed(1);
                var shopTwoDis = posToTwo.toFixed(1);
                var shopThreeDis = posToThree.toFixed(1);
                var shopFourDis = posToFour.toFixed(1);
                var shopFiveDis = posToFive.toFixed(1);
                var shopOneString = "<p>Distance from you: " + shopOneDis + "m</p>";
                var shopTwoString = "<p>Distance from you: " + shopTwoDis + "m</p>";
                var shopThreeString = "<p>Distance from you: " + shopThreeDis + "m</p>";
                var shopFourString = "<p>Distance from you: " + shopFourDis + "m</p>";
                var shopFiveString = "<p>Distance from you: " + shopFiveDis + "m</p>";
                $('#shopOneDistance').replaceWith(shopOneString);
                $('#shopTwoDistance').replaceWith(shopTwoString);
                $('#shopThreeDistance').replaceWith(shopThreeString);
                $('#shopFourDistance').replaceWith(shopFourString);
                $('#shopFiveDistance').replaceWith(shopFiveString);

                if (check) {
                    marker = new google.maps.Marker({
                        position: new google.maps.LatLng(shopOne.lat(), shopOne.lng()),
                        title: 'Marker',
                        map: map,
                    });
                    marker.setMap(null);
                    oneTrue = false;
                    markerTwo = new google.maps.Marker({
                        position: new google.maps.LatLng(shopTwo.lat(), shopTwo.lng()),
                        title: 'MarkerTwo',
                        map: map,
                    });
                    markerTwo.setMap(null);
                    twoTrue = false;


                    markerThree = new google.maps.Marker({
                        position: new google.maps.LatLng(shopThree.lat(), shopThree.lng()),
                        title: 'MarkerThree',
                        map: map,
                    });
                    markerThree.setMap(null);
                    threeTrue = false;

                    markerFour = new google.maps.Marker({
                        position: new google.maps.LatLng(shopFour.lat(), shopFour.lng()),
                        title: 'MarkerFour',
                        map: map,
                    });
                    markerFour.setMap(null);
                    fourTrue = false;

                    markerFive = new google.maps.Marker({
                        position: new google.maps.LatLng(shopFive.lat(), shopFive.lng()),
                        title: 'MarkerFour',
                        map: map,
                    });
                    fiveTrue = false;
                    markerFive.setMap(null);
                    check = false;
                }
                for (i = 0; i < object.length; i++) {
                    $('#coffeeTable > tbody:last').append('<tr>');
                    $('#coffeeTable > tbody:last').append('<th>' + object[i].shopID + '</th>');
                    $('#coffeeTable > tbody:last').append('<th>' + object[i].shopName + '</th>');
                    $('#coffeeTable > tbody:last').append('<th>' + object[i].shopAddress + '</th>');
                    $('#coffeeTable > tbody:last').append('<th>' + object[i].shopBlurb + '</th>');
                    $('#coffeeTable > tbody:last').append('<th>0' + object[i].shopNumber + '</th>');
                    $('#coffeeTable > tbody:last').append('<th>' + object[i].monSatHours + '</th>');
                    $('#coffeeTable > tbody:last').append('<th>' + object[i].sunHours + '</th>');
                    $('#coffeeTable > tbody:last').append('<th>' + object[i].shopLat + '</th>');
                    $('#coffeeTable > tbody:last').append('<th>' + object[i].shopLng + '</th>');
                    $('#coffeeTable > tbody:last').append('</tr>');
                }

            })
    }

});

$(function() {
    $('#placeMarker').click(function () {

    });

    $('#buttonOne').click(function () {
        oneTrue = true;
        $('#shopHeader').text(object[0].shopName);
        $('#shopAddress').text(object[0].shopAddress);
        $('#shopBlurb').text(object[0].shopBlurb);
        $('#monSatHours').text(object[0].monSatHours);
        $('#sunHours').text(object[0].sunHours);
        $('#shopNumber').text("0" +  object[0].shopNumber);
    });

    $('#buttonTwo').click(function () {
        twoTrue = true;
        $('#shopHeader').text(object[1].shopName);
        $('#shopAddress').text(object[1].shopAddress);
        $('#shopBlurb').text(object[1].shopBlurb);
        $('#monSatHours').text(object[1].monSatHours);
        $('#sunHours').text(object[1].sunHours);
        $('#shopNumber').text("0" +  object[1].shopNumber);

    });

    $('#blendButton').click(function () {
        threeTrue = true;
        $('#shopHeader').text(object[2].shopName);
        $('#shopAddress').text(object[2].shopAddress);
        $('#shopBlurb').text(object[2].shopBlurb);
        $('#monSatHours').text(object[2].monSatHours);
        $('#sunHours').text(object[2].sunHours);
        $('#shopNumber').text("0" +  object[2].shopNumber);
    });

    $('#costaButton').click(function () {
        fourTrue = true;
        $('#shopHeader').text(object[3].shopName);
        $('#shopAddress').text(object[3].shopAddress);
        $('#shopBlurb').text(object[3].shopBlurb);
        $('#monSatHours').text(object[3].monSatHours);
        $('#sunHours').text(object[3].sunHours);
        $('#shopNumber').text("0" +  object[3].shopNumber);
    });

    $('#uwsButton').click(function () {
        fiveTrue = true;
        $('#shopHeader').text(object[4].shopName);
        $('#shopAddress').text(object[4].shopAddress);
        $('#shopBlurb').text(object[4].shopBlurb);
        $('#monSatHours').text(object[4].monSatHours);
        $('#sunHours').text(object[4].sunHours);
        $('#shopNumber').text("0" +  object[4].shopNumber);
    });

});