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
    function Uploader(systemSettingsPara, currentCodePara, DialogsPara, DefaultDialogsPara) { //;) {
        var self = this;
        var systemSettings = systemSettingsPara;
        var currentCode = currentCodePara;
        var Dialogs = DialogsPara;
        var DefaultDialogs = DefaultDialogsPara;
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

        this.uploadToWebsite = function () {
            console.log('uploadtoWebsite Called');
            var str = systemSettings.server + '/a1publishcheck.php?teamDir=' + systemSettings.teamDir + '&user=' + systemSettings.userName + '&assignment=a2&callback=define';
            require([str], function (data) {
                if (data.error !== undefined) {
                    Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Uploader", data.error);
                    console.log(data.error);
                } else {
                    var teamDir = systemSettings.teamDir;
                    var username = systemSettings.userName;
                    var path = systemSettings.server + '/a1publish.php';
                    var params = {
                        teamDir: teamDir,
                        user: username,
                        code: currentCode,
                        assignment: systemSettings.assignment,
                        useIndividualDir: ((systemSettings.updateUserDir === 'checked') ? "1" : "0")
                    };
                    console.log(params);
                    post(path, params);
                    console.log(data)
                }
            }, function (err) {
                Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Uploader", err.message);
            });

        }
    };
    module.exports = Uploader;
});