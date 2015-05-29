    /*
                                                                                                                                                                                                                                                                Based - in part - on the HelloWorld sample extension on the Brackets wiki:
                                                                                                                                                                                                                                                                https://github.com/adobe/brackets/wiki/Simple-%22Hello-World%22-extension
                                                                                                                                                                                                                                                                */
    define(function (require, exports, module) {
        var systemSettings = {
            server: '',
            teamDir: '',
            userName: '',
            updateTeamDir: true,
            updateUserDir: true,
            rememberMe: true
        };

        var CommandManager = brackets.getModule("command/CommandManager"),
            Menus = brackets.getModule("command/Menus"),
            Dialogs = brackets.getModule("widgets/Dialogs"),
            DefaultDialogs = brackets.getModule("widgets/DefaultDialogs"),
            AppInit = brackets.getModule("utils/AppInit");
        DocumentManager = brackets.getModule("document/DocumentManager");

        var mainDialog = require("text!dialog.html");

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

                //Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Assignment Uploader-V0.1",systemSettings.teamDir);
                var currentDoc = DocumentManager.getCurrentDocument();
                //  console.log(currentDoc.getText());
                console.log(JSON.stringify(systemSettings));
                if (systemSettings.updateUserDir==  undefined) {
                    console.log('Update user unchecked'+systemSettings.updateUserDir);
                } else {
                    console.log('Update user is checked'+systemSettings.updateUserDir);
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
            log("Upload Assignement Extenstion");
            var HELLOWORLD_EXECUTE = "ENG1003Uploader.monash";
            CommandManager.register("ENG1003 Uploader", HELLOWORLD_EXECUTE, handleHelloWorld);
            var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
            menu.addMenuItem(HELLOWORLD_EXECUTE);
        });
    });