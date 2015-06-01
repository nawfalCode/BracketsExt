// This file contains some delegate classes for you to extend.

function NewRoutePageControllerDelegate() {

    // Save 'this' so we can refer to public attributes and methods.
    var self = this;

    // The MapPageController class controls the 'New Route' page.
    // This class provides a couple of useful methods:
    //     displayMessage(message):
    //         Causes a short message string to be displayed on the
    //         page for a brief period.  Useful for showing quick
    //         notifications to the user.
    //     panToLocation(latitude, longitude):
    //         Pans the map to the given latitude and longitude.
    //     repaintOverlay():
    //         Causes the map overlay to be redrawn, triggering a 
    //         call to our mapPageDrawOverlay() method.  You might
    //         wish to call this when you update information that 
    //         is displayed on the canvas overlay.
    //     canvasPointFromLocation(latitude, longitude):
    //         Given a latitude and longitude, returns the
    //         corresponding point on the canvas overlay.
    //         The return value is an object with an 'x' and a 'y'
    //         property.
    var newRoutePageController = null;
    var LAT = 0;
    var LONG = 0;
    var ACC = 0;
    var newRouteLAT = [];
    var newRouteLONG = [];
    var newRouteACC = [];
    var timerID = null;
    var date = 0;
    var watchID = null;
    // NOTE: You should not remove any of the five public methods below.

    // This method is called by the MapPageController when the user
    // has switched to the page and it has been intialised.

    this.gpsCoordinates = function (lat, long, accuracy) {

        LAT = lat;
        LONG = long;
        ACC = accuracy;

        newRoutePageController.panToLocation(LAT, LONG);
        newRoutePageController.displayMessage(ACC);

    }
    this.mapPageInitialisedWithOptions = function (controller, options) {
        console.log("Record Route - mapPageInitialisedWithOptions");
        newRoutePageController = controller;

        watchID = navigator.geolocation.watchPosition(function (position) {
            self.gpsCoordinates(position.coords.latitude, position.coords.longitude, position.coords.accuracy);
        });
    }

    // The MapPageController calls this when loading its page.
    // You should return an array of objects specifying buttons you
    // would like to display at the bottom of the map, e.g.,
    //    {
    //        title:   "Start",
    //        id:      "startButton",  (optional)
    //    }
    // Note: This doesn't support an "onClick" property like in
    // Assignment 1.
    this.mapPageButtonControls = function () {
        console.log("Record Route - mapPageButtonControls");
        var cameraVideoPageController = null;
        var buttons = [{
            title: "Nawfal",
            id: "StartButton"
        }, {
            title: "Nawfal2",
            id: "EndButton"
        }];
        return buttons;
    }

    // The MapPageController calls this when user taps on a button
    // specified by mapPageButtonControls().  The buttonIndex will
    // be the index of the button in the array you returned.
    this.mapPageButtonTapped = function (buttonIndex) {

        if (buttonIndex == 0) {

            timerID = setInterval(
                function ()

                {

                    if ((LAT != 0) && (LONG != 0)) {
                        newRoutePageController.panToLocation(LAT, LONG);
                        newRouteLAT.push(LAT);
                        newRouteLONG.push(LONG);
                        newRouteACC.push(ACC);
                        console.log(newRouteLAT)
                        console.log(newRouteLONG)
                    }
                }, 3000)
        }
        if (buttonIndex == 1) {

            clearInterval(timerID)
            console.log(timerID)

        }



    }

    // The MapPageController calls this when the canvas needs to be
    // redrawn, such as due to the user panning or zooming the map.
    // It clears the canvas before calling this method.
    // 'context' is an HTML canvas element context.  This is a 
    // transparent layer that sits above the map and is redrawn 
    // whenever the map is panned or zoomed. It can be used to 
    // draw annotations on the map or display other information.
    this.mapPageDrawOverlay = function (context) {
        console.log("Record Route - mapPageDrawOverlay");
        var coordinate = newRoutePageController.canvasPointFromLocation(LAT, LONG);
        context.beginPath();
        context.strokeStyle = 'black';
        context.arc(coordinate.x, coordinate.y, 10, 0, 2 * Math.PI);
        context.stroke();


        for (i = 0; i < newRouteLAT.length; i++) //breadcrumbs for path
        {
            var crumb = newRoutePageController.canvasPointFromLocation(newRouteLAT[i], newRouteLONG[i])
            context.beginPath()
            context.strokeStyle = 'blue';
            context.arc(crumb.x, crumb.y, 2, 0, 2 * Math.PI);
            context.stroke();
            context.fillStyle = ("blue")
            context.fill()

        }

    }


    // The MapPageController calls this to ask if it should return 
    // back to the start screen of the app when the user taps the 
    // done button.  If you are not letting the user return, you 
    // should probably call displayMessage() to inform them why. 
    this.mapPageShouldReturnFromDoneButtonTap = function () {
        var date = new Date();
        var location = {
            lat: newRouteLAT,
            long: newRouteLONG,
            accuracy: newRouteACC
        }
        var route = // create a route object
            {
                dateCreated: date,
                locations: location
            }


        var route1 = JSON.stringify(route); // convert the route object into JSON string
        localStorage.setItem("route - " + date, route1) // save to local storage


        console.log("Record Route - mapPageShouldReturnFromDoneButtonTap");

        navigator.geolocation.clearWatch(watchID);
        // Let the user return.
        return true;
    }



    //localStorage.clear();
}


function ViewRoutePageControllerDelegate() {
    // Save 'this' so we can refer to public attributes and methods.
    var self = this;

    // The MapPageController class controls the 'View Route' page.
    // This class provides a couple of useful methods:
    //     displayMessage(message):
    //         Causes a short message string to be displayed on the
    //         page for a brief period.  Useful for showing quick
    //         notifications to the user.
    //     panToLocation(latitude, longitude):
    //         Pans the map to the given latitude and longitude.
    //     repaintOverlay():
    //         Causes the map overlay to be redrawn, triggering a 
    //         call to our mapPageDrawOverlay() method.  You might
    //         wish to call this when you update information that 
    //         is displayed on the canvas overlay.
    //     canvasPointFromLocation(latitude, longitude):
    //         Given a latitude and longitude, returns the
    //         corresponding point on the canvas overlay.
    //         The return value is an object with an 'x' and a 'y'
    //         property.
    var viewRoutePageController = null;

    // The originally recorded route being displayed by the viewRoute page.
    var originalRoute;

    // NOTE: You should not remove any of the five public methods below.

    // This method is called by the MapPageController when the user
    // has switched to the page and it has been intialised.  If the
    // MapPageController is displaying an existing route, then options
    // will contain a 'routeIndex' property which gives the index of 
    // the selected route in the Routes array.
    this.mapPageInitialisedWithOptions = function (controller, options) {

        console.log("View Route - mapPageInitialisedWithOptions");
        viewRoutePageController = controller;
        originalRoute = Routes[options.routeIndex];
    }


    // The MapPageController calls this when loading its page.
    // You should return an array of objects specifying buttons you
    // would like to display at the bottom of the map, e.g.,
    //    {
    //        title:   "Start",
    //        id:      "startButton",  (optional)
    //    }
    // Note: This doesn't support an "onClick" property like in
    // Assignment 1.
    this.mapPageButtonControls = function () {
        console.log("View Route - mapPageButtonControls");
        return [];
    }

    // The MapPageController calls this when user taps on a button
    // specified by mapPageButtonControls().  The buttonIndex will
    // be the index of the button in the aray you returned.
    this.mapPageButtonTapped = function (buttonIndex) {
        console.log("View Route - mapPageButtonTapped(" + buttonIndex + ")");
    }

    // The MapPageController calls this when the canvas needs to be
    // redrawn, such as due to the user panning or zooming the map.
    // It clears the canvas before calling this method.
    // 'context' is an HTML canvas element context.  This is a 
    // transparent layer that sits above the map and is redrawn 
    // whenever the map is panned or zoomed. It can be used to 
    // draw annotations on the map or display other information.
    this.mapPageDrawOverlay = function (context) {
        console.log("Record Route - mapPageDrawOverlay");
        console.log(originalRoute.locations) // check to see route from localstorage
        var coordinate = newRoutePageController.canvasPointFromLocation(originalRoute.locations.lat[0], originalRoute.locations.long[0]);
        context.beginPath();
        context.strokeStyle = 'black';
        context.arc(coordinate.x, coordinate.y, 10, 0, 2 * Math.PI);
        context.stroke();


        for (var i = 0; i < originalRoute.locations.lat.length; i++) //breadcrumbs for path
        {
            var crumb = newRoutePageController.canvasPointFromLocation(originalRoute.locations.lat[i], originalRoute.locations.long[i])
            context.beginPath()
            context.strokeStyle = 'blue';
            context.arc(crumb.x, crumb.y, 2, 0, 2 * Math.PI);
            context.stroke();
            context.fillStyle = ("blue")
            context.fill()

        }

        console.log("View Route - mapPageDrawOverlay");
    }

    // The MapPageController calls this to ask if it should return 
    // back to the start screen of the app when the user taps the 
    // done button.  If you are not letting the user return, you 
    // should probably call displayMessage() to inform them why. 
    this.mapPageShouldReturnFromDoneButtonTap = function () {
        console.log("viewPage mapShouldReturnFromDoneButtonTap");
        return true;
    }
}