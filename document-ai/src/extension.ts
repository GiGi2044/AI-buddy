import * as vscode from 'vscode';
import { getAIPoweredBotResponse } from './aiIntegration';

// Typing Effect
async function typeTextInEditor(editor: vscode.TextEditor, text: string) {
    for (let i = 0; i < text.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 50));
        editor.edit(editBuilder => {
            editBuilder.insert(editor.selection.active, text[i]);
        });
    }
}

// Function to write content to a new text file with typing effect
async function writeToNewFile(content: string) {
    const newFile = await vscode.workspace.openTextDocument({ content: '', language: 'plaintext' });
    const editor = await vscode.window.showTextDocument(newFile);
    if (content) {  // Check if content is not empty
        await typeTextInEditor(editor, content);
    } else {
        console.log('No content to write');  // Log if content is empty
    }
}

// Function to handle the documentation of selected code
async function documentSelectedCode() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No active text editor');
        return;
    }
    const text = editor.document.getText(editor.selection);
    if (!text) {
        vscode.window.showInformationMessage('No text selected');
        return;
    }
    const prompt = "Document the following code concisely: " + text;
    try {
        const documentation = await getAIPoweredBotResponse(prompt);
        if (documentation.trim()) {
            await writeToNewFile(documentation.trim());
            vscode.window.showInformationMessage('Documentation created and is being typed in a new file');
        } else {
            vscode.window.showInformationMessage('No documentation was generated.');
        }
    } catch (error) {
        vscode.window.showErrorMessage('Failed to generate documentation: ' + error);
        console.error(error);
    }
}

export function activate(context: vscode.ExtensionContext) {
    let documentCodeDisposable = vscode.commands.registerCommand('extension.documentSelectedCode', async () => {
        await documentSelectedCode();
    });
    context.subscriptions.push(documentCodeDisposable);
}
