    /*
                                                                                                                                                                                                                    Based - in part - on the HelloWorld sample extension on the Brackets wiki:
                                                                                                                                                                                                                    https://github.com/adobe/brackets/wiki/Simple-%22Hello-World%22-extension
                                                                                                                                                                                                                    */
    define(function (require, exports, module) {

        var CommandManager = brackets.getModule("command/CommandManager"),
            Menus = brackets.getModule("command/Menus"),
            Dialogs = brackets.getModule("widgets/Dialogs"),
            DefaultDialogs = brackets.getModule("widgets/DefaultDialogs"),
            AppInit = brackets.getModule("utils/AppInit");

        var mainDialog = require("text!dialog.html");

        function log(s) {
            console.log("[helloworld3] " + s);
        }

        function handleHelloWorld() {
            var str = "";

            var templateVars = {
                server: '',
                teamDir: '',
                userName: '',
                updateTeamDir: true,
                updateUserDir: true
            };
            console.log('we are here!!');
            Dialogs.showModalDialogUsingTemplate(Mustache.render(mainDialog, templateVars), false);

            var $dlg = $(".ftp-dialog.instance");
            $dlg.find(".dialog-button[data-button-id='cancel']").on("click", handleCancel);
            $dlg.find(".dialog-button[data-button-id='ok']").on("click", handleOk);

            function handleCancel() {


                Dialogs.cancelModalDialogIfOpen("ftp-dialog");

            }

            function handleOk() {
                var $dlg = $(".ftp-dialog.instance");
                ftpSettings.host = $dlg.find("#host").val();
                ftpSettings.port = $dlg.find("#port").val();
                ftpSettings.user = $dlg.find("#user").val();
                if (ftpSettings.connect === 'SFTP') ftpSettings.privateKeyFile = $dlg.find("#keyfile").val();
                ftpSettings.pwd = $dlg.find("#pwd").val();
                ftpSettings.savepwd = $dlg.find("#savepwd:checked").val();
                ftpSettings.remoteRoot = $dlg.find("#remoteroot").val();

                saveSettings();

                Dialogs.cancelModalDialogIfOpen("ftp-dialog");
            }

            Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Assignment Uploader-V0.1", str);
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