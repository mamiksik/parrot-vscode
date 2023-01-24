// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { documentFilters, getMainRepostiory, fetchCommitMessage, capitalize } from './utils';
import fetch from 'node-fetch';
import { CommitCompletionItemProvider } from './CommitCompletionItemProvider';

const autofillCommitMessage = async () => {
	const repository = getMainRepostiory();
	const topPrediction = (await fetchCommitMessage(1))[0];
	repository.inputBox.value = capitalize(topPrediction);
};
 

export function activate(context: vscode.ExtensionContext) {
	console.log("Activate");
	let disposables = [
		vscode.languages.registerCompletionItemProvider(documentFilters, new CommitCompletionItemProvider()),
		vscode.commands.registerCommand("parrot-vscode.autofill", autofillCommitMessage)
	];
	disposables.forEach(x => context.subscriptions.push(x));
}

export function deactivate() {}
