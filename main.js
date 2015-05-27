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

        function log(s) {
            console.log("[helloworld3] " + s);
        }

        function handleHelloWorld() {
            var str = "";
            str += '<div class="inline-editor-header">\
  <button class="btn btn-mini no-focus btn-shorthand-done" title="Copy changes back to code">Done</button>\
  <button class="btn btn-mini no-focus btn-shorthand-cancel" title="Cancel changes">Cancel</button>\
</div>\
<div class="inline-editor-holder"></div>';
            console.log('we are going to show the dialog');
            Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "ENG1003 Assignment Uploader-V0.1", str);
            window.alert($("#fname").val());

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