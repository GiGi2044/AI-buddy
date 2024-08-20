import * as vscode from 'vscode';
import { getAIPoweredBotResponse } from './aiIntegration';




//Typing Effect

async function typeTextInEditor(editor: vscode.TextEditor, text: string){
	for(let i=0; i<text.length; i++){
		//adjust the delay of text
		await new Promise(resolve =>setTimeout(resolve, 50));
		editor.edit(editBuilder =>{
			editBuilder.insert(editor.selection.active, text[i]);
		});
	}
}

//Handle user input
async function handleUserInput(){
	const prompt = await vscode.window.showInputBox({
		prompt: "Please Enter in your promt"
	});

	//If user cancels the input
	if(prompt === undefined){
		return;
	}

	//Get active text editor
	const editor = vscode.window.activeTextEditor;

	if(!editor){
		return;
	}

	// Display loading message
	editor.edit( editBuilder =>{
		editBuilder.insert(editor.selection.active, 'Fetching Response ...');
	});

	//Fetch Bot Response
	const botResponse = await getAIPoweredBotResponse(prompt);

	//Remove loading message
	const loadingMessageLength = 'Fetching Response ...'.length;

	editor.edit(editBuilder=>{
		editBuilder.delete(
			new vscode.Range(
				editor.selection.active.translate(0, -loadingMessageLength),
				editor.selection.active
			)
		);
	});

	//simulate typing effect for the bot Response
	await typeTextInEditor(editor, botResponse);

	//display completion
	vscode.window.showInformationMessage('Response Recieved and Typed');

}

// Function to write content to a new text file
async function writeToNewFile(content: string) {
  const newFile = await vscode.workspace.openTextDocument({ content: '', language: 'plaintext' });
  const editor = await vscode.window.showTextDocument(newFile);
  await editor.edit(editBuilder => {
      if (!content) {
          console.log('No content to write'); // Log if content is empty
      }
      editBuilder.insert(new vscode.Position(0, 0), content);
  });
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

  // Prepend the hardcoded prompt to the selected text
  const prompt = "Document the following code: " + text;

  try {
      console.log('Full Prompt:', prompt); // Check the full prompt
      const documentation = await getAIPoweredBotResponse(prompt);
      console.log('Documentation:', documentation); // Check the output from the API
      if (documentation.trim()) {
          // Concatenate the documentation with the original code
          const contentToWrite = documentation.trim() + "\n\n" + text;
          await writeToNewFile(contentToWrite);
          vscode.window.showInformationMessage('Documentation and code created and opened in a new file');
      } else {
          vscode.window.showInformationMessage('No documentation was generated.');
      }
  } catch (error) {
      vscode.window.showErrorMessage('Failed to generate documentation: ' + error);
      console.error(error);
  }
}


export function activate(context: vscode.ExtensionContext) {
  let handleInputDisposable = vscode.commands.registerCommand('extension.getAIPoweredBotResponse', async () => {
      await handleUserInput();
  });

  let documentCodeDisposable = vscode.commands.registerCommand('extension.documentSelectedCode', async () => {
      await documentSelectedCode();
  });

  context.subscriptions.push(handleInputDisposable, documentCodeDisposable);
}
