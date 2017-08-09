function texec(code, c) {
    return ((console) => eval(code))(c);
}

class RunnableEditor {
    constructor(element) {
        this.nextEditor = null;

        this.createEditor(element);

        /*
        var runButton = document.createElement('button');
        runButton.innerText = 'Run';
        container.appendChild(runButton);
        runButton.onclick = runSnippit;
        */
    }

    createEditor(element) {
        var code = element.innerText.trim();
        var container = document.createElement('div');
        var editorElement = document.createElement('div');
        container.appendChild(editorElement);

        this.outputContainer = document.createElement('pre');
        container.appendChild(this.outputContainer);

        element.parentNode.replaceChild(container, element);

        var editor = ace.edit(editorElement);
        editor.setTheme("ace/theme/clouds");
        editor.getSession().setMode("ace/mode/javascript");
        editor.setOptions({
            maxLines: 20,
            highlightActiveLine: false,
            showFoldWidgets: false,
            showLineNumbers: false
            //showGutter: false
        });
        editor.$blockScrolling = Infinity;
        editor.setValue(code, -1);
        editor.commands.addCommand({
            name: 'run',
            bindKey: {win: 'Ctrl-Enter',  mac: 'Ctrl-Enter'},
            exec: this.runSnippit.bind(this),
            readOnly: true
        });

        this.editor = editor;

    }

    runSnippit() {
        this.outputContainer.innerText = '';
        this.outputContainer.classList.remove('error');
        var code = this.editor.getValue();

        var c = {
            log: (...args) => {
                console.log(...args);
                this.outputContainer.innerText += args + '\n';
            }
        }

        try {
            var result = texec(code, c);
            if (result !== undefined) {
                this.outputContainer.innerText += result;
            }    
        } catch (err) {
            this.outputContainer.classList.add('error');
            this.outputContainer.innerText += `Error: ${err}\n`;
            return;
        }

        if (this.nextEditor) {
            this.nextEditor.editor.focus();
        }
    }
}

function enableInteractForAll(selector) {
    var elements = document.querySelectorAll(selector);
    var lastEditor = null;

    for (element of elements) {
        var re = new RunnableEditor(element);
        if (lastEditor) {
            lastEditor.nextEditor = re;
        }
        lastEditor = re;
    }
}
