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
            str += '<form action="demo_form.asp">  First name: <input type="text" name="fname"><br>  Last name: <input type="text" name="lname"><br>  <input type="submit" value="Submit"> < /form>';
            Dialogs.showModalDialog(DefaultDialogs.DIALOG_ID_INFO, "Hello World", str);
        }

        AppInit.appReady(function () {

            log("Hello from HelloWorld3.");

            var HELLOWORLD_EXECUTE = "helloworld.execute";

            CommandManager.register("Run HelloWorld", HELLOWORLD_EXECUTE, handleHelloWorld);

            var menu = Menus.getMenu(Menus.AppMenuBar.FILE_MENU);
            menu.addMenuItem(HELLOWORLD_EXECUTE);

        });

    });