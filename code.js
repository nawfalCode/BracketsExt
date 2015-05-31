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

function Uploader() { //;systemSettingsPara, currentCodePara, DialogsPara) {
        var self = this;
        var systemSettings = null;
        var currentCode = null;
        var Dialogs = null;
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
        }

        this.publishResponse = function (data) {

            console.log('we got a response :' + data.error);
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
        }

        function uploadToWebsite() {
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

            var script = document.createElement('script');
            script.src = systemSettings.serverAddress + '/a1publishcheck.php?teamDir=' + teamDir + '&user=' + username + '&assignment=a2&callback=uploader.publishResponse'

            document.head.appendChild(script)
        }
    }
    /*
        this.individualDirClick = function (button) {
            localStorage.setItem("a1uploader-use-individual-dir", button.checked);
            useIndividualDirOption = button.checked;
        }
    */
    /*  this.run = function () {
        var publishButton = document.getElementById("publish-button");
        publishButton.onclick = uploadToWebsite;

        var myTextArea = document.getElementById("code");
        if (localStorage.getItem("a2uploader-code") !== null) {
            myTextArea.value = localStorage.getItem("a2uploader-code");
        }

        //var myCodeMirror = CodeMirror.fromTextArea(textarea);
        myCodeMirror = CodeMirror(function (elt) {
            myTextArea.parentNode.replaceChild(elt, myTextArea);
        }, {
            value: myTextArea.value,
            tabMode: "indent",
            lineNumbers: true,
            lineWrapping: true,
            indentUnit: 4,
            indentWithTabs: true,
            matchBrackets: true
        });

        if (localStorage.getItem("a1uploader-team-dir") !== null) {
            var teamDirField = document.getElementById("team-dir");
            teamDirField.value = localStorage.getItem("a1uploader-team-dir");
        }

        if (localStorage.getItem("a1uploader-authcate") !== null) {
            var authcateField = document.getElementById("authcate");
            authcateField.value = localStorage.getItem("a1uploader-authcate");
        }

        var useIndividualDirCheckbox = document.getElementById("individual-dir-button");
        useIndividualDirCheckbox.checked = useIndividualDirOption;
        var savedUseIndividualDirPreference = localStorage.getItem("a1uploader-use-individual-dir");
        if (savedUseIndividualDirPreference !== null) {
            // This preference exists in local storage.  Use that value
            // for option and initial checkbox state.
            var option = (savedUseIndividualDirPreference === 'true');
            useIndividualDirCheckbox.checked = option;
            useIndividualDirOption = option;
        }

    }
}
*/
    /*
    var uploader = new Uploader();
    window.onload = uploader.run;
    */
module.exports = Uploader;