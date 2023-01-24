// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { documentFilters } from './utils';
import fetch from 'node-fetch';
import { CommitCompletionItemProvider } from './CommitCompletionItemProvider';

// const API_DIFF_ENDPOINT = 'http://127.0.0.1:8000/summarize-raw';

// const autofillCommitMessage = async () => {
// 	const git = getGitExtension();
// 	if (git === undefined) {
// 		console.log("Git extension not found");
// 		return;
// 	}

// 	const repository = git.repositories[0];
// 	const changes = await repository.diff(true);
// 	const payload = {
// 		'inputs': changes
// 	};

// 	const response = await fetch(API_DIFF_ENDPOINT, {
// 		method: 'post',
// 		body: JSON.stringify(payload),
// 		headers: {'Content-Type': 'application/json'}
// 	});
	
// 	if (!response.ok) {
// 		console.log("Response not ok");
// 		return;
// 	}

// 	const suggestions = await response.json();
	
// 	if (suggestions.length === 0) {
// 		return;
// 	}

// 	console.log(suggestions);
// 	let topPrediction = suggestions[0].token_str;
// 	// Capitalize
// 	topPrediction = topPrediction.charAt(0).toUpperCase() + topPrediction.slice(1);
// 	repository.inputBox.value = topPrediction;
// };
 

export function activate(context: vscode.ExtensionContext) {
	console.log("Activate");
	let disposables = [
		vscode.languages.registerCompletionItemProvider(documentFilters, new CommitCompletionItemProvider())
	];

	// const disposable = vscode.commands.registerCommand("parrot-vscode.autofill", autofillCommitMessage);
	disposables.forEach(x => context.subscriptions.push(x));
}

export function deactivate() {}
