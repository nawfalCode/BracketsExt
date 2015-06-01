/*
 * Assignment 2 uploader
 *
 * Written by Michael Wybrow
 *
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015  Monash University
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 */
define(function (require, exports, module) {
    function Uploader(systemSettingsPara, currentCodePara, DialogsPara) { //;) {
        var self = this;
        var systemSettings = systemSettingsPara;
        var currentCode = currentCodePara;
        var Dialogs = DialogsPara;
        var myCodeMirror;
        var useIndividualDirOption = false;

        function post(path, params, method) {
            method = method || "post"; // Set method to post by default if not specified.

            var form = document.createElement("form");
            form.setAttribute("target", "_blank");
            form.setAttribute("method", method);
            form.setAttribute("action", path);

            for (var key in params) {
                if (params.hasOwnProperty(key)) {
                    var hiddenField = document.createElement("input");
                    hiddenField.setAttribute("type", "hidden");
                    hiddenField.setAttribute("name", key);
                    hiddenField.setAttribute("value", params[key]);
                    form.appendChild(hiddenField);
                }
            }
            document.body.appendChild(form);
            form.submit();
        };

        this.publishResponse = function (data) {

            console.log('we got a response :' + data.error);
            console.log(JSON.stringify(data));
            /*                if (data.error !== undefined) {
                                Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Uploader", data.error);
                                console.log(data.error);
                            } else {
                                console.log('Uploading. Page will open...');

                                var codeString = currentCode;
                                //var escapedCode = encodeURIComponent(codeString); 
                                /*
                                            var teamDirField =systemSettings.teamDir;
                                            var authcateField = systemSettings.teamDir;
                                */
            /*/// from here
                var teamDir = systemSettings.teamDir;
                var username = systemSettings.teamDir;
                var path = systemSettings.serverAddress + '/a1publish.php';
                var params = {
                    teamDir: teamDir,
                    user: username,
                    code: codeString,
                    assignment: systemSettings.assignment,
                    useIndividualDir: ((systemSettings.updateUserDir === 'checked') ? "1" : "0")
                };
                post(path, params);
            }
            */
        };

        this.uploadToWebsite = function () {
            console.log('uploadtoWebsite Called');
            //document.getElementById("error").innerHTML = "";
            //document.getElementById("success").innerHTML = "";

            // Save current version of code in localStorage.
            //var codeString = myCodeMirror.getValue();
            //localStorage.setItem("a2uploader-code", codeString);

            //var teamDirField = document.getElementById("team-dir");
            //var authcateField = document.getElementById("authcate");

            //var teamDir = teamDirField.value;
            //var username = authcateField.value;

            //localStorage.setItem("a1uploader-team-dir", teamDir);
            //localStorage.setItem("a1uploader-authcate", username);
            var str = systemSettings.server + '/a1publishcheck.php?teamDir=' + systemSettings.teamDir + '&user=' + systemSettings.userName + '&assignment=a2&callback=define';
            require([str], function (data) {
                console.log(data)
            });

            //var script = document.createElement('script');
            //script.src = systemSettings.server + '/a1publishcheck.php?teamDir=' + systemSettings.teamDir + '&user=' + systemSettings.userName + '&assignment=a2&callback=uploader.publishResponse'

            //document.head.appendChild(script)
        }
    };
    var uploader = new Uploader();
    console.log('this is the main' + JSON.stringify(uploader));
    module.exports = Uploader;
});