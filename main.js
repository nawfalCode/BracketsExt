/*
 * ENG1003 Assignment Uploader
 *
 * Written by Nawfal Ali
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
    var systemSettings = {
        server: 'http://eng1003.eng.monash.edu/',
        teamDir: 'bhdck',
        userName: 'nawfalms',
        updateTeamDir: '',
        updateUserDir: 'checked',
        assignment: '',
        rememberMe: 'checked'
    };

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        Dialogs = brackets.getModule("widgets/Dialogs"),
        DefaultDialogs = brackets.getModule("widgets/DefaultDialogs"),
        AppInit = brackets.getModule("utils/AppInit");
    DocumentManager = brackets.getModule("document/DocumentManager");
    ExtensionUtils = brackets.getModule("utils/ExtensionUtils");

    var mainDialog = require("text!dialog.html");
    toolbarSettings = require("text!toolbar-settings.html");
    toolbarUploader = require("text!toolbar-uploader.html");
    codeServer = require('code');


    function log(s) {
        console.log("[helloworld3] " + s);
    }

    function handleHelloWorld() {
        var str = "";

        console.log('we are here!!');
        Dialogs.showModalDialogUsingTemplate(Mustache.render(mainDialog, systemSettings), false);

        var $dlg = $(".eng1003setting-dialog.instance");
        $dlg.find(".dialog-button[data-button-id='cancel']").on("click", handleCancel);
        $dlg.find(".dialog-button[data-button-id='ok']").on("click", handleOk);

        function handleCancel() {


            Dialogs.cancelModalDialogIfOpen("eng1003setting-dialog");

        }

        function handleOk() {
            var $dlg = $(".eng1003setting-dialog.instance");
            systemSettings.server = $dlg.find("#server").val();
            systemSettings.teamDir = $dlg.find("#teamDir").val();
            systemSettings.userName = $dlg.find("#userName").val();
            systemSettings.updateTeamDir = $dlg.find("#updateTeamDir:checked").val();
            systemSettings.updateUserDir = $dlg.find("#updateUserDir:checked").val();
            systemSettings.rememberMe = $dlg.find("#rememberMe:checked").val();
            systemSettings.assignment = $dlg.find("#assignment").val();
            console.log(((systemSettings.updateUserDir === 'checked') ? "1" : "0"));

            Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Assignment Uploader-V0.1", systemSettings.teamDir);
            var currentDoc = DocumentManager.getCurrentDocument();
            //  console.log(currentDoc.getText());



            var uploader = new codeServer(systemSettings, currentDoc, Dialogs);
            uploader.uploadToWebsite();
            console.log(JSON.stringify(systemSettings));
            if (systemSettings.updateUserDir == undefined) {
                console.log('Update user unchecked' + systemSettings.updateUserDir);
            } else {
                console.log('Update user is checked' + systemSettings.updateUserDir);
            }

            Dialogs.cancelModalDialogIfOpen("eng1003setting-dialog");
        }

        //    Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Assignment Uploader-V0.1", str);
        //   window.alert($("#fname").val());

        function test() {
            console.log('we got the message');
            window.alert("this is test");
        }
    }


    AppInit.appReady(function () {
        ExtensionUtils.loadStyleSheet(module, "css/style.css");
        log("Upload Assignement Extenstion");
        var HELLOWORLD_EXECUTE = "ENG1003Uploader.monash";
        CommandManager.register("ENG1003 Uploader", HELLOWORLD_EXECUTE, handleHelloWorld);
        var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
        menu.addMenuItem(HELLOWORLD_EXECUTE);

        $("#main-toolbar .buttons").append(toolbarSettings);
        $("#toolbar-settings").on("click", handleHelloWorld);

        $("#main-toolbar .buttons").append(toolbarUploader);
        $("#toolbar-uploader").on("click", handleHelloWorld);

    });
});