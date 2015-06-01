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

    var firstRun = true;
    var strings = {
        SERVER_NOT_FOUND: 'Please Enter Server Address',
        USER_NOT_FOUND: 'Please Enter User Name',
        TEAM_NOT_FOUND: 'Please Enter Team Directory Name'
    };

    //Shortcut keys for settings and uploading respectively 
    var SETTINGS_SHORTCUT = 'Ctrl-Shift-I';
    var UPLOAD_SHORTCUT = 'Ctrl-Shift-U';

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
        console.log("[ENG1003Uploader] " + s);
    }

    function handleSettings() {
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
            if (systemSettings.server === '') {

                Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Uploader", strings.SERVER_NOT_FOUND);
                return;
            }
            systemSettings.teamDir = $dlg.find("#teamDir").val();
            if (systemSettings.teamDir === '') {

                Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Uploader", strings.TEAM_NOT_FOUND);
                return;
            }
            systemSettings.userName = $dlg.find("#userName").val();
            if (systemSettings.userName === '') {

                Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Uploader", strings.USER_NOT_FOUND);
                return;
            }
            firstRun = false;
            systemSettings.updateTeamDir = $dlg.find("#updateTeamDir:checked").val();
            systemSettings.updateUserDir = $dlg.find("#updateUserDir:checked").val();
            systemSettings.rememberMe = $dlg.find("#rememberMe:checked").val();
            systemSettings.assignment = $dlg.find("#assignment").val();
            UploadCurrentDocument();
            Dialogs.cancelModalDialogIfOpen("eng1003setting-dialog");
        }
    }

    // This function responsable for uploading the current document to the server
    function UploadCurrentDocument() {

        if (firstRun) {
            firstRun = false;
            handleSettings();
            return;
        }

        // if there is a parameter missing, call the settings again
        if (systemSettings.server === '') {
            handleSettings();
            return;
        }
        if (systemSettings.teamDir === '') {
            handleSettings();
            return;
        }
        if (systemSettings.userName === '') {
            handleSettings();
            return;
        }


        //Get the current document
        var currentDoc = DocumentManager.getCurrentDocument();
        // Get a refernce from uploader
        var uploader = new codeServer(systemSettings, currentDoc.getText(), Dialogs, DefaultDialogs);
        // Upload....
        uploader.uploadToWebsite();
    }


    AppInit.appReady(function () {
        ExtensionUtils.loadStyleSheet(module, "css/style.css");
        log("Upload Assignement Extenstion");

        //Settings Window and Shortcut
        var SETTINGS_EXECUTE = "ENG1003Uploader.settings";
        CommandManager.register("ENG1003 Settings", SETTINGS_EXECUTE, handleSettings);
        var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
        menu.addMenuItem(SETTINGS_EXECUTE, SETTINGS_SHORTCUT);

        //Upload Command  and Shortcut
        var UPLOADER_EXECUTE = "ENG1003Uploader.upload";
        CommandManager.register("Assignment Upload", UPLOADER_EXECUTE, UploadCurrentDocument);
        var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
        menu.addMenuItem(UPLOADER_EXECUTE, UPLOAD_SHORTCUT);

        //toolbar Gear ICon for Settings
        $("#main-toolbar .buttons").append(toolbarSettings);
        $("#toolbar-settings").on("click", handleSettings);
        //toolbar Cloud Icon for uploading
        $("#main-toolbar .buttons").append(toolbarUploader);
        $("#toolbar-uploader").on("click", UploadCurrentDocument);
    });
});